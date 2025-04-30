import { Html, Environment, PresentationControls, useGLTF } from "@react-three/drei";

export default function Computer() {
    const computer = useGLTF("/tv.glb");

    return (
        <>
            <Environment preset="warehouse"/>

            <PresentationControls
                global
                polar={[-0.4, 2]}
                azimuth={[-0.4, 2]}
                >
                <primitive object={computer.scene} occlude>
                    <Html 
                        occlude
                        wrapperClass="computer"
                        position={[0, 1.2,  .1]}    
                        distanceFactor={4.5}
                        //rotation-x={-0.25}
                        transform>
                        <iframe src="/index.html"></iframe>
                    </Html>
                </primitive>
            </PresentationControls>
        </>
    )
}