/**
 * @module Documentation
 * @category Scenes
 * @description Technical showcase featuring an interactive 3D tablet.
 */

import { React, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Html, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useState } from "react";
import {
  Vignette,
  Bloom,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";

function Tablet() {
  return (
    <group position={[0, 1.5, -4]} rotation={[-Math.PI / 10, 0, 0]}>
      {/* 1. The Tablet Shell */}
      <mesh castShadow>
        {/* Dimensions: 3.2 units wide, 5 units tall */}
        <boxGeometry args={[3.2, 5, 0.15]} />
        <meshStandardMaterial color="#111" roughness={0.2} />
      </mesh>

      {/* 2. The Screen */}
      <Html
        transform
        occlude="blending"
        distanceFactor={2}
        position={[0, 0, 0.08]}
      >
        <div className="tablet-screen">
          <iframe
            className="tablet-iframe"
            src={`${import.meta.env.BASE_URL}docs/index.html`}
            title="Documentation"
          />
        </div>
      </Html>
    </group>
  );
}

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
