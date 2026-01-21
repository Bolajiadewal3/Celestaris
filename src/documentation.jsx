/**
 * Main Documentation experience and tablet setup.
 * @module Documentation
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
import { useLocation } from "react-router-dom";
import {
  DepthOfField,
  Vignette,
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";

function Tablet() {
  return (
    <group position={[-20, 5, 20]}>
      {" "}
      <mesh>
        <boxGeometry args={[10, 7, 0.2]} />
        <meshStandardMaterial color="#222" roughness={0.1} />
      </mesh>
      {/* The Interactive Documentation Screen */}
      <Html transform occlude distanceFactor={5} position={[0, 0, 0.11]}>
        <iframe
          src="https://mobolajiadewal3.github.io/Celestaris/docs/"
          style={{
            width: "800px",
            height: "600px",
            border: "none",
            background: "white",
          }}
        />
      </Html>
    </group>
  );
}

export default function Documentation() {
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
          <Tablet />

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
