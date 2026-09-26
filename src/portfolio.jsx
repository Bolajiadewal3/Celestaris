/**
 * @module Portfolio
 * @category Scenes
 * @description The computer portfolio scene, with static wordpress showcased via a computer model
 */

import { Suspense } from "react";
import { Loader } from "./Components/overlays.jsx";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Html, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Vignette, EffectComposer, Noise } from "@react-three/postprocessing";
import { AudioButton } from "./Components/overlays.jsx";

//const clickSound = new Audio("./Computer/mouse_click.mp3");
const buttonSound = new Audio("./Computer/button_click.mp3");

/**
 * Orchestrates a cinematic smooth camera transition on component mount.
 * @component
 * @category Camera Logic
 * @param {Object} props
 * @param {function} props.onComplete - Callback executed when the camera reaches the focus threshold.
 */
function CameraRig({ onComplete }) {
  const [active, setActive] = useState(true);

  /** * Target coordinates for the camera focus point in front of the monitor.
   * @type {THREE.Vector3}
   * @inner
   * @memberof CameraRig
   */
  const target = useMemo(() => new THREE.Vector3(0, 0.75, 2.5), []);

  useFrame((state) => {
    if (!active) return;
    state.camera.position.lerp(target, 0.03);
    state.camera.lookAt(0, 1, -4.5);

    if (state.camera.position.distanceTo(target) < 0.1) {
      setActive(false);
      if (onComplete) onComplete();
    }
  });

  return null;
}

/**
 * Debugging tool to map 3D coordinates via keyboard input.
 * @component
 * @category Developer Tools
 * @description Listens for 'Q' keypress to log the current camera Position/Rotation to the console.
 */
function CameraLogger() {
  /**
   * Retrieves the 3D scene's camera
   * @type {JSX.camera}
   */
  const { camera } = useThree();

  useEffect(() => {
    /** If the Q key is pressed at any point */
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "q") {
        const { x, y, z } = camera.position;
        const { x: rx, y: ry, z: rz } = camera.rotation;

        /** Print the camera's position and rotation strictly to two decimal places */
        console.log("--- Camera Coordinates ---");
        console.log(
          `Position: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`,
        );
        console.log(
          `Rotation: [${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)}]`,
        );
      }
    };

    /** Ensures that the event listener is active and also cleaned up on removal of this function */
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera]);

  return null;
}

/**
 * The interactive 3D monitor assembly.
 * @component
 * @category Interactive Objects
 * @description Renders a GLTF monitor with hardware buttons and an embedded HTML/Iframe screen.
 * @param {Object} props
 * @param {function} props.onReady - Triggered when the initial boot sequence/animation is complete.
 */
function Computer({ onReady }) {
  /** * Text label currently displayed on the hardware button tooltip.
   * @type {string|null}
   * @inner
   * @memberof Computer
   */
  const [hoveredText, setHoveredText] = useState(null);

  /** * Toggle state for CRT scanlines and flicker overlays.
   * @type {boolean}
   * @inner
   * @memberof Computer
   */
  const [showEffects, setShowEffects] = useState(true);

  /**
   * Retrieves the current page location
   * @function
   * @type {useLocation}
   */
  const location = useLocation();

  /**
   * Allows for site navigation
   * @function
   * @type {useNavigate}
   */
  const navigate = useNavigate();

  /** * Toggle state for CRT scanlines and flicker overlays.
   * @type {boolean}
   * @inner
   * @memberof Computer
   */
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  /** * The resolved URL for the internal terminal iframe.
   * @type {string}
   * @inner
   * @memberof Computer
   */
  const iframeSrc =
    `${location.state?.iframeUrl}` ||
    `${import.meta.env.BASE_URL}Portfolio/index.html`;

  /**
   * Retrieve's the computer model .GLB
   * @function
   * @type {useGLTF}
   */
  const { scene, nodes } = useGLTF(
    `${import.meta.env.BASE_URL}Computer/Monitor2.glb`,
  );

  /**
   * Calculates the geometric center of the screen mesh for precise HTML overlay alignment.
   * @type {number[]}
   * @inner
   * @memberof Computer
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

  /**
   * Triggers the mechanical button click sound effect.
   * @function
   * @inner
   * @memberof Computer
   */
  const playButton = () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  };

  return (
    <group>
      {/* The static Monitor model */}
      <primitive object={scene} />
      <CameraRig
        onComplete={() => {
          setShouldLoadIframe(true);
          onReady;
        }}
      />

      {/* HARDWARE BUTTON: Site Documentation (Blue) */}
      <mesh
        position={[
          nodes.Button.position.x - 0.17,
          nodes.Button.position.y,
          nodes.Button.position.z + 0.009,
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
          nodes.Button.position.x + 0.17,
          nodes.Button.position.y,
          nodes.Button.position.z,
        ]}
        rotation={nodes.Button.rotation}
        scale={nodes.Button.scale}
        onClick={() => {
          playButton();
          navigate("/", { replace: true });
        }}
        onPointerOver={() => {
          setHoveredText("Back to Home");
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
            nodes.Button.position.x + 0.0,
            nodes.Button.position.y + 0.15,
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
          occlude={false}
          transform
          rotation-order="YXZ"
          position={[
            centerOffset[0] + 0.2,
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
            {shouldLoadIframe ? (
              <iframe src={iframeSrc} className="monitor-iframe" />
            ) : (
              <div className="loading-placeholder">Booting Terminal...</div>
            )}

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
 * Main Portfolio Scene Entry Point.
 * @component
 * @category Scenes
 * @description Orchestrates the 3D Canvas, environment lighting, and post-processing effects.
 * @returns {JSX.Element} The full-screen 3D computer portfolio.
 */
export default function Portfolio() {
  const [isReady, setIsReady] = useState(false);
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <AudioButton
        url={`${import.meta.env.BASE_URL}Computer/office_ambience.mp3`}
      ></AudioButton>
      {/** The custom loading page screen from OVERLAYS */}
      <Suspense fallback={<Loader />}>
        {/** The 3D scene with computer present */}
        <Canvas
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: false }}
          camera={{ position: [10, 10, 20], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <Computer onReady={() => setIsReady(true)} />
          <CameraLogger />

          <group>
            <gridHelper args={[10, 10]} />
          </group>
          {isReady && (
            <EffectComposer>
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          )}
        </Canvas>
      </Suspense>
    </div>
  );
}
