import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Computer from '/src/computer.jsx'
import "/testStyle.css"

export default function App() {


  return (
    <>
    <Canvas 
        shadows gl={{ antialias: false, depth: true }} 
        camera={{ position: [0, 2, 4], fov: 60 }}  
        style={{ width: '100%', height: '100%' }} 
        dpr={window.devicePixelRatio}>

        <Computer/>
    </Canvas>




 </>
  )
}