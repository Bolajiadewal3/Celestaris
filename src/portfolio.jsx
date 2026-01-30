/**
 * @module Portfolio
 * @category Scenes
 * @description Manages the main 3D portfolio scene, including the smooth camera transition
 * from the world view to the computer terminal.
 */

import { Suspense } from "react";
import { Loader } from "./Components/overlays.jsx";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Vignette,
  Bloom,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";

const clickSound = new Audio("./Computer/mouse_click.mp3");
const buttonSound = new Audio("./Computer/button_click.mp3");

/**
 * Handles the cinematic smooth camera transition on mount.
 * @component
 * @category Camera Logic
 * @description
 * Uses `useFrame` to linearly interpolate (lerp) the camera from its global position
 * to a specific focus point in front of the monitor. Once the camera is within
 * a threshold distance, the animation "disengages" to allow for other interactions.
 */
function CameraRig() {
  const [active, setActive] = useState(true);

  /** @type {THREE.Vector3} */
  // Target coordinates for the camera focus point
  const target = useMemo(() => new THREE.Vector3(0, 0.75, 2.5), []);

  useFrame((state) => {
    if (!active) return;
    // LERP (Linear Interpolation) for smooth "Premium" feel
    state.camera.position.lerp(target, 0.03);
    state.camera.lookAt(0, 1, -4.5);

    if (state.camera.position.distanceTo(target) < 0.1) {
      setActive(false);
    }
  });

  return null;
}

/**
 * Utility developer component for coordinate mapping.
 * @component
 * @category Developer Tools
 * @description Listens for a 'Q' keypress and logs the current camera Position/Rotation.
 */
function CameraLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "q") {
        const { x, y, z } = camera.position;
        const { x: rx, y: ry, z: rz } = camera.rotation;

        console.log("--- Camera Coordinates ---");
        console.log(
          `Position: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`,
        );
        console.log(
          `Rotation: [${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)}]`,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera]);

  return null;
}

/**
 * The 3D Computer terminal assembly.
 * @component
 * @category Interactive Objects
 * @description
 * Renders a GLTF monitor model with interactive hardware buttons and an embedded HTML screen.
 */
function Computer() {
  /** @type {String|null} */
  // State to track which button is currently being hovered
  const [hoveredText, setHoveredText] = useState(null);

  /** @type {Boolean} */
  // Controls the visibility of CRT scanlines and flicker overlays
  const [showEffects, setShowEffects] = useState(true);

  const { scene, nodes } = useGLTF(
    `${import.meta.env.BASE_URL}Computer/Monitor2.glb`,
  );
  const location = useLocation();
  const navigate = useNavigate();

  /** @type {String} */
  const iframeSrc =
    `${location.state?.iframeUrl}` ||
    `${import.meta.env.BASE_URL}Portfolio/index.html`;
  //const iframeSrc = `${import.meta.env.BASE_URL}Portfolio/index.html`;

  console.log(`The imported iframe site is: ${iframeSrc}`);

  /**
   * Calculates the geometric center of the screen mesh.
   * @returns {Array<number>} [x, y, z] offset relative to the mesh position.
   */
  const centerOffset = useMemo(() => {
    if (!nodes.Screen) return [0, 0, 0];
    const box = new THREE.Box3().setFromObject(nodes.Screen);
    const center = new THREE.Vector3();
    box.getCenter(center);
    return [
      center.x - nodes.Screen.position.x,
      center.y - nodes.Screen.position.y,
      center.z - nodes.Screen.position.z,
    ];
  }, [nodes]);

  const playButton = () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  };

  return (
    <group>
      {/* The static Monitor model */}
      <primitive object={scene} />

      {/* HARDWARE BUTTON: Site Documentation (Blue) */}
      <mesh
        position={[
          nodes.Button.position.x - 0.17,
          nodes.Button.position.y,
          nodes.Button.position.z + 0.027,
        ]}
        rotation={nodes.Button.rotation}
        scale={nodes.Button.scale}
        onClick={() => {
          playButton();
          navigate(`/Documentation`);
        }}
        onPointerOver={() => {
          setHoveredText("Site Documentation");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredText(null);
          document.body.style.cursor = "auto";
        }}
      >
        <primitive object={nodes.Button.geometry} attach="geometry" />
        <meshStandardMaterial
          color="blue"
          emissive="cornflowerblue"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* HARDWARE BUTTON: Toggle CRT (Green/Red) */}
      <mesh
        position={nodes.Button.position}
        rotation={nodes.Button.rotation}
        scale={nodes.Button.scale}
        onClick={() => {
          setShowEffects(!showEffects);
          playButton();
        }}
        onPointerOver={() => {
          setHoveredText("Toggle CRT Effects");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredText(null);
          document.body.style.cursor = "auto";
        }}
      >
        <primitive object={nodes.Button.geometry} attach="geometry" />
        <meshStandardMaterial
          color={showEffects ? "green" : "red"}
          emissive={showEffects ? "green" : "red"}
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh
        position={[
          nodes.Button.position.x + 0.15,
          nodes.Button.position.y,
          nodes.Button.position.z,
        ]}
        rotation={nodes.Button.rotation}
        scale={nodes.Button.scale}
        onClick={() => {
          playButton();
          if (document.referrer) {
            window.location.href = document.referrer;
          } else {
            window.location.assign("/Celestaris/");
          }
        }}
        onPointerOver={() => {
          setHoveredText("Go to Last Page");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredText(null);
          document.body.style.cursor = "auto";
        }}
      >
        <primitive object={nodes.Button.geometry} attach="geometry" />
        <meshStandardMaterial
          color="goldenrod"
          emissive="gold"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Dynamic Tooltip Label */}
      {hoveredText && (
        <Html
          position={[
            nodes.Button.position.x + 0.075,
            nodes.Button.position.y + 0.2,
            nodes.Button.position.z,
          ]}
          center
          distanceFactor={3}
        >
          <div className="monitor-tooltip">{hoveredText}</div>
        </Html>
      )}

      {/* VIRTUAL SCREEN: The Interactive Iframe */}
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
          {/* Much cleaner div using conditional class for effects */}
          <div
            className={`screen-container ${
              showEffects ? "effects-active" : ""
            }`}
          >
            <iframe
              src={iframeSrc}
              className="monitor-iframe"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />

            {showEffects && (
              <>
                <div className="scanline-layer" />
                <div className="flicker-layer" />
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
 * Main Portfolio Entry Point.
 * @component
 * @category Scenes
 */
export default function Portfolio() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Suspense fallback={<Loader />}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: false }}
          camera={{ position: [10, 10, 20], fov: 50 }}
        >
          <CameraRig />
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <Computer />
          <CameraLogger />

          <group>
            <gridHelper args={[10, 10]} />
          </group>

          <EffectComposer>
            <Bloom intensity={1.5} mipmapBlur />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
}
