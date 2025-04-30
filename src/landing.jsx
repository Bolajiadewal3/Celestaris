// LandingPage.jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Helper to create gradient background
function GradientBackground() {
  const { camera, scene } = useThree();
  const planeRef = useRef();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#eeeeee');
    gradient.addColorStop(1, '#000000');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    if (planeRef.current) {
      planeRef.current.material.map = texture;
      planeRef.current.material.needsUpdate = true;
      camera.add(planeRef.current);
    scene.add(camera);
    }
  }, [camera, scene]);


  return (
    <mesh ref={planeRef} position={[0, 0, -50]}>
      <planeGeometry args={[300, 100]} />
      <meshBasicMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

// Sector Cube
function Sector({ name, position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="skyblue" />
      {/* Label using CSS2D-like Html */}
      <Html distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>
          {name}
        </div>
      </Html>
    </mesh>
  );
}

export default function App() {
  const sectors = [
    { name: "Game Design & Development", position: [0, 10, -20] },
    { name: "Business Intelligence & Analytics", position: [20, 10, 0] },
    { name: "Miscellaneous", position: [0, 10, 20] },
    { name: "Dissertation", position: [-20, 10, 0] },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, -10, 7], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <GradientBackground />
        {sectors.map((sector, index) => (
          <Sector key={index} name={sector.name} position={sector.position} />
        ))}
        <OrbitControls
          target={[0, -15, -10]}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={10}
          maxDistance={100}
        />
      </Canvas>
    </div>
  );
}
