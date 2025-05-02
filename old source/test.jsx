import * as THREE from 'three'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { floor } from 'three/tsl';
import * as ROOM from '/Room.jsx'


function Model(props) {
}



function Scene({ zooming, setZooming }) {
  const { camera } = useThree(); // Access the camera from @react-three/fiber

  // Update the camera position based on the zooming state
  useFrame(() => {

    if (zooming) {
      const viewportWidth = window.innerWidth;
      const zOffset = (viewportWidth / 100);
      //z was 13
      const targetPosition = new THREE.Vector3(-15, 24, -2 + zOffset);
     /* const targetRotation = new THREE.Euler(
        -3.047418245700593,  // X rotation (pitch)
        0,                   // Y rotation (yaw)
        -3.136301604359966,  // Z rotation (roll)
        'XYZ'                // Rotation order
      );*/    
      const targetRotation = new THREE.Euler(
        -(Math.PI),  // X rotation (pitch)
        0,                   // Y rotation (yaw)
        -(Math.PI),  // Z rotation (roll)
        'XYZ'                // Rotation order
      ); 
      const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);
      const distance = camera.position.distanceTo(targetPosition);

      // Define a threshold distance to stop the camera movement
      const threshold = 3;

      if (distance > threshold) {
        camera.position.lerp(targetPosition, 0.015);
        camera.quaternion.slerp(targetQuaternion, 0.015);
        } else {
        // Once we're within the threshold distance, stop zooming
        setZooming(false);
        console.log("Camera is close enough, stopping zoom.");
      }

      //camera.lookAt(-3.047927719510784, -0.006857686465697095,  -3.140948448964855);
    }
  });

  return null; // Scene doesn't render anything directly, it only updates the camera
    //position = _Vector3 {x: -14.998648724950417, y: 26.374741065695474, z: 4.164269307161192}
    //rotation = _Euler {isEuler: true, _x: -3.047927719510784, _y: -0.006857686465697095, _z: -3.140948448964855, _order: 'XYZ', …}
}


    





//logarithmicDepthBuffer: true, 

export default function App() {
  const [zooming, setZooming] = useState(false); // Track zooming state

  useEffect(() => {
    // Trigger zooming after a certain time or based on user action
    const timer = setTimeout(() => {
      setZooming(true); // Start zooming after 2 seconds
    }, 2000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [])


  console.dir(ROOM.Model())



  return (
    <>
    <Canvas shadows gl={{ antialias: false, depth: true }} camera={{ position: [-40, 60, -50], fov: 60 }}  style={{ width: '100%', height: '100%' }} dpr={window.devicePixelRatio}>
    <ROOM.Model scale={15} rotation={[0, Math.PI, 0]} />

      <directionalLight 
    position={[29, 50, -18]} 
    intensity={1}  // Increase intensity for stronger light
    color={0xffd700} // A warm, golden color to simulate sunlight
    castShadow 
    shadow-mapSize-width={512} // High resolution shadows
    shadow-mapSize-height={512}
    shadow-camera-near={0.2}
    shadow-camera-far={25}
    shadow-bias={-0.005}
  />

<Environment 
        background={true}
          backgroundBlurriness={10}
          preset="sunset" 
          environmentIntensity={.3} 
        />


  
<ContactShadows position={[-2, -1, -2]} scale={1.5} blur={2} far={3} />
<hemisphereLight  skyColor={0x87CEEB} groundColor={0x222222} intensity={0.1} />
      <Suspense fallback={null}>
       <Scene zooming={zooming} setZooming={setZooming} />
     
      </Suspense>

    


      
      </Canvas>




 </>
  )
}
/*
  position={[40, 200, 40]} 
  intensity={2.5} 
  castShadow 

    
      <OrbitControls
        enableRotate={!zooming}
        enablePan={!zooming}
        enableZoom={!zooming}
        minPolarAngle={Math.PI / 6} // Min vertical angle (to avoid camera flipping)
        maxPolarAngle={Math.PI / 1.5} // Max vertical angle (to avoid going behind the scene)
        maxDistance={100} // Max zoom out distance
        minDistance={-100} // Min zoom in distance

      />   



      <OrbitControls
        enableRotate={!zooming}
        enablePan={!zooming}
        enableZoom={!zooming}
        minPolarAngle={Math.PI / 6} // Min vertical angle (to avoid camera flipping)
        maxPolarAngle={Math.PI / 1.5} // Max vertical angle (to avoid going behind the scene)
        maxDistance={100} // Max zoom out distance
        minDistance={-100} // Min zoom in distance

      /> 

<mesh position={[29, 40, -18]}>
    <sphereGeometry args={[4, 32, 32]} />  {
    <meshBasicMaterial color={0xff0000} />  
  </mesh>
  <mesh position={[-45, 40, 20]}>
    <sphereGeometry args={[4, 32, 32]} /> 
    <meshBasicMaterial color={0x00ff00} />  
  </mesh>


      <EffectComposer>
  <Bloom 
    intensity={0.1} // Increase intensity for a more dramatic bloom
    radius={0.5}    // Adjust radius to control the spread of the bloom effect
    threshold={0.1} // Make sure only the brightest parts of the scene bloom
  />
</EffectComposer>
      */