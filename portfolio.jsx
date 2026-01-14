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
      <mesh>
        <planeGeometry args={[1.2, 0.9]} />
        <meshStandardMaterial color="black" />
        <Html transform occlude>
          <iframe src="https://aremuart.wordpress.com/" />
        </Html>
      </mesh>
    </div>
  );
}
