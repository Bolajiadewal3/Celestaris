import React from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { OBJLoader, MTLLoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo, useState } from "react";

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
    state.camera.position.lerp(target, 0.05);

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

function CameraLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "q") {
        // Extracting position
        const { x, y, z } = camera.position;

        // Extracting rotation (in radians)
        const { x: rx, y: ry, z: rz } = camera.rotation;

        console.log("--- Camera Coordinates ---");
        console.log(
          `Position: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`
        );
        console.log(
          `Rotation: [${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)}]`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera]);

  return null;
}

function Computer() {
  //const { scene, nodes } = useGLTF("./Computer/Macbook2.glb");
  const { scene, nodes } = useGLTF("./Computer/Monitor.glb");

  // 1. Calculate the actual center of the geometry
  const centerOffset = useMemo(() => {
    if (!nodes.Screen) return [0, 0, 0];

    // Create a bounding box for the screen geometry
    const box = new THREE.Box3().setFromObject(nodes.Screen);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // We need the center RELATIVE to the mesh's position
    // This removes the "hinge" offset
    return [
      center.x - nodes.Screen.position.x,
      center.y - nodes.Screen.position.y,
      center.z - nodes.Screen.position.z,
    ];
  }, [nodes]);

  return (
    <group>
      <primitive object={scene} />

      {/* 2. Anchor to the Screen's transformation */}
      <group
        position={nodes.Screen.position}
        rotation={nodes.Screen.rotation}
        scale={nodes.Screen.scale}
      >
        <Html
          transform
          rotation-order="YXZ"
          position={[
            centerOffset[0] + 0.08,
            centerOffset[1],
            centerOffset[2] - 0.05,
          ]}
          rotation-y={Math.PI / 2}
          rotation-x={-0.15}
          distanceFactor={0.7}
          center
        >
          <style>{`
        @keyframes scanline-scroll {
          from { background-position: 0 0; }
          to { background-position: 0 40px; }
        }
        @keyframes crt-flicker {
          0% { opacity: 0.01; }
          50% { opacity: 0.04; }
          100% { opacity: 0.01; }
        }
      `}</style>
          <div
            style={{
              position: "relative",
              width: "950px",
              height: "850px",
              background: "black",
              overflow: "hidden",
              borderRadius: "40px",
              // THE BULGE: A subtle outward glow and scale makes it look convex
              boxShadow:
                "0 0 50px rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.1)",
              transform: "scale(1.05)",
            }}
          >
            {/* 1. THE IFRAME */}
            <iframe
              src="https://aremuart.wordpress.com/"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                filter: "brightness(1) contrast(1.1)", // Reduced darkening
              }}
            />

            {/* 2. CHUNKY MOVING SCANLINES */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 100,
                // Larger lines (8px) with a slight movement animation
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0.3) 4px, transparent 4px, transparent 8px)",
                backgroundSize: "100% 8px",
                animation: "scanline-scroll 4s linear infinite",
                opacity: 0.4,
              }}
            />

            {/* 3. FLICKER LAYER */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 101,
                background: "rgba(18, 16, 16, 0.05)",
                animation: "crt-flicker 0.2s infinite",
              }}
            />
          </div>
        </Html>
      </group>
    </group>
  );
}

/**
 * ComputerModel loads a textured 3D computer model (OBJ + MTL) and adds it to the scene.
 * It also calls `onLoad` once the model is fully loaded.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onLoad - Callback triggered after the model is successfully loaded
 * @returns {JSX.Element} - A group element containing the loaded 3D city model
 */
function ComputerModel({ onLoad }) {
  const group = useRef();
  const { scene } = useThree(); // Scene is available if needed, though unused here

  /*
  // Load the city texture for use in the material (optional for visual debugging or preview)
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "./Computer/cityPAL.jpg",
      (texture) => {
        console.log("Texture loaded", texture);
        // This texture can be stored and used if needed later
      },
      undefined,
      (err) => {
        console.error("Texture load failed", err);
      }
    );
  }, []);
*/

  useEffect(() => {
    const mtlLoader = new MTLLoader();

    // Load material definitions
    mtlLoader.load("./Computer/obj.mtl", (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials); // Attach materials to the OBJ loader

      // Load the OBJ model
      objLoader.load("./Computer/obj.obj", (obj) => {
        // Compute bounding box
        const box = new THREE.Box3().setFromObject(obj);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        box.getSize(size);
        box.getCenter(center);

        // Recenter model
        obj.position.sub(center);

        // Normalize scale (fit inside ~2 units)
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        obj.scale.setScalar(scale);

        obj.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        group.current.add(obj);
        const helper = new THREE.BoxHelper(obj, 0xff0000);
        group.current.add(helper);
        onLoad?.();
      });
    });

    // Cleanup function to dispose of the model and its resources
    return () => {
      if (group.current) {
        group.current.children.forEach((obj) => {
          group.current.remove(obj);
          obj.traverse((child) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        });
      }
    };
  }, []);

  return (
    <group ref={group} position={[0, -0.8, 0]} rotation={[0, Math.PI, 0]}>
      {/* model is injected here */}
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
      <Canvas camera={{ position: [10, 10, 20], fov: 50 }}>
        <CameraRig />
        <ambientLight intensity={0.5} />

        <Computer />
        <CameraLogger />

        <group>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>

          {/*

          <mesh position={[0, 0, 1]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>

          <mesh position={[0, 0, 3]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>

          <mesh position={[0, 0, 10]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>

          <mesh position={[0, 10, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>


          <mesh position={[1, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="blue" />
          </mesh>
          <mesh position={[-1, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="blue" />
          </mesh>

          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="green" />
          </mesh> 
          */}

          <gridHelper args={[10, 10]} />
        </group>

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
        {/*
        <OrbitControls
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          panSpeed={0.5}
        />
        */}
      </Canvas>
    </div>
  );
}
