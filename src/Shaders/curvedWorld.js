/**
 * @file curvedWorld.js
 * @description This module provides a function to apply a curved world effect to a Three.js material.
 * The effect simulates a rolling horizon by bending the geometry downward based on its distance from the origin.
 * It modifies the vertex shader of the material to achieve this effect.
 */
import * as THREE from "three";

/**
 * Applies a curved world effect to a given material by modifying its vertex shader.
 * The effect simulates a rolling horizon by bending the geometry downward based on its distance from the origin.
 * This is achieved by adjusting the Y-coordinate of each vertex in the shader based on its distance from the center of the world.
 * @param material - The material to which the curved world effect will be applied.
 * @param curvature - The curvature factor determining how much the world bends. Default is 0.0015.
 */
export function applyCurvedWorld(material, curvature = 0.0015) {
  if (!material) return;

  /**
   *  Defines the onBeforeCompile hook for the material, which allows us to modify the shader code before it is compiled.
   *  This is where we inject our custom vertex transformation logic to achieve the curved world effect.
   * @param shader
   */
  material.onBeforeCompile = (shader) => {
    // Inject the bend logic right after standard vertex transformations take place
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>
      
      // 'transformed' is the local vertex position provided by Three.js
      // Transform it roughly to world space distance from the center
      vec4 wp = modelMatrix * vec4(transformed, 1.0);
      
      // Calculate distance from origin on the XZ plane
      float dist = length(wp.xz);
      
      // Apply the rolling horizon downward drop on the Y-axis
      transformed.y -= (dist * dist) * ${curvature.toFixed(4)};
      `,
    );
  };
}
