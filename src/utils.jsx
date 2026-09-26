/**
 * Utility function to convert DEGREES to RADIANS; for easier expression of rotations
 * @module Utilities
 * @function
 * @category Utility
 * @returns {number} - The RADIAN equivalent value of the input degrees
 */
export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
