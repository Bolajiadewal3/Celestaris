/**
 * @module City
 * @category Scenes
 * @description The high-performance urban landing page.
 * This module renders a 3D city scene using Three.js and React Three Fiber, complete with dynamic day-night cycles, weather effects, and interactive UI overlays. It includes features such as achievement tracking, audio management, and camera animations to enhance user experience.
 * ![City View](City.png)
 * ![City View 2](City2.png)
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Vignette,
  Bloom,
  Noise, 
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { BlendMode } from "postprocessing";

import projectData from "./Data/Business Intelligence & Analytics.json";
import poetryData from "./Data/Poetry.json";
import dissertationData from "./Data/Dissertation.json";
import miscData from "./Data/Miscellaneous.json";
import hciData from "./Data/HCI.json";
import musicData from "./Data/Music.json";
import showcaseData from "./Data/Showcase.json";
import documentationData from "./Data/Documentation.json"; // Your JSON containing documentation items
import { playSFX } from "./audioManager.js";
import {
  Overlay,
  Loader,
  AudioButton,
  HeadingsButton,
  ResumeButton,
  DocumentationButton,
} from "./Components/overlays.jsx";
import {
  GlowingTextBanner,
  SmallTextBanner,
  LargeGroupText,
} from "./Components/texts.jsx";
import {
  InitialCameraAnimation,
  SmallTextCameraAnimation,
} from "./Components/cameraAnimations.jsx";

import { degreesToRadians } from "./utils";

import { AchievementTracker } from "./Components/achievementTracker";
import { EnvironmentControls } from "./Components/environmentControls";
import { RainSystem, WeatherManager } from "./Components/rainSystem";
import { WetRoad } from "./Components/wetRoad";
import { AchievementToast } from "./Components/achievementToast";

import { useAchievementStore } from "./Store/useAchievementStore";
import { useEnvironmentStore } from './Store/useEnvironmentStore'; 
import { GrandUnlockModal } from "./Components/grandUnlockModal";
//import { applyCurvedWorld } from "./Shaders/curvedWorld";

const IS_IOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (/Mac/.test(navigator.platform) && navigator.maxTouchPoints > 1);

if (IS_IOS && typeof window !== "undefined") {
  window.createImageBitmap = undefined;
}

/**
 * Applies a swaying effect to fauna objects in the scene.
 * @param scene
 */
function useFaunaSway(scene) {
  const faunaMaterialRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    let singleFaunaMaterial = null;

    scene.traverse((child) => {
      if (child.isMesh) {
        const meshName = child.name.toLowerCase();
        const matName = child.material?.name?.toLowerCase() || "";

        const keywords = ["fauna", "bushes"];
        const isFauna = keywords.some(
          (key) => meshName.includes(key) || matName.includes(key),
        );

        if (isFauna) {
          const geo = child.geometry;

/**
 * If the geometry doesn't already have a height attribute, compute it.
 * This attribute is used to determine how much each vertex should sway based on its height.
 */
          if (!geo.attributes.aHeight) {
            if (!geo.boundingBox) geo.computeBoundingBox();

            const minY = geo.boundingBox.min.y;
            const maxY = geo.boundingBox.max.y;
            const heightRange = Math.max(0.001, maxY - minY); // Prevent division by zero

            const posArray = geo.attributes.position.array;
            const heights = new Float32Array(posArray.length / 3);

            for (let i = 0; i < posArray.length / 3; i++) {
              const y = posArray[i * 3 + 1];
              // Map vertex Y to a 0.0 -> 1.0 ratio
              heights[i] = (y - minY) / heightRange;
            }

            geo.setAttribute("aHeight", new THREE.BufferAttribute(heights, 1));
          }

          /**
           * If we haven't already created a dedicated material for fauna, clone the existing material.
           * This ensures that all fauna objects share the same shader logic without affecting other materials in the scene.
           */
          if (!singleFaunaMaterial) {
            const baseMaterial = Array.isArray(child.material)
              ? child.material[0]
              : child.material;

            singleFaunaMaterial = baseMaterial.clone();
            singleFaunaMaterial.name = "DedicatedFaunaMaterial";

            /**
             * Modifies the vertex shader to add a swaying effect based on vertex height.
             * @param shader
             */
            singleFaunaMaterial.onBeforeCompile = (shader) => {
              shader.uniforms.uTime = { value: 0 };
              singleFaunaMaterial.userData.shader = shader;

              shader.vertexShader = `
                uniform float uTime;
                attribute float aHeight;
                ${shader.vertexShader}
              `.replace(
                "#include <begin_vertex>",
                `
                #include <begin_vertex>
                
                // 0.0 flex at ground, quadratic curve scaling up to top tip
                float flex = pow(aHeight, 2.0) * 2.0;
                float sway = sin(uTime * 2.5 + position.x * 0.5) * flex;
                
                transformed.x += sway * 2.0;
                transformed.z += sway * 0.3;
                `,
              );
            };

            singleFaunaMaterial.needsUpdate = true;
            faunaMaterialRef.current = singleFaunaMaterial;
          }

          child.material = singleFaunaMaterial;
        }
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (faunaMaterialRef.current?.userData?.shader) {
      faunaMaterialRef.current.userData.shader.uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });
}



/**
 * Checks if the current device is a mobile device.
 *  @returns {boolean} True if the device is mobile, false otherwise.
 */
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

/**
 * Renders the 3D city model with all its associated effects, including fauna swaying, day-night cycles, and weather effects.
 */
function CityModel() {
  /**
   * The compressed scene model .GLB file
   */
  const { scene } = useGLTF(
    `${import.meta.env.BASE_URL}City/City 5.glb`,
    "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
  );

  useEffect(() => {
    const isMobile = isMobileDevice();

    scene.traverse((child) => {
      if (child.isMesh && child.material) {

        const before = child.material;
        

        if (child.geometry?.attributes?.normal) {
          const arr = child.geometry.attributes.normal.array;
          let bad = 0;
          for (let i = 0; i < arr.length; i += 3) {
            const lenSq = arr[i] ** 2 + arr[i + 1] ** 2 + arr[i + 2] ** 2;
            if (lenSq < 0.01 || Number.isNaN(lenSq)) bad++;
          }
          if (bad > 0)
            console.log(
              `${child.name}: ${bad}/${arr.length / 3} degenerate normals`,
            );
        } else {
          console.log(`${child.name}: MISSING normal attribute`);
        }

        /**
         * If the device is mobile, apply optimizations to reduce rendering load.
         * This includes limiting emissive intensity and disabling shadows for certain objects.
         * @param child - The current mesh being processed in the scene.
         */

        if (isMobile) {
          if (child.material.emissiveIntensity > 1) {
            child.material.emissiveIntensity = 1;
          }


          const isFoliageOrCar =
            child.name.includes("Tree") ||
            child.name.includes("Fauna") ||
            child.name.includes("Bushes") ||
            child.material.name === "DedicatedFaunaMaterial" ||
            child.name.includes("Car");

          if (isFoliageOrCar) {
            child.castShadow = false;
          }
        }


/**
 * If the material is a window, make it slightly transparent and adjust its roughness and metalness for a more realistic appearance.
 */
        if (child.material.name.includes("Window")) {
          child.material.transparent = true;
          child.material.opacity = 0.9;
          child.material.depthWrite = false; 

          if (child.material.roughness !== undefined) {
            child.material.roughness = 0.6;
            child.material.metalness = 0.1;

          }
        }

        const after = child.material;
 
      }
    });
  }, [scene]);

  useFaunaSway(scene);

  /** A traversal of the model's elements that clear geometries and materials from memory on cleanup */
  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.isMaterial) child.material.dispose();
        }
      });
    };
  }, [scene]);

  return (
    /** The scene object; it has shadows enabled */
    <primitive
      //onPointerDown={(e) => e.stopPropagation()}
      object={scene}
      scale={0.15}
      position={[70, 0, -65]}
      castShadow
      receiveShadow
    />
  );
}

/**
 * Manages the day-night cycle for the 3D scene.
 * @param root0
 * @param root0.speed
 */
function DayNightCycle({ speed = 0.07 }) {
  const sunRef = useRef();
  const { manualTime, isOverriding } = useEnvironmentStore();


  useFrame(({ clock, scene }) => {
    // Determine elapsed time factor: either manual slider override or automatic clock
    let timeFactor;
    let elapsed;

    if (isOverriding && manualTime !== null) {
      // Map 0-24 hour slider to the -1 to 1 sinusoidal range used by your logic
      // 6 AM = -1 (midnight-ish / dawn start), 12 PM = 1 (noon), etc.
      elapsed = (manualTime / 24) * Math.PI * 2;
      timeFactor = Math.sin(elapsed - Math.PI / 2); // Shifts peak to noon
    } else {
      elapsed = clock.getElapsedTime() * speed;
      timeFactor = Math.sin(elapsed);
    }

    const isNight = timeFactor < 0;

    const daySky = new THREE.Color("#70a1ff");
    const sunsetSky = new THREE.Color("#fd7d36");
    const nightSky = new THREE.Color("#0a0c16");

    const dayFog = new THREE.Color("#87ceeb");
    const nightFog = new THREE.Color("#0a0c16");

    /** Update sun position */
    if (sunRef.current) {
      sunRef.current.position.x = Math.cos(elapsed) * 100;
      sunRef.current.position.y = timeFactor * 80;
      sunRef.current.position.z = Math.sin(elapsed) * 40;

      // Keep sun light moderate
      sunRef.current.intensity = THREE.MathUtils.clamp(
        timeFactor * 0.15,
        0.1,
        0.9,
      );
    }

    let targetSky = daySky;
    if (timeFactor < -0.2) {
      targetSky = nightSky;
    } else if (timeFactor >= -0.2 && timeFactor < 0.2) {
      targetSky = sunsetSky;
    }

    if (!scene.background) scene.background = new THREE.Color();
    scene.background.lerp(targetSky, 0.02);

    if (scene.fog) {
      scene.fog.color.lerp(isNight ? nightFog : dayFog, 0.1);
    }

    const targetEmissive = isNight ? Math.abs(timeFactor) * 3.5 : 0.6;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((mat) => {
          const matName = mat?.name || "";

          if (
            matName.includes("Lit") ||
            matName.includes("Headlight") ||
            matName.includes("Streetlamp") ||
            matName.includes("Tailight")
          ) {
            mat.emissiveIntensity = THREE.MathUtils.lerp(
              mat.emissiveIntensity,
              targetEmissive,
              0.05,
            );
          }
        });
      }
    });
});

  return (
    <directionalLight
      ref={sunRef}
      castShadow
      shadow-mapSize={[1024, 1024]}
      shadow-bias={-0.0001}
      color="#fff2e0"
    />
  );
}

/**
 * Preloads the city model in memory
 * @category 3D Assets
 */
useGLTF.preload(`${import.meta.env.BASE_URL}City/city-v2.glb`);

/**
 * CameraLight attaches a spotlight that follows the camera's position,
 * simulating a light source that moves with the viewer.
 * @component
 * @returns - A spotlight that follows the camera
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
      intensity={10}
      angle={0.8}
      penumbra={0.6}
      distance={300}
      decay={0.6}
      castShadow
    />
  );
}

/**
 * Main application component rendering a Three.js city scene,
 * interactive UI overlays, banners, and ambient experience.
 * @default 
 * @component 
 * @returns - The complete city landing page with 3D scene and UI
 */
export default function City() {
  // UI states
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [isOverlayActive, setOverlayActive] = useState(false);
  const [overlayContent, setOverlayContent] = useState([]);
  const [openBannerId, setOpenBannerId] = useState(null);
  const [cameraAnimationDone, setcameraAnimationDone] = useState(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const [showBigHeadings, setShowBigHeadings] = useState(false);


  // Camera/interaction state
  const controlsRef = useRef();
  const [goToSmallText, setGoToSmallText] = useState(false);
  const [smallTextAnchor, setSmallTextAnchor] = useState([0, 0, 0]);
  const [smallTextLookAt, setSmallTextLookAt] = useState([0, 0, 0]);
  const [showExitButton, setShowExitButton] = useState(false);
  
  /**
   * Returns camera to initial view and re-enables controls after interacting with banners.
   * @returns {void}
   */
  const resetOrbit = () => {
    setOpenBannerId(null);
    controlsRef.current.target.copy(new THREE.Vector3(0, 0, 0));
    setShowExitButton(false);
    setControlsEnabled(true);
  };

  /**
   * Toggles the overlay and OrbitControls simultaneously.
   * @returns {void}
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
   * @param type - The content section to show.
   * @returns {void}
   */
  const openOverlay = (type) => {
    playSFX("open_overlay", 0.15);

    switch (type) {
      case "dissertation":
        //console.log(dissertationData.projects);
        setOverlayContent(dissertationData.projects);
        break;

      case "miscellaneous":
        setOverlayContent(miscData.projects);
        break;

      case "poetry":
        setOverlayContent(poetryData.projects);
        break;

      case "business":
        setOverlayContent(projectData.projects);
        break;

      case "hci":
        setOverlayContent(hciData.projects);
        break;

      case "music":
        setOverlayContent(musicData.projects);
        break;

      case "showcase":
        setOverlayContent(showcaseData.projects);
        break;

      case "documentation":
        setOverlayContent(documentationData);
        break;
    }

    setOverlayActive(true);
  };

  const audioRef = useRef(null);

  /**
   * Starts city background audio on first interaction.
   * @deprecated use imported method from OVERLAYS
   */
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

  const isFullyUnlocked = useAchievementStore((state) => state.isFullyUnlocked);
  console.log(isFullyUnlocked);

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (isFullyUnlocked) {
      // Check if the modal has already been shown in a previous session
      const hasSeenModal = localStorage.getItem("hasSeenGrandUnlock");

      if (!hasSeenModal) {
        setShowModal(true);
        // Set the flag so it never fires automatically on page load again
        localStorage.setItem("hasSeenGrandUnlock", "true");
      }
    }
  }, [isFullyUnlocked]);


  /**
   * The entire landing page
   * @param root0
   * @param root0.scene
   */
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/** UI button to return to free roam after viewing a SMALLTEXTBANNER */}
      {showExitButton && (
        <button
          className="smallTextButton"
          onClick={() => {
            playSFX("button_click", 0.35);
            resetOrbit();
          }}
        >
          Return
        </button>
      )}

      {/** UI overlay that pulls JSON data to display */}
      <Overlay
        isActive={isOverlayActive}
        onClose={toggleOverlay}
        items={overlayContent}
      />

      {/** The custom loading page screen from OVERLAYS */}
      <Suspense fallback={<Loader />}>
        {/** UI button start and stop AUDIO */}
        {!isOverlayActive && (
          <AudioButton
            onClick={() => {
              playSFX("button_click", 0.35);
            }}
            url={`${import.meta.env.BASE_URL}City/cityAMBIENCE.mp3`}
          ></AudioButton>
        )}

        {!isOverlayActive && !showExitButton && (
          <ResumeButton
            onClick={() => {
              playSFX("button_click", 0.35);
            }}
          ></ResumeButton>
        )}
        {!isOverlayActive && !showExitButton && (
          <DocumentationButton
            onClick={() => {
              playSFX("button_click", 0.35);
              openOverlay("documentation");
            }}
          ></DocumentationButton>
        )}

        {!isOverlayActive && (
          <HeadingsButton
            onClick={() => {
              playSFX("button_click", 0.35);
            }}
            showHeadings={showBigHeadings}
            setShowHeadings={setShowBigHeadings}
          ></HeadingsButton>
        )}

        {!isOverlayActive && <AchievementTracker onOpenModal={() => setShowModal(true)} />}

        {/** Task reminder */}
        {!isOverlayActive && !isFullyUnlocked && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              width: "100%",
              textAlign: "center",
              zIndex: 10,
              color: "#00ffcc",
              pointerEvents: "none",
            }}
          >
            TASK:: FIND ALL THE DATA POINTS
          </div>
        )}

        {!isOverlayActive && <EnvironmentControls />}

        {!isOverlayActive &&<AchievementToast />}

        {!isOverlayActive && (<GrandUnlockModal isOpen={showModal} onClose={() => setShowModal(false)} />)}

        {/** The 3D scene with dark grey background */}
        <Canvas
          frameloop="always"
          style={{
            pointerEvents: isOverlayActive || !cameraAnimationDone ? "none" : "auto",
          }}
          shadows
          camera={{ position: [0, 70, 500], fov: 50 }}
          onCreated={({ scene }) => {
            scene.fog = new THREE.Fog(new THREE.Color("#0a0a1a"), 200, 1200);
          }}
          dpr={[1, 1.5]}
          gl={{
            outputColorSpace: THREE.SRGBColorSpace,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.9,
          }}
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
          {/* Camera transition to SMALLTEXTBANNER */}
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
          {/* Small Text UI Banner - ABOUT ME */}
          <SmallTextBanner
            id="node-about-me"
            title="About Me"
            text="25 Year Old Software & Data Engineer, Creative & National American Football Player"
            position={[-40, -8.5, 90]}
            rotation={[0, degreesToRadians(-13), 0]}
            width={17}
            isOpen={openBannerId === "1"}
            onOpen={() => setOpenBannerId("1")}
            onClick={() => {
              playSFX("button_click", 0.35);
              setSmallTextAnchor([-49, 3, 132]);
              setSmallTextLookAt([-40, -8.5, 90]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          {/* Small Text UI Banner - AREAS OF EXPERTISE */}
          <SmallTextBanner
            id="node-areas-of-expertise"
            title="Areas of Expertise"
            text={
              "+ UI / UX\n" +
              "+ Information Systems\n" +
              "+ Data Visualisation\n" +
              "+ Full-Stack Development"
            }
            position={[-59.6, -8.5, 162.9]}
            rotation={[0, degreesToRadians(0), 0]}
            width={17}
            isOpen={openBannerId === "4"}
            onOpen={() => setOpenBannerId("4")}
            onClick={() => {
              playSFX("button_click", 0.35);
              setSmallTextAnchor([-60, -7, 210]);
              setSmallTextLookAt([-60, -2, 170]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          {/* Small Text UI Banner - EDUCATION */}
          <SmallTextBanner
            id="node-education"
            title="Education"
            text={
              "University of Nottingham - BSc (Hons) Computer Science [ 2019 - 2022 ]\n" +
              "University of Nottingham - MSc Information Systems & Operations Management [ 2022 - 2023 ]\n" +
              "University of Arizona - MS Information Science: Human Centered Computing [ 2024 & 2026 ]"
            }
            position={[80, -8.5, 142]}
            rotation={[0, degreesToRadians(-1.5), 0]}
            width={30}
            isOpen={openBannerId === "2"}
            onOpen={() => setOpenBannerId("2")}
            onClick={() => {
              playSFX("button_click", 0.35);
              setSmallTextAnchor([83, 2, 186]);
              setSmallTextLookAt([80, -8.5, 0]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          {/* Small Text UI Banner - CONTACT ME */}
          <SmallTextBanner
            id="node-contact-me"
            title="Contact Me"
            text={"bolajidgs@gmail.com\nmadewale@arizona.edu\n@bolaji.ad"}
            position={[62.5, -8.5, -135]}
            rotation={[0, degreesToRadians(177), 0]}
            width={30}
            isOpen={openBannerId === "3"}
            onOpen={() => setOpenBannerId("3")}
            onClick={() => {
              playSFX("button_click", 0.35);
              setSmallTextAnchor([65, 2, -176]);
              setSmallTextLookAt([62.5, -8.5, -135]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          {/* Small Text UI Banner - WHAT AM I WORKING ON */}
          <SmallTextBanner
            id="node-what-am-i-working-on"
            title="What Am I working On ?"
            text={
              "(1) My Second Dissertation\n" +
              "(2) Professional American Football\n" +
              "(3) My first two EPs\n" +
              "(4) This Portfolio"
            }
            position={[61, 50, -98.5]}
            rotation={[0, degreesToRadians(180), 0]}
            width={25}
            isOpen={openBannerId === "5"}
            onOpen={() => setOpenBannerId("5")}
            onClick={() => {
              playSFX("button_click", 0.35);
              setSmallTextAnchor([60, 49, -140]);
              setSmallTextLookAt([60, 49, -120]);
              setGoToSmallText(true);
              setControlsEnabled(false);
            }}
          />

          {/* Section Text - PROJECTS */}
          <GlowingTextBanner
            text="Business"
            position={[-70, 40, -30]}
            onClick={() => {
              playSFX("button_click", 0.35);
              openOverlay("business");
            }}
          />

          <GlowingTextBanner
            text={"HCI"}
            position={[-70, 20, -30]}
            onClick={() => {
              playSFX("button_click", 0.35);
              openOverlay("hci");
            }}
          />
          {/* Section Text - DISSERTATION */}
          <GlowingTextBanner
            text="Dissertation I"
            position={[70, 40, -50]}
            onClick={() => {
              playSFX("button_click", 0.35);
              openOverlay("dissertation");
            }}
          />

          {/* Section Text - POETRY */}
          <GlowingTextBanner
            text="Poetry"
            position={[50, 38, 60]}
            rotation={[0, Math.PI * 1.5, 0]}
            onClick={() => {
              playSFX("button_click", 0.35);
              openOverlay("poetry");
            }}
          />
          <GlowingTextBanner
            text="Music"
            position={[50, 18, 60]}
            rotation={[0, Math.PI * 1.5, 0]}
            onClick={() => {
              playSFX("button_click", 0.35);
              openOverlay("music");
            }}
          />
          {/* Section Text - MISCELLANEOUS */}

          <GlowingTextBanner
            text="Links"
            position={[-60, 0, 75]}
            rotation={[0, Math.PI / 2, 0]}
            onClick={() => {
              playSFX("button_click", 0.35);
              openOverlay("miscellaneous");
            }}
          />

          {showBigHeadings && (
            <>
              <LargeGroupText text="Research" position={[-70, 60, -30]} />
              <LargeGroupText text="Academia" position={[70, 62, -50]} />
              <LargeGroupText
                text="Creative"
                position={[50, 60, 60]}
                rotation={[0, Math.PI * 1.5, 0]}
              />
              <LargeGroupText
                text="Miscellaneous"
                position={[-60, 40, 75]}
                rotation={[0, Math.PI / 2, 0]}
              />
            </>
          )}

          {/* CAMERA, AMBIENT and DIRECTIONAL lighting */}
          <DayNightCycle />
          <RainSystem />
          <WetRoad />
          <WeatherManager />

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
          {/* Orb at CENTER of model */}
          <mesh position={[0, 10, 0]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
          {/* The consistent BACKGROUND of the scene */}
          <color attach="background" args={["#0a0a1a"]} />
          {/* The imported .GLB CITY MODEL */}
          <CityModel />
          {/* Visual Post-Processing */}
          <EffectComposer
            frameBufferType={
              isMobileDevice() ? THREE.UnsignedByteType : THREE.HalfFloatType
            }
          >
            <HueSaturation hue={0.1} saturation={0.2} />
            <Bloom
              intensity={!isMobileDevice() ? 3.5 : 3}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.2}
            />
            {/*<DepthOfField focusDistance={5} focalLength={10} bokehScale={2} />*/}
            <Vignette eskil={false} offset={0.1} darkness={0.7} />

            <Noise
              opacity={0.035} // Keep it subtle so it looks like fine grain, not static
              blendMode={BlendMode.OVERLAY}
            />

            <ChromaticAberration
              offset={new THREE.Vector2(0.0009, 0.0009)}
              blendMode={BlendMode.NORMAL}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
}
