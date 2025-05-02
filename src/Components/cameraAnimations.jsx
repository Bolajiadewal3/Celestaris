import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * InitialCameraAnimation animates the camera's movement towards a target position in the 3D scene.
 * Once the camera reaches the target position, it notifies the parent component via the `onComplete` callback.
 *
 * @param {Object} props - The props for the InitialCameraAnimation component.
 * @param {Function} props.onComplete - Callback function that is triggered when the camera finishes its movement.
 *
 * @returns {JSX.Element} The rendered component (null as it doesn't return UI elements, just runs logic).
 */
function InitialCameraAnimation({ onComplete }) {
  const { camera } = useThree(); // Accessing the camera from the three.js scene.
  const targetPosition = new THREE.Vector3(0, 35, 150); // Final position the camera moves to.
  const [done, setDone] = useState(false); // State to track if the animation is complete.

  // useFrame is a hook provided by react-three-fiber to run logic every frame.
  useFrame(() => {
    if (done) return; // If the animation is done, stop updating.

    // Linearly interpolating the camera's position towards the target position.
    camera.position.lerp(targetPosition, 0.03);

    // Ensuring the camera looks at the center of the scene (0, 0, 0).
    camera.lookAt(0, 0, 0);

    // Check if the camera is close enough to the target position (within a small threshold).
    if (camera.position.distanceTo(targetPosition) < 1) {
      // Once close enough, set the camera to the exact target position.
      camera.position.copy(targetPosition);
      setDone(true); // Mark the animation as complete.
      onComplete(); // Notify the parent component that the animation is complete.
    }
  });

  return null; // This component doesn't render anything UI-wise, it just handles logic.
}

/**
 * SmallTextCameraAnimation animates the camera's movement and rotation towards a target position
 * and orientation, while disabling the OrbitControls during the animation. Once the camera reaches
 * the target position and orientation, it triggers the `onComplete` callback and resets the OrbitControls.
 *
 * @param {Object} props - The props for the SmallTextCameraAnimation component.
 * @param {Array} props.anchor - The target position ([x, y, z]) the camera will move towards.
 * @param {Array} props.lookat - The target point the camera will look at ([x, y, z]).
 * @param {Function} props.onComplete - Callback function that is triggered when the camera finishes its movement.
 * @param {Object} [props.controlsRef] - A reference to the OrbitControls instance, used to disable controls during animation.
 *
 * @returns {JSX.Element} The rendered component (null as it doesn't return UI elements, just runs logic).
 */
function SmallTextCameraAnimation({ anchor, lookat, onComplete, controlsRef }) {
  const { camera } = useThree(); // Accessing the camera from the three.js scene.

  // Setting the target position and the point the camera will look at.
  const targetPosition = new THREE.Vector3(...anchor);
  const targetLookAt = new THREE.Vector3(...lookat);

  // Disabling OrbitControls if they are provided, so the user cannot move the camera during the animation.
  if (controlsRef?.current) {
    console.log("DISABLED ORBIT");
    controlsRef.current.enabled = false;
  }

  // Ref to store the final quaternion for camera orientation
  const finalQuaternion = useRef(new THREE.Quaternion());

  // Effect to compute the final quaternion based on the desired look direction
  useEffect(() => {
    const dummyCam = new THREE.PerspectiveCamera();
    dummyCam.position.copy(targetPosition);
    dummyCam.lookAt(targetLookAt);
    finalQuaternion.current.copy(dummyCam.quaternion); // Store quaternion once the camera is oriented correctly
  }, [anchor, lookat]); // Recompute the quaternion if the anchor or lookat changes

  const [done, setDone] = useState(false); // State to track if the animation is finished

  // useFrame hook updates every frame to animate the camera's position and rotation
  useFrame(() => {
    if (done) return; // Skip if the animation is already complete

    // Linearly interpolate the camera's position towards the target position
    camera.position.lerp(targetPosition, 0.1);
    // Spherically interpolate the camera's rotation towards the target orientation (quaternion)
    camera.quaternion.slerp(finalQuaternion.current, 0.1);

    // Check if the camera is close enough to the target position and orientation
    const closePosition = camera.position.distanceTo(targetPosition) < 0.1;
    const closeRotation =
      camera.quaternion.angleTo(finalQuaternion.current) < 0.1;

    // If both position and rotation are close to the target, complete the animation
    if (closePosition && closeRotation) {
      camera.position.copy(targetPosition);
      camera.quaternion.copy(finalQuaternion.current);

      // If controlsRef is provided, reset the OrbitControls' target and update its internal state
      if (controlsRef?.current) {
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update(); // Recompute internal state to reflect the new target position
        console.log("RESET ORBIT");
      }

      // Mark the animation as complete
      setDone(true);
      onComplete(); // Notify the parent component that the animation is complete
    }
  });

  return null; // This component doesn't render any UI, just runs the camera animation logic
}

export { InitialCameraAnimation, SmallTextCameraAnimation };
