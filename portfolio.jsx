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

          <Html transform occlude>
            <iframe
              src="https://aremuart.wordpress.com/"
              style={{ width: "1024px", height: "768px", border: "none" }}
            />
          </Html>
        </mesh>
      </Canvas>
    </div>
  );
}
