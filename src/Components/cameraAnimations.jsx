/**
 * @module Components
 * @category Utility
 * @description Various camera animation functions
 */

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Uses a linear interpolation to zoom the camera in on launch
 * @param root0
 * @param root0.onComplete
 * @category Camera
 */
function InitialCameraAnimation({ onComplete }) {
  const { camera } = useThree();
  const targetPosition = new THREE.Vector3(0, 35, 150); // Final resting position
  const [done, setDone] = useState(false);

  useFrame(() => {
    if (done) return;

    camera.position.lerp(targetPosition, 0.03);
    camera.lookAt(0, 0, 0);

    if (camera.position.distanceTo(targetPosition) < 1) {
      camera.position.copy(targetPosition);
      setDone(true);
      onComplete(); // Notify parent
    }
  });

  return null;
}

/**
 * Uses an animation to point the camera at a small text box
 * @param root0
 * @param root0.anchor
 * @param root0.lookat
 * @param root0.onComplete
 * @param root0.controlsRef
 * @category Camera
 */
function SmallTextCameraAnimation({ anchor, lookat, onComplete, controlsRef }) {
  const { camera } = useThree();
  const targetPosition = new THREE.Vector3(...anchor);
  const targetLookAt = new THREE.Vector3(...lookat);

  if (controlsRef?.current) {
    console.log("DISABLED ORBIT");
    controlsRef.current.enabled = false;
  }

  // Compute final quaternion once based on desired look direction
  const finalQuaternion = useRef(new THREE.Quaternion());
  useEffect(() => {
    const dummyCam = new THREE.PerspectiveCamera();
    dummyCam.position.copy(targetPosition);
    dummyCam.lookAt(targetLookAt);
    finalQuaternion.current.copy(dummyCam.quaternion);
  }, [anchor, lookat]);

  const [done, setDone] = useState(false);

  useFrame(() => {
    if (done) return;

    camera.position.lerp(targetPosition, 0.1);
    camera.quaternion.slerp(finalQuaternion.current, 0.1);

    const closePosition = camera.position.distanceTo(targetPosition) < 0.1;
    const closeRotation =
      camera.quaternion.angleTo(finalQuaternion.current) < 0.1;

    if (closePosition && closeRotation) {
      camera.position.copy(targetPosition);
      camera.quaternion.copy(finalQuaternion.current);

      if (controlsRef?.current) {
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update(); // Recompute internal state
        console.log("RESET ORBIT");
      }
      setDone(true);
      onComplete();
    }
  });

  return null;
}

export { InitialCameraAnimation, SmallTextCameraAnimation };
