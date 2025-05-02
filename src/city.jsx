import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader, MTLLoader } from "three-stdlib";
import {
  DepthOfField,
  Vignette,
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";

import projectData from "./Data/Business Intelligence & Analytics.json";
import poetryData from "./Data/Poetry.json";
import dissertationData from "./Data/Dissertation.json";
import miscData from "./Data/Miscellaneous.json";

import { StartScreen, Overlay } from "./Components/overlays.jsx";
import { GlowingTextBanner, SmallTextBanner } from "./Components/texts.jsx";
import {
  InitialCameraAnimation,
  SmallTextCameraAnimation,
} from "./Components/cameraAnimations.jsx";

import { degreesToRadians } from "./utils"; // Utility function for cleaner rotation input

/**
 * CityModel loads a textured 3D city model (OBJ + MTL) and adds it to the scene.
 * It also calls `onLoad` once the model is fully loaded.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onLoad - Callback triggered after the model is successfully loaded
 * @returns {JSX.Element} - A group element containing the loaded 3D city model
 */
function CityModel({ onLoad }) {
  const group = useRef();
  const { scene } = useThree(); // Scene is available if needed, though unused here

  // Load the city texture for use in the material (optional for visual debugging or preview)
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "./City/cityPAL.jpg",
      (texture) => {
        console.log("Texture loaded", texture);
        // This texture can be stored and used if needed later
      },
      undefined,
      (err) => {
        console.error("Texture load failed", err);
      }
    );
  }, []);

  useEffect(() => {
    const mtlLoader = new MTLLoader();

    // Load material definitions
    mtlLoader.load("./City/cityMAT.mtl", (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials); // Attach materials to the OBJ loader

      // Load the OBJ model
      objLoader.load("./City/city.obj", (obj) => {
        obj.scale.set(0.15, 0.15, 0.15); // Scale to fit the scene
        obj.position.set(70, 0, -65); // Position in the scene

        // Enable shadows on all mesh children
        obj.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Add to group and notify parent
        group.current.add(obj);
        onLoad();
      });
    });

    // Cleanup function to dispose of the model and its resources
    return () => {
      if (group.current) {
        group.current.children.forEach((obj) => {
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
        });
      }
    };
  }, []);

  return <group ref={group} />;
}

/**
 * CameraLight attaches a spotlight that follows the camera's position,
 * simulating a light source that moves with the viewer.
 *
 * @component
 * @returns {JSX.Element} - A spotlight that follows the camera
 */
function CameraLight() {
  const { camera } = useThree(); // Access the main camera from the scene
  const lightRef = useRef(); // Reference to the spotlight

  // Update light position every frame to match the camera's current position
  useFrame(() => {
    if (lightRef.current && camera) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <spotLight
      ref={lightRef}
      intensity={10} // Brightness of the light
      angle={0.4} // Cone spread angle
      penumbra={0.5} // Softness of the light edge
      distance={300} // How far the light reaches
      decay={0.6} // Light intensity falloff
      castShadow // Enable shadow casting
    />
  );
}

/**
 * Main application component rendering a Three.js city scene,
 * interactive UI overlays, banners, and ambient experience.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function App() {
  // UI states
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [isOverlayActive, setOverlayActive] = useState(false);
  const [overlayContent, setOverlayContent] = useState([]);
  const [started, setStarted] = useState(false);
  const [openBannerId, setOpenBannerId] = useState(null);
  const [cameraAnimationDone, setcameraAnimationDone] = useState(null);
  const [cityLoaded, setCityLoaded] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(false); // Unused?

  // Camera/interaction state
  const controlsRef = useRef();
  const [currentCameraPos, setCurrentCameraPos] = useState([0, 0, 0]); // Reserved
  const [goToSmallText, setGoToSmallText] = useState(false);
  const [smallTextAnchor, setSmallTextAnchor] = useState([0, 0, 0]);
  const [smallTextLookAt, setSmallTextLookAt] = useState([0, 0, 0]);
  const [showExitButton, setShowExitButton] = useState(false);

  /**
   * Returns camera to initial view and re-enables controls after interacting with banners.
   */
  const resetOrbit = () => {
    setOpenBannerId(null);
    controlsRef.current.target.copy(new THREE.Vector3(0, 0, 0));
    setShowExitButton(false);
    setControlsEnabled(true);
  };

  /**
   * Toggles the overlay and OrbitControls simultaneously.
   */
  const toggleOverlay = () => {
    setOverlayActive((prev) => {
      const newState = !prev;
      if (controlsRef.current) {
        controlsRef.current.enabled = !newState;
      }
      return newState;
    });
  };

  /**
   * Opens a specific overlay content section (projects, poetry, etc.).
   *
   * @param {string} type - The type of content to open in the overlay.
   */
  const openOverlay = (type) => {
    if (type === "projects") setOverlayContent(projectData.projects);
    else if (type === "dissertation")
      setOverlayContent(dissertationData.projects);
    else if (type === "miscellaneous") setOverlayContent(miscData.projects);
    else if (type === "poetry") setOverlayContent(poetryData.projects);

    setOverlayActive(true);
  };

  /**
   * Starts city background audio on first interaction.
   */
  const startAudio = () => {
    if (!audioStarted) {
      const audio = new Audio("./City/cityAMBIENCE.mp3");
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

      {/* Prevents interaction until camera animation finishes */}
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
        visible={!started || !cityLoaded}
      />

      <Overlay
        isActive={isOverlayActive}
        onClose={toggleOverlay}
        items={overlayContent}
      />

      {started && cityLoaded && (
        <Canvas
          shadows
          camera={{ position: [0, 70, 500], fov: 50 }}
          onCreated={({ scene }) => {
            scene.fog = new THREE.Fog(new THREE.Color("#6a0dad"), 0, 1600);
          }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          performance={{ min: 0.8 }}
        >
          {/* User controls */}
          <OrbitControls
            ref={controlsRef}
            target={[0, 0, 0]}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={10}
            maxDistance={220}
            enabled={controlsEnabled}
          />

          {/* One-time zoom-in on startup */}
          <InitialCameraAnimation
            onComplete={() => {
              setControlsEnabled(true);
              setcameraAnimationDone(true);
            }}
          />

          {/* Camera transition to small text UI */}
          {goToSmallText && (
            <SmallTextCameraAnimation
              anchor={smallTextAnchor}
              lookat={smallTextLookAt}
              onComplete={() => {
                setGoToSmallText(false);
                setShowExitButton(true);
              }}
              controlsRef={controlsRef}
            />
          )}

          {/* Small Text UI Banners */}
          <SmallTextBanner
            title="About Me"
            text="24 Year Old Software Engineer, Creative & National American Football Player"
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
            title="Education"
            text={
              "University of Nottingham - BSc Computer Science\n" +
              "University of Nottingham - MSc Information Systems & Operations Management\n" +
              "University of Arizona - MS Information Science: Human Centered Computing"
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
            title="Contact Me"
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

          {/* Section portals */}
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

          {/* Lighting */}
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

          {/* Example object */}
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

          <CityModel onLoad={() => setCityLoaded(true)} />

          {/* Visual postprocessing */}
          <EffectComposer enabled={!isOverlayActive}>
            <HueSaturation hue={0.1} saturation={0.2} />
            <BrightnessContrast brightness={0.05} contrast={0.2} />
            <Bloom
              intensity={3}
              luminanceThreshold={0.05}
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
