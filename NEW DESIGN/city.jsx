import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text,
  Edges,
  Sky,
  Environment,
  OrbitControls,
  Html,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader, MTLLoader } from "three-stdlib";
import {
  DepthOfField,
  Vignette,
  Bloom,
  SMAA,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
//import { useTrail, animated, useSpring } from '@react-spring/web';
//import { a } from '@react-spring/three';

import projectData from "/data/Business Intelligence & Analytics.json";
import poetryData from "/data/Poetry.json";
import dissertationData from "/data/Dissertation.json";
import miscData from "/data/Miscellaneous.json";
import { cameraViewMatrix } from "three/tsl";

import { StartScreen, Overlay } from "/NEW DESIGN/Components/overlays.jsx";
import {
  GlowingTextBanner,
  SmallTextBanner,
} from "/NEW DESIGN/Components/texts.jsx";
import {
  InitialCameraAnimation,
  SmallTextCameraAnimation,
} from "/NEW DESIGN/Components/cameraAnimations.jsx";

const degreesToRadians = (deg) => (deg * Math.PI) / 180;

function CityModel() {
  const group = useRef();
  const { scene } = useThree();

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/cityPAL.jpg",
      (texture) => {
        console.log("Texture loaded", texture);
      },
      undefined,
      (err) => {
        console.error("Texture load failed", err);
      }
    );
  }, []);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load("/cityMAT.mtl", (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials); // 👈 attach materials here

      objLoader.load("/city.obj", (obj) => {
        obj.scale.set(0.15, 0.15, 0.15); // Adjust to fit your scene
        obj.position.set(70, 0, -65);

        obj.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        group.current.add(obj);
      });
    });

    return () => {
      if (group.current && obj) {
        group.current.remove(obj);
        obj.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return <group ref={group} />;
}

function CameraLight() {
  const { camera } = useThree();
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current && camera) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <spotLight
      ref={lightRef}
      intensity={10}
      angle={0.4}
      penumbra={0.5}
      distance={300}
      decay={0.6}
      castShadow
    />
  );
}

export default function App() {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [isOverlayActive, setOverlayActive] = useState(false);
  const [overlayContent, setOverlayContent] = useState([]);
  const [started, setStarted] = useState(false);
  const [openBannerId, setOpenBannerId] = useState(null);
  const [cameraAnimationDone, setcameraAnimationDone] = useState(null);

  const controlsRef = useRef();

  const [initialAnimation, setInitialAnimation] = useState(false);

  const [goToSmallText, setGoToSmallText] = useState(false);
  const [smallTextAnchor, setSmallTextAnchor] = useState([0, 0, 0]); // Initial anchor
  const [smallTextLookAt, setSmallTextLookAt] = useState([0, 0, 0]);
  const [showExitButton, setShowExitButton] = useState(false);

  const resetOrbit = () => {
    // Reset camera target and re-enable OrbitControls
    setOpenBannerId(null);
    controlsRef.current.target.copy(new THREE.Vector3(0, 0, 0));
    setShowExitButton(false);
    setControlsEnabled(true); // Re-enable OrbitControls
  };

  const [currentCameraPos, setCurrentCameraPos] = useState([0, 0, 0]);

  //const smallTextAnchor = use

  const toggleOverlay = () => {
    setOverlayActive((prev) => {
      const newState = !prev;
      if (controlsRef.current) {
        controlsRef.current.enabled = !newState; // Disable when overlay is on
      }
      return newState;
    });
  };

  const openOverlay = (type) => {
    if (type === "projects") {
      console.log(projectData);
      setOverlayContent(projectData.projects);
    } else if (type === "dissertation")
      setOverlayContent(dissertationData.projects); // etc.
    else if (type === "miscellaneous")
      setOverlayContent(miscData.projects); // etc.
    else if (type === "poetry") setOverlayContent(poetryData.projects); // etc.

    setOverlayActive(true);
  };

  const [audioStarted, setAudioStarted] = useState(false);

  const startAudio = () => {
    if (!audioStarted) {
      const audio = new Audio("/cityAMBIENCE.mp3");
      audio.loop = true;
      audio.play();
      setAudioStarted(true);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {showExitButton && (
        <button className="smallTextButton" onClick={resetOrbit}>
          Return
        </button>
      )}

      {!cameraAnimationDone && started && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 100,
            pointerEvents: "all",
          }}
        />
      )}

      <StartScreen
        onStart={() => {
          startAudio();
          setStarted(true);
        }}
        visible={!started}
      />

      <Overlay
        isActive={isOverlayActive}
        onClose={toggleOverlay}
        items={overlayContent}
      />

      {started && (
        <Canvas
          shadows
          camera={{ position: [0, 70, 500], fov: 50 }}
          onCreated={({ scene }) => {
            scene.fog = new THREE.Fog(new THREE.Color("#6a0dad"), 0, 1600); // purple fog
          }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          performance={{ min: 0.8 }}
        >
          <OrbitControls
            ref={controlsRef}
            target={[0, 0, 0]}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={10}
            maxDistance={220}
            enabled={controlsEnabled}
          />

          <InitialCameraAnimation
            onComplete={() => {
              setControlsEnabled(true);
              setcameraAnimationDone(true);
            }}
          />

          {goToSmallText && (
            <SmallTextCameraAnimation
              anchor={smallTextAnchor}
              lookat={smallTextLookAt}
              onComplete={() => {
                setGoToSmallText(false);
                setShowExitButton(true);
                console.log(
                  "EXIT BUTTON SHOULD BE TRUE; IT IS: ",
                  showExitButton
                );
              }}
              controlsRef={controlsRef}
            />
          )}

          <SmallTextBanner
            title={"About Me"}
            text={
              "24 Year Old Software Engineer, Creative & National American Football Player"
            }
            position={[-40, -8.5, 90]}
            rotation={[0, degreesToRadians(-13), 0]}
            width={17}
            isOpen={openBannerId === "1"}
            onOpen={() => setOpenBannerId("1")}
            onClick={() => {
              setSmallTextAnchor([-49, 3, 132]);
              setSmallTextLookAt([-40, -8.5, 90]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          <SmallTextBanner
            title={"Education"}
            text={
              "University of Nottingham - BSc Computer Science\nUniversity of Nottingham - MSc Information Systems & Operations Management\nUniversity of Arizona - MS Information Science: Human Centered Computing"
            }
            position={[80, -8.5, 142]}
            rotation={[0, degreesToRadians(-1.5), 0]}
            width={30}
            isOpen={openBannerId === "2"}
            onOpen={() => setOpenBannerId("2")}
            onClick={() => {
              setSmallTextAnchor([83, 2, 186]);
              setSmallTextLookAt([80, -8.5, 0]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          <SmallTextBanner
            title={"Contact Me"}
            text={"bolajidgs@gmail.com\nmadewale@arizona.edu\n@bolaji.ad"}
            position={[62.5, -8.5, -135]}
            rotation={[0, degreesToRadians(177), 0]}
            width={30}
            isOpen={openBannerId === "3"}
            onOpen={() => setOpenBannerId("3")}
            onClick={() => {
              setSmallTextAnchor([65, 2, -176]);
              setSmallTextLookAt([62.5, -8.5, -135]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          <GlowingTextBanner
            text="Projects"
            position={[-70, 30, -30]}
            onClick={() => openOverlay("projects")}
          />

          <GlowingTextBanner
            text="Dissertation"
            position={[70, 40, -50]}
            onClick={() => openOverlay("dissertation")}
          />

          <GlowingTextBanner
            text="Poetry"
            position={[50, 40, 60]}
            rotation={[0, Math.PI * 1.5, 0]}
            onClick={() => openOverlay("poetry")}
          />

          <GlowingTextBanner
            text="Miscellaneous"
            position={[-60, 20, 75]}
            rotation={[0, Math.PI / 2, 0]}
            onClick={() => openOverlay("miscellaneous")}
          />

          <CameraLight />
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[5, 35, 5]}
            intensity={1.0}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-near={1}
            shadow-camera-far={200}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
            shadow-bias={-0.005}
          />

          <mesh position={[0, 10, 0]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>

          <Sky
            distance={450000}
            sunPosition={[100, 10, 100]}
            inclination={0.49}
            azimuth={0.25}
          />

          <CityModel />
          <EffectComposer enabled={!isOverlayActive}>
            <HueSaturation hue={0.1} saturation={0.2} />{" "}
            {/* Slightly more vivid colors */}
            <BrightnessContrast brightness={0.05} contrast={0.2} />
            <Bloom
              intensity={3} // increase brightness of bloom
              luminanceThreshold={0.05} // lower = more surfaces glow
              luminanceSmoothing={0.1}
            />
            <DepthOfField focusDistance={5} focalLength={10} bokehScale={2} />
            <Vignette eskil={false} offset={0.1} darkness={0.4} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
