import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { OBJLoader, MTLLoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Computer() {
  const { scene, nodes } = useGLTF("./Computer/Macbook2.glb");

  // Compute bounding box for screen to find its center
  const screenRef = useRef();

  useEffect(() => {
    if (!screenRef.current) return;
    const box = new THREE.Box3().setFromObject(screenRef.current);
    const center = new THREE.Vector3();
    box.getCenter(center);
    // Recenter mesh so origin is at the center
    screenRef.current.position.sub(center);
  }, []);

  return (
    <group>
      <primitive object={scene} />

      {/* Group for screen + iframe */}
      <group
        position={nodes.Screen.position}
        rotation={nodes.Screen.rotation}
        scale={nodes.Screen.scale}
      >
        <mesh ref={screenRef} geometry={nodes.Screen.geometry}>
          <meshStandardMaterial color="red" />
        </mesh>

        <Html transform center distanceFactor={1.2} position={[0, 0, 0.01]}>
          <iframe
            src="https://aremuart.wordpress.com/"
            style={{ width: "1024px", height: "768px", border: "none" }}
          />
        </Html>
      </group>
    </group>
  );
}

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
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Computer />

        {/*
        <ComputerModel />

        <mesh>
          <planeGeometry args={[1.2, 0.9]} />
          <meshStandardMaterial color="#111" />

          <Html
            transform
            center
            distanceFactor={1.2}
            position={[0, 0, 0.01]}
            occlude
          >
            <iframe
              src="https://aremuart.wordpress.com/"
              style={{
                width: "1024px",
                height: "768px",
                border: "none",
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </Html>
        </mesh>


        */}
        {/* Add OrbitControls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          panSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
