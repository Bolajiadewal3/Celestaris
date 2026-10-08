import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useEnvironmentStore } from "../Store/useEnvironmentStore";


/**
 * Renders a wet road effect in the 3D scene by adjusting the material properties of the road mesh based on the current weather state.
 * When the weather is set to "rain", the road's material is modified to appear glossy and reflective, simulating a wet surface.
 * When the weather is not "rain", the road's material properties are restored to their original values.
 * The effect is applied only to the mesh named "road" in the scene.
 */
export function WetRoad() {
  const { scene } = useThree();
  const weather = useEnvironmentStore((state) => state.weather);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const meshName = child.name?.toLowerCase() || '';


        if (meshName === 'road') {
          // Clone the material if it hasn't been already so we don't affect houses/cars using "world ap"
          if (!child.material.userData.isClonedForRain) {
            child.material = child.material.clone();
            child.material.userData.isClonedForRain = true;
            child.material.userData.origRoughness = child.material.roughness ?? 0.8;
            child.material.userData.origMetalness = child.material.metalness ?? 0.0;
          }

          if (weather === 'rain') {
            child.material.roughness = 0.12; // Glossy wet asphalt
            child.material.metalness = 0.30; // Water pooling reflection sheen
          } else {
            child.material.roughness = child.material.userData.origRoughness;
            child.material.metalness = child.material.userData.origMetalness;
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [weather, scene]);

  return null;
}