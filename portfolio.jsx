import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { OBJLoader, MTLLoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

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
          // 3. Apply the calculated offset to move from hinge to center
          position={[centerOffset[0], centerOffset[1], centerOffset[2] + 0.01]}
          // Fix the rotation (Macbooks usually need -90 deg on X to face forward)
          //rotation-x={-Math.PI / 2}
          rotation-x={-0.2}
          distanceFactor={2.5}
          center
          occlude
        >
          <iframe
            src="https://aremuart.wordpress.com/"
            style={{
              width: "1024px",
              height: "768px",
              border: "none",
              background: "black",
            }}
          />
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
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
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
