/**
 * Main Portfolio experience and computer setup.
 * @module Portfolio
 */
import { React, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import { OBJLoader, MTLLoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DepthOfField,
  Vignette,
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";

const clickSound = new Audio("./Computer/mouse_click.mp3");
const buttonSound = new Audio("./Computer/button_click.mp3");
const navigate = useNavigate();

function CameraRig() {
  const { camera } = useThree();
  const [active, setActive] = useState(true);

  // 1. Create the target as a Vector3 object so distanceTo works correctly
  const target = useMemo(() => new THREE.Vector3(0, 0.75, 2.5), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!active) return;

    // 2. Smoothly move toward the target
    // Increased speed slightly to 0.05 for a better feel
    state.camera.position.lerp(target, 0.03);

    // 3. Keep eyes on the monitor
    state.camera.lookAt(0, 1, -4.5);

    // 4. Correct distance check (Vector3 vs Vector3)
    if (state.camera.position.distanceTo(target) < 0.1) {
      setActive(false);
      console.log("Animation complete. OrbitControls engaged.");
    }
  });

  return (
    // Attach a pointLight directly to the camera
    // This light moves wherever the camera moves
    <primitive object={camera}>
      <pointLight intensity={3} distance={20} color="white" />
    </primitive>
  );
}

function CameraLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "q") {
        // Extracting position
        const { x, y, z } = camera.position;

        // Extracting rotation (in radians)
        const { x: rx, y: ry, z: rz } = camera.rotation;

        console.log("--- Camera Coordinates ---");
        console.log(
          `Position: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`
        );
        console.log(
          `Rotation: [${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)}]`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera]);

  return null;
}

function Computer() {
  const [hoveredText, setHoveredText] = useState(null);

  const handlePointerOver = (text) => {
    // Optional: play a tiny "blip" sound here
    setHoveredText(text);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHoveredText(null);
    document.body.style.cursor = "auto";
  };

  const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  const playButton = () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  };
  //const { scene, nodes } = useGLTF("./Computer/Macbook2.glb");
  const { scene, nodes } = useGLTF(
    `${import.meta.env.BASE_URL}Computer/Monitor2.glb`
  );
  const location = useLocation();
  const [showEffects, setShowEffects] = useState(true);
  const iframeSrc =
    location.state?.iframeUrl ||
    "https://bolajiadewal3.github.io/Celestaris/Portfolio";

  const handleFullReset = () => {
    if (document.referrer) {
      // If there is a previous page in history, go there and force reload
      window.location.href = document.referrer;
    } else {
      // Fallback: Navigate to the root/landing and force refresh
      window.location.assign("/");
    }
  };

  const switchToDocumentation = () => {
    navigate(`${import.meta.env.BASE_URL}Documentation`);
  };

  // 1. Calculate the actual center of the geometry
  const centerOffset = useMemo(() => {
    if (!nodes.Screen) return [0, 0, 0];

    // Create a bounding box for the screen geometry
    const box = new THREE.Box3().setFromObject(nodes.Screen);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // We need the center RELATIVE to the mesh's position
    // This removes the "hinge" offset
    return [
      center.x - nodes.Screen.position.x,
      center.y - nodes.Screen.position.y,
      center.z - nodes.Screen.position.z,
    ];
  }, [nodes]);

  return (
    <group>
      <primitive object={scene} />

      <mesh
        position={[
          nodes.Button.position.x - 0.15,
          nodes.Button.position.y,
          nodes.Button.position.z,
        ]}
        rotation={nodes.Button.rotation}
        scale={nodes.Button.scale}
        onClick={() => {
          playButton();
          switchToDocumentation();
        }}
        onPointerOver={() => handlePointerOver("Site Documentation")}
        onPointerOut={handlePointerOut}
      >
        {/* We use the geometry and material already in the file */}
        <primitive object={nodes.Button.geometry} attach="geometry" />
        <meshStandardMaterial
          color="blue"
          emissive="cornflowerblue"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh
        position={nodes.Button.position}
        rotation={nodes.Button.rotation}
        scale={nodes.Button.scale}
        onClick={() => {
          setShowEffects(!showEffects);
          playButton();
        }}
        onPointerOver={() => handlePointerOver("Toggle CRT Effects")}
        onPointerOut={handlePointerOut}
      >
        {/* We use the geometry and material already in the file */}
        <primitive object={nodes.Button.geometry} attach="geometry" />
        <meshStandardMaterial
          color={showEffects ? "green" : "red"}
          emissive={showEffects ? "green" : "red"}
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh
        // Offset slightly on the X axis to place it next to the first button
        position={[
          nodes.Button.position.x + 0.15,
          nodes.Button.position.y,
          nodes.Button.position.z,
        ]}
        rotation={nodes.Button.rotation}
        scale={nodes.Button.scale}
        onClick={() => {
          playButton();
          handleFullReset();
        }}
        onPointerOver={() => handlePointerOver("Go To Last Page")}
        onPointerOut={handlePointerOut}
      >
        <primitive object={nodes.Button.geometry} attach="geometry" />
        <meshStandardMaterial
          color="goldenrod"
          emissive="gold"
          emissiveIntensity={0.8}
        />
      </mesh>

      {hoveredText && (
        <Html
          // Position it slightly above the buttons
          position={[
            nodes.Button.position.x + 0.075,
            nodes.Button.position.y + 0.2,
            nodes.Button.position.z,
          ]}
          center
          distanceFactor={3} // Adjust size based on camera distance
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "4px 10px",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "12px",
              whiteSpace: "nowrap",
              border: "1px solid red",
              pointerEvents: "none", // Critical so it doesn't block clicks
              boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
            }}
          >
            {hoveredText}
          </div>
        </Html>
      )}

      <group
        position={nodes.Screen.position}
        rotation={nodes.Screen.rotation}
        scale={nodes.Screen.scale}
      >
        <Html
          transform
          rotation-order="YXZ"
          position={[
            centerOffset[0] + 0.09,
            centerOffset[1],
            centerOffset[2] - 0.05,
          ]}
          rotation-y={Math.PI / 2}
          rotation-x={-0.15}
          distanceFactor={0.7}
          center
        >
          <style>{`
        @keyframes scanline-scroll {
          from { background-position: 0 0; }
          to { background-position: 0 40px; }
        }
        @keyframes crt-flicker {
          0% { opacity: 0.01; }
          50% { opacity: 0.04; }
          100% { opacity: 0.01; }
        }
      `}</style>
          <div
            style={{
              position: "relative",
              width: "950px",
              height: "850px",
              background: "black",
              overflow: "hidden",
              borderRadius: "40px",
              boxShadow: showEffects
                ? "0 0 50px rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.1)"
                : "none",
              transform: showEffects ? "scale(1.05)" : "scale(1.04)",
              transition: "all 0.3s ease", // Smooth transition when toggling
            }}
          >
            {/* 1. THE IFRAME */}
            <iframe
              src={iframeSrc}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                // Filters only apply when effects are on
                filter: showEffects ? "brightness(1) contrast(1.1)" : "none",
              }}
            />

            {showEffects && (
              <>
                {/* 2. CHUNKY MOVING SCANLINES */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 100,
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 10px, transparent 10px, transparent 20px)",
                    backgroundSize: "100% 20px",
                    animation: "scanline-scroll 4s linear infinite",
                    opacity: 0.2,
                  }}
                />

                {/* 3. FLICKER LAYER */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 101,
                    background: "transparent",
                    animation: "crt-flicker 0.2s infinite",
                  }}
                />
              </>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}Computer/Monitor2.glb`);

/**
 * Main application component rendering a Three.js city scene,
 * interactive UI overlays, banners, and ambient experience.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Portfolio() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false }}
        camera={{ position: [10, 10, 20], fov: 50 }}
      >
        <Suspense fallback={<Html center>Loading Experience...</Html>}>
          <CameraRig />
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={0.8}
          />
          <pointLight position={[2, 2, 2]} intensity={1.5} color="#ff00ff" />
          <Computer />
          <CameraLogger />

          <group>
            <gridHelper args={[10, 10]} />
          </group>

          <EffectComposer>
            <Bloom
              luminanceThreshold={1}
              intensity={1.5}
              levels={9}
              mipmapBlur
            />
            <Noise opacity={0.05} /> {/* Adds a subtle cinematic grain */}
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
