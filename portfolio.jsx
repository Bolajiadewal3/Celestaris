import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

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
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.2, 0.9]} />
          <meshStandardMaterial color="black" />

          <Html
            transform
            occlude
            position={[0, 0, 0.01]} // slightly in front of plane
            center
          >
            <iframe
              src="https://aremuart.wordpress.com/"
              style={{ width: "100%", height: "100%", border: "none" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              scrolling="yes"
            />
          </Html>
        </mesh>
      </Canvas>
    </div>
  );
}
