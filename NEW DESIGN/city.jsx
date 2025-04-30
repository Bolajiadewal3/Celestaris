import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Edges, Sky, Environment, OrbitControls, Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader, MTLLoader } from 'three-stdlib'
import { DepthOfField, Vignette, Bloom, SMAA, BrightnessContrast, EffectComposer, HueSaturation } from '@react-three/postprocessing'
import { useTrail, animated, useSpring } from '@react-spring/web';
import { a } from '@react-spring/three';



import projectData from '/data/Business Intelligence & Analytics.json';
//import poetryData from '/data/Business Intelligence & Analytics.json';
import dissertationData from '/data/Dissertation.json';
import miscData from '/data/Miscellaneous.json';
import { cameraViewMatrix } from 'three/tsl';



const degreesToRadians = (deg) => (deg * Math.PI) / 180;



function StartScreen({ onStart, visible }) {
    const styles = useSpring({
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      config: { duration: 500 },
    });
  
    return (
      <animated.div
        style={{
          ...styles,
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <button
            id="startButton"
          style={{
            padding: '20px 40px',
            fontSize: '42px',
            fontWeight: 'bold',
            borderRadius: '12px',
           
            fontFamily: 'Orbitron, sans-serif',
          }}
          onClick={onStart}
        >
          By MOBOLAJI ADEWALE
        </button>
      </animated.div>
    );
  }
  
  


function Overlay({ isActive, onClose, items = []  }) {
    const [hovered, setHovered] = useState(false);



    const overlaySpring = useSpring({
        opacity: isActive ? 1 : 0,
        config: { tension: 220, friction: 50 },
      });




      const trail = useTrail(Array.isArray(items) ? items.length : 0, {
        from: { transform: 'translateX(200%)', opacity: 0 },
        to: {
          transform: isActive ? 'translateX(0%)' : 'translateX(100%)',
          opacity: isActive ? 1 : 0,
        },
        config: { mass: 1, tension: 150, friction: 100, delay: 100 },
      });




      /*
      const trail = useTrail(items.length, index => ({
        from: {
          transform: index % 2 === 0 ? 'translateX(-100vw)' : 'translateX(100vw)',
          opacity: 0,
        },
        to: {
          transform: isActive ? 'translateX(0%)' : (index % 2 === 0 ? 'translateX(-100vw)' : 'translateX(100vw)'),
          opacity: isActive ? 1 : 0,
        },
        config: { mass: 1, tension: 200, friction: 30 },
      }));*/
    
      return (
        <animated.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.9)',
            pointerEvents: isActive ? 'auto' : 'none',
            opacity: overlaySpring.opacity,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'flexStart', // Center horizontally
            alignItems: 'center',
            flexDirection: "column" ,   // Center vertically
            overflowX: "hidden",
            overflowY:"auto"
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            color: 'white',
            fontSize: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 20,
       
          }}
          onClick={onClose}
        >
          Exit
        </div>


        {trail.map((style, index) => (
        <animated.div
          key={index}
          style={{
            ...style,
            width: '80%',
            height: "auto",
            background: '#222',
            color: '#fff',
            padding: '20px',
            marginBottom: '15px', 
            marginTop: '15px', 
            borderRadius: '12px',
            transform: style.transform // alternate direction

            //transform: index % 2 === 0 ? style.transform : style.transform.to(v => v.replace('X', '-X')), // alternate direction
          }}
        >
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{items[index].title}</h2>
          <a  href={items[index].siteLink}
                /*onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    background: hovered ? 'white' : '#444',
                    color: hovered ? 'black' : 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Orbitron, sans-serif',
                }}*/
                >Go To</a>
          <p>{items[index].abstract}</p>
          
        </animated.div>
      ))}




  

      </animated.div>
    );
  }







function GlowingTextBanner({ text = 'Projects', position = [0, 5, 0], rotation = [0, 0, 0],  onClick }) {
    const [hovered, setHovered] = useState(false);
    const textWidth = text.length * 5; // Estimate; adjust based on font
    const padding = 2;
    const boxWidth = textWidth + padding;
    const boxHeight = 13.5;


    return (
        <group position={position} rotation={rotation}>





        {/* Invisible Box with Border */}
        <mesh>
          <planeGeometry args={[boxWidth, boxHeight]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges scale={1.01}>
            <lineBasicMaterial color="#ffd700" />
          </Edges>
        </mesh>
  
        {/* Glowing Text */}
        <Text
          fontSize={10}
          style={{ fontFamily: 'Arial', fontWeight: 'bold' }}
          color={hovered ? '#ff0000' : '#ffd700'}
          anchorX="center"
          anchorY="middle"
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          {text}
        </Text>
      </group>
    );
  }



  function SmallTextBanner({ title = 'SMALL TEXT', text = 'text', position = [0, 10, 0], rotation = [0, 0, 0], width=10,  onClick, isOpen, onOpen }) {
    const textWidth = text.length * 1.1; // Estimate; adjust based on font
    const padding = 0.3;
    const boxWidth = width+padding;
    const boxHeight = 10;

    console.log(isOpen)
    console.log(onOpen)

    const [open, setOpen] = useState(false)
    


    const { scale, box } = useSpring({
        scale: isOpen ? 1 : 0,
        box: isOpen ? 0 : 1,

        config: { mass: 1, tension: 170, friction: 150 }
      })

    return (
        <group position={position} rotation={rotation} >




    <a.mesh scale={box} position={[0, 10, -3]} onClick={() => { onClick(); onOpen(); setOpen(true); console.log(open); }}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="orange" emissive={"orange"} />
      </a.mesh>




        {/* Invisible Box with Border */}

  




  {/* Title */}

  <a.group scale={scale}>

  <mesh>
  <planeGeometry  args={[boxWidth, boxHeight]} />
  <meshBasicMaterial  transparent opacity={0}   />
  <Edges scale={1.002} threshold={15}>
    <lineBasicMaterial color="#000000"  toneMapped={false}  />
  </Edges>
</mesh>


    <Text 
    maxWidth={width}   
    fontSize={1.6}
    color='black'
    anchorX="center"
    anchorY="center"
    textAlign="center"
    position={[0, 5, 1]} // shift upward a bit

  >
    {title}
  </Text>

  {/* Text */}
    <Text 
        maxWidth={width}  
          fontSize={1.0}
          color='black'
          anchorX="center"
          anchorY="center"
          textAlign="center"
          position={[0, 2.5, 1]} // shift upward a bit

        >
    {text}
  </Text>

  </a.group>

      </group>
    );
  }





function CityModel() {
    const group = useRef()
    const { scene } = useThree()

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load("/cityPAL.jpg", (texture) => {
          console.log("Texture loaded", texture);
        }, undefined, (err) => {
          console.error("Texture load failed", err);
        });
      }, []);
  
    useEffect(() => {
        const mtlLoader = new MTLLoader()
        mtlLoader.load('/cityMAT.mtl', (materials) => {
        materials.preload()
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials); // 👈 attach materials here

        objLoader.load('/city.obj', (obj) => {
        obj.scale.set(0.15, 0.15, 0.15) // Adjust to fit your scene
        obj.position.set(70, 0, -65)

        obj.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        group.current.add(obj)
      })
        })

        return () => {
            if (group.current && obj) {
              group.current.remove(obj);
              obj.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach(mat => mat.dispose());
                  } else {
                    child.material.dispose();
                  }
                }
              });
            }
          };

      
    }, [])
  
    return <group ref={group} />
  }


  function CameraLight() {
    const { camera } = useThree();
    const lightRef = useRef();
  
    useFrame(() => {
      if (lightRef.current && camera) {

        lightRef.current.position.copy(camera.position);
      }
    });
  
    return (
      <spotLight
        ref={lightRef}
        intensity={10}
        angle={0.4}
        penumbra={0.5}
        distance={300}
        decay={0.6}
        castShadow
      />

      

      
      
    );
  }

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


  function SmallTextCameraAnimation({ anchor, lookat, onComplete, controlsRef }) {
    const { camera } = useThree();
    const targetPosition = new THREE.Vector3(...anchor);
    const targetLookAt = new THREE.Vector3(...lookat);
  

    if (controlsRef?.current) {
        console.log("DISABLED ORBIT")
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
      const closeRotation = camera.quaternion.angleTo(finalQuaternion.current) < 0.1;
  
      if (closePosition && closeRotation) {
        camera.position.copy(targetPosition);
        camera.quaternion.copy(finalQuaternion.current);


        if (controlsRef?.current) {
            controlsRef.current.target.copy(targetLookAt);
            controlsRef.current.update(); // Recompute internal state
            console.log("RESET ORBIT")
          }
        setDone(true);
        onComplete();
      }
    });
  
    return null;
  }
  




export default function App() {
    const [controlsEnabled, setControlsEnabled] = useState(false);
    const [isOverlayActive, setOverlayActive] = useState(false);
    const [overlayContent, setOverlayContent] = useState([]);
    const [started, setStarted] = useState(false);
    const [openBannerId, setOpenBannerId] = useState(null);
    const [cameraAnimationDone, setcameraAnimationDone] = useState(null);

    const controlsRef = useRef();

    const [initialAnimation, setInitialAnimation] = useState(false);


    const [goToSmallText, setGoToSmallText] = useState(false);
    const [smallTextAnchor, setSmallTextAnchor] = useState([0, 0, 0]); // Initial anchor
    const [smallTextLookAt, setSmallTextLookAt] = useState([0, 0, 0]);
    const [showExitButton, setShowExitButton] = useState(false);

    const resetOrbit = () => {
        // Reset camera target and re-enable OrbitControls
        setOpenBannerId(null)
        controlsRef.current.target.copy(new THREE.Vector3(0, 0, 0));
        setShowExitButton(false);
        setControlsEnabled(true); // Re-enable OrbitControls
      };

    const [currentCameraPos, setCurrentCameraPos] = useState([0, 0, 0]);

    //const smallTextAnchor = use

    const toggleOverlay = () => {
        setOverlayActive(prev => {
          const newState = !prev;
          if (controlsRef.current) {
            controlsRef.current.enabled = !newState; // Disable when overlay is on
          }
          return newState;
        });
      };



        const openOverlay = (type) => {
            if (type === 'projects')  {console.log(projectData); setOverlayContent(projectData.projects); }
            else if (type === 'dissertation') setOverlayContent(dissertationData.projects); // etc.
            else if (type === 'miscellaneous') setOverlayContent(miscData.projects); // etc.
            //else if (type === 'poetry') setOverlayContent(poetryData); // etc.

            setOverlayActive(true);
          };


          const [audioStarted, setAudioStarted] = useState(false);

          const startAudio = () => {
            if (!audioStarted) {
              const audio = new Audio("/cityAMBIENCE.mp3");
              audio.loop = true;
              audio.play();
              setAudioStarted(true);
            }
          };



  return (




    
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>


{showExitButton && (
        <button className='smallTextButton' onClick={resetOrbit}>
          Return
        </button>
      )}


{!cameraAnimationDone && started && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 100,
      pointerEvents: "all",
    }}
  />
)}
        


<StartScreen 
  onStart={() => {
    startAudio();
    setStarted(true);
  }} 
  visible={!started}
/>

<Overlay isActive={isOverlayActive} onClose={toggleOverlay}  items={overlayContent}/>


{started && (

      <Canvas 
      shadows
        camera={{ position: [0, 70, 500], fov: 50 }}
        onCreated={({ scene }) => {
            scene.fog = new THREE.Fog(new THREE.Color('#6a0dad'), 0, 1600) // purple fog
            
          }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          performance={{ min: 0.8 }}
        >

<OrbitControls
            ref={controlsRef}
          target={[0, 0, 0]}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={10}
          maxDistance={220}
          enabled={controlsEnabled}
        />


<InitialCameraAnimation onComplete={() => {setControlsEnabled(true); setcameraAnimationDone(true)}} />


{goToSmallText && (<SmallTextCameraAnimation anchor={smallTextAnchor} lookat={smallTextLookAt} onComplete={() => {setGoToSmallText(false); setShowExitButton(true); console.log("EXIT BUTTON SHOULD BE TRUE; IT IS: ", showExitButton)}} controlsRef={controlsRef} />)}






<SmallTextBanner
title={"About Me" }
  text={"24 Year Old Software Engineer, Creative & National American Football Player" }
  position={[-40, -8.5, 90]} 
  rotation={[0, degreesToRadians(-13), 0]}
  width={17}

  isOpen={openBannerId === '1'}
  onOpen={() => setOpenBannerId('1')}
        
  onClick={() => {  
    setSmallTextAnchor([-49, 3, 132]); 
    setSmallTextLookAt([-40, -8.5, 90]);
    setGoToSmallText(true);
    setControlsEnabled(false)}
    
  }

/>


<SmallTextBanner 
    title={"Education"}
  text={'University of Nottingham - BSc Computer Science\nUniversity of Nottingham - MSc Information Systems & Operations Management\nUniversity of Arizona - MS Information Science: Human Centered Computing'}
  position={[80, -8.5, 142]} 
  rotation={[0, degreesToRadians(-1.5), 0]}
  width={30}

  isOpen={openBannerId === '2'}
  onOpen={() => setOpenBannerId('2')}

  onClick={() => {  
    setSmallTextAnchor([83, 2, 186]); 
    setSmallTextLookAt([80, -8.5, 0]);
    setGoToSmallText(true);
    setControlsEnabled(false)}
    
  }

/>


<SmallTextBanner 
    title={"Contact Me"}
  text={'bolajidgs@gmail.com\nmadewale@arizona.edu\n@bolaji.ad'}
  position={[62.5, -8.5, -135]} 
  rotation={[0, degreesToRadians(177), 0]}
  width={30}

  isOpen={openBannerId === '3'}
  onOpen={() => setOpenBannerId('3')}
  
  onClick={() => {  
    setSmallTextAnchor([65, 2, -176]); 
    setSmallTextLookAt([62.5, -8.5, -135]);
    setGoToSmallText(true);
    setControlsEnabled(false)}
    
  }
/>




<GlowingTextBanner 
  text="Projects" 
  position={[-70, 30, -30]} 
  onClick={() => openOverlay('projects')}
/>


<GlowingTextBanner 
  text="Dissertation" 
  position={[70, 40, -50]} 
  onClick={() => openOverlay('dissertation')}
/>

<GlowingTextBanner 
  text="Poetry" 
  position={[50, 40, 60]} 
  rotation={[0, Math.PI * 1.5, 0]}
  onClick={() => console.log("Banner clicked!")} 
/>

<GlowingTextBanner 
  text="Miscellaneous" 
  position={[-60, 20, 75]} 
  rotation={[0, Math.PI / 2, 0]}
  onClick={() => openOverlay('miscellaneous')}
/>



        <CameraLight />
      <ambientLight intensity={0.1} />
      <directionalLight 
        position={[5, 35, 5]} 
        intensity={1.0} 
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={1}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.005}
  />

        <mesh position={[0, 10, 0]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="red" />
        </mesh>


        <Sky
  distance={450000}
  sunPosition={[100, 10, 100]}
  inclination={0.49}
  azimuth={0.25}
/>

        


   
        <CityModel />
        <EffectComposer enabled={!isOverlayActive}>
            <HueSaturation hue={0.1} saturation={0.2} /> {/* Slightly more vivid colors */}
            <BrightnessContrast brightness={0.05} contrast={0.2} />
            <Bloom 
                intensity={3} // increase brightness of bloom
                 luminanceThreshold={0.05} // lower = more surfaces glow
                 luminanceSmoothing={0.1}/>
            <DepthOfField focusDistance={5} focalLength={10} bokehScale={2} />
            <Vignette eskil={false} offset={0.1} darkness={0.4} />
        </EffectComposer>

      </Canvas>
)}



    </div>
  );
}