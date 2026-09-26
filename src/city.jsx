/**
 * @module City
 * @category Scenes
 * @description The high-performance urban landing page.
 * * TEST
 * ![City View](City.png)
 * ![City View 2](City2.png)
 *
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
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

const IS_IOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (/Mac/.test(navigator.platform) && navigator.maxTouchPoints > 1);

if (IS_IOS && typeof window !== "undefined") {
  window.createImageBitmap = undefined;
}

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

          // 1. Calculate relative height (0.0 at base to 1.0 at top) regardless of origin
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

          // 2. Clone material once
          if (!singleFaunaMaterial) {
            const baseMaterial = Array.isArray(child.material)
              ? child.material[0]
              : child.material;

            singleFaunaMaterial = baseMaterial.clone();
            singleFaunaMaterial.name = "DedicatedFaunaMaterial";

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

// Add this helper function outside and above your component
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

function CityModel() {
  /**
   * The compressed scene model .GLB file
   * @type {useGLTF}
   */
  const { scene } = useGLTF(
    `${import.meta.env.BASE_URL}City/City 5.glb`,
    "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
  );

  useEffect(() => {
    const isMobile = isMobileDevice();

    scene.traverse((child) => {
      if (child.isMesh) {
        const before = child.material;
        console.log(`[BEFORE] ${child.name || "unnamed"}`, {
          matName: before.name,
          type: before.type,
          color: before.color?.getHexString(),
          vertexColors: before.vertexColors,
          map: !!before.map,
          emissive: before.emissive?.getHexString(),
          emissiveIntensity: before.emissiveIntensity,
          transparent: before.transparent,
          opacity: before.opacity,
        });

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

        // --- 1. MOBILE-SPECIFIC FIXES ---
        if (isMobile) {
          // Tame Emissives
          if (child.material.emissiveIntensity > 1) {
            child.material.emissiveIntensity = 1;
          }

          // Downgrade Materials
          /*
          if (
            child.material.type === "MeshStandardMaterial" ||
            child.material.type === "MeshPhysicalMaterial"
          ) {
            const simplifiedMaterial = new THREE.MeshLambertMaterial({
              name: child.material.name, // CRITICAL: Keep name for the Window check below
              color: child.material.color,
              map: child.material.map,
              emissive: child.material.emissive,
              emissiveIntensity: child.material.emissiveIntensity,
              transparent: child.material.transparent,
              opacity: child.material.opacity,
            });

            child.material.dispose();
            child.material = simplifiedMaterial;
          }
            */

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

        // --- 2. YOUR EXISTING WINDOW LOGIC ---
        // (Runs for both desktop and mobile, applying to whatever material is active)
        if (child.material.name.includes("Window")) {
          child.material.transparent = true;
          child.material.opacity = 0.9;
          child.material.depthWrite = false; // Fixes internal geometry clipping

          // Lambert doesn't have roughness, so only apply it if it exists (i.e., on desktop)
          if (child.material.roughness !== undefined) {
            child.material.roughness = 0.1;
          }
        }

        const after = child.material;
        console.log(`[AFTER]  ${child.name || "unnamed"}`, {
          matName: after.name,
          type: after.type,
          color: after.color?.getHexString(),
          vertexColors: after.vertexColors,
          map: !!after.map,
        });
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

function DayNightCycle({ speed = 0.07 }) {
  const sunRef = useRef();

  useFrame(({ clock, scene }) => {
    const elapsed = clock.getElapsedTime() * speed;
    // Values range from -1 (midnight) to 1 (noon)
    const timeFactor = Math.sin(elapsed);
    const isNight = timeFactor < 0;

    const daySky = new THREE.Color("#70a1ff");
    const sunsetSky = new THREE.Color("#fd7d36");
    const nightSky = new THREE.Color("#0a0c16");

    const dayFog = new THREE.Color("#87ceeb");
    const nightFog = new THREE.Color("#0a0c16");

    // 1. Move Sun in a sky arc
    if (sunRef.current) {
      sunRef.current.position.x = Math.cos(elapsed) * 100;
      sunRef.current.position.y = timeFactor * 80;
      sunRef.current.position.z = Math.sin(elapsed) * 40;

      // Keep sun light moderate (0.1 moon, 1.1 daylight max)
      sunRef.current.intensity = THREE.MathUtils.clamp(
        timeFactor * 0.15,
        0.1,
        1.1,
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

    const targetEmissive = isNight ? Math.abs(timeFactor) * 4.0 : 0.6;

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
 * @function
 * @category 3D Assets
 */
useGLTF.preload(`${import.meta.env.BASE_URL}City/city-v2.glb`);

/**
 * CameraLight attaches a spotlight that follows the camera's position,
 * simulating a light source that moves with the viewer.
 *
 * @component
 * @returns {JSX.spotLight} - A spotlight that follows the camera
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
 *
 * @default
 * @component
 * @returns {JSX.Element}
 */
export default function City() {
  // UI states
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [isOverlayActive, setOverlayActive] = useState(false);
  const [overlayContent, setOverlayContent] = useState([]);
  //const [started, setStarted] = useState(false);
  const [openBannerId, setOpenBannerId] = useState(null);
  const [cameraAnimationDone, setcameraAnimationDone] = useState(null);
  //const [cityLoaded, setCityLoaded] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(false); // Unused?

  // Camera/interaction state
  const controlsRef = useRef();
  //const [currentCameraPos, setCurrentCameraPos] = useState([0, 0, 0]); // Reserved
  const [goToSmallText, setGoToSmallText] = useState(false);
  const [smallTextAnchor, setSmallTextAnchor] = useState([0, 0, 0]);
  const [smallTextLookAt, setSmallTextLookAt] = useState([0, 0, 0]);
  const [showExitButton, setShowExitButton] = useState(false);

  const [showBigHeadings, setShowBigHeadings] = useState(false);

  /**
   * Returns camera to initial view and re-enables controls after interacting with banners.
   * @function
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
   * @function
   * @returns {boolean}
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
   * @function
   * @param {string} type - The type of content to open in the overlay.
   */
  const openOverlay = (type) => {
    playSFX("open_overlay", 0.15);

    switch (type) {
      case "dissertation":
        console.log(dissertationData.projects);
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

  /**
   * The entire landing page
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

        {/** The 3D scene with dark grey background */}
        <Canvas
          frameloop="always"
          style={{
            pointerEvents: isOverlayActive ? "none" : "auto",
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
              intensity={!isMobileDevice() ? 4 : 3}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.2}
            />
            {/*<DepthOfField focusDistance={5} focalLength={10} bokehScale={2} />*/}
            <Vignette eskil={false} offset={0.1} darkness={0.7} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
}
