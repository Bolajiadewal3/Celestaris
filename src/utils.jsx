/**
 * Converts an angle from degrees to radians.
 *
 * @param {number} degrees - The angle in degrees that you want to convert to radians.
 * @returns {number} The equivalent angle in radians.
 *
 * @example
 * // Convert 180 degrees to radians
 * degreesToRadians(180); // Returns: 3.141592653589793 (π radians)
 *
 * @example
 * // Convert 90 degrees to radians
 * degreesToRadians(90); // Returns: 1.5707963267948966 (π/2 radians)
 */
export function degreesToRadians(degrees) {
  // Multiply the degrees by π and divide by 180 to convert to radians
  return (degrees * Math.PI) / 180;
}
