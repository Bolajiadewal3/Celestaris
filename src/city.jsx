/**
 * @module City
 * @category Scenes
 * @description The high-performance urban landing page.
 */

import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
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

import { Overlay, Loader } from "./Components/overlays.jsx";
import { GlowingTextBanner, SmallTextBanner } from "./Components/texts.jsx";
import {
  InitialCameraAnimation,
  SmallTextCameraAnimation,
} from "./Components/cameraAnimations.jsx";

import { degreesToRadians } from "./utils"; // Utility function for cleaner rotation input

/**
 * CityModel manages the complex OBJ/MTL loading and asset disposal.
 * @component
 * @category 3D Assets
 */
function CityModel() {
  // useLoader automatically "suspends" this component
  const materials = useLoader(
    MTLLoader,
    `${import.meta.env.BASE_URL}City/cityMAT.mtl`,
  );
  const obj = useLoader(
    OBJLoader,
    `${import.meta.env.BASE_URL}City/city.obj`,
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    },
  );

  // Apply shadows/settings after loading
  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.side = THREE.FrontSide;
      }
    });
  }, [obj]);

  return <primitive object={obj} scale={0.15} position={[70, 0, -65]} />;
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

  const audioRef = useRef(null);

  const startAudio = () => {
    if (!audioStarted) {
      const audio = new Audio(
        `${import.meta.env.BASE_URL}City/cityAMBIENCE.mp3`,
      );
      audio.loop = true;
      audioRef.current = audio;

      audio.play();
      setAudioStarted(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {showExitButton && (
        <button className="smallTextButton" onClick={resetOrbit}>
          Return
        </button>
      )}

      <Overlay
        isActive={isOverlayActive}
        onClose={toggleOverlay}
        items={overlayContent}
      />

      <Suspense fallback={<Loader />}>
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

          <CityModel />

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
      </Suspense>
    </div>
  );
}
