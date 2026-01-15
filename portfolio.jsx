import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

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
