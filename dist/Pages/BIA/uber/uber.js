import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//THE PAGE BE A TIMELINE OF THE REPORT
//INTRODUCTION AND CONTEXT
//THEORY
//INVESTIGATION
//CONCLUSION


//CAN MAKE IT A 3D TIMELINE - PROGRESS BAR WILL MATCH CAMERA X SCROLL FROM LEFT TO RIGHT (0 TO 1)
//CAN USE 3D TEXT THAT ROTATES AND SCALES UP FROM A POINT TO THEN BE READ
//IMAGES WILL BE IN 3D FRAMES




let movingBetweenPoints = false;







//WEBGL RENDERER FOR SCENE ITSELF
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.zIndex = '0';
renderer.domElement.style.position = 'absolute';

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, -1); // Slightly above the ground looking forward
//camera.lookAt(0, 0, 0);

controls.target.set(0, 0, 0);
let currentLookAt = {x: 0, y: 0, z: 0};
controls.update();
scene.add( camera );



 const pointLight = new THREE.PointLight(0xffffff, 120, 500); // White light, full intensity, 100-unit range
 pointLight.position.set(0, 2, 0); // Set the position
 pointLight.castShadow = true;

 camera.add(pointLight);



//CSS RENDERER FOR TEXT
const cssRenderer = new CSS2DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.top = '0';  // Ensure it aligns with the WebGL renderer
cssRenderer.domElement.style.left = '0';
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.zIndex = '5';
cssRenderer.domElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
document.body.appendChild(cssRenderer.domElement);
document.body.appendChild(renderer.domElement);









const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);


    THREE.Cache.enabled = true;


    const sectorOne = new THREE.Object3D();
    sectorOne.position.set(0, 0, 0)


loader.load('/files/uber/phone.glb', (gltf) => {



 
 
    const phone = gltf.scene;
    phone.scale.set(0.1, 0.1, 0.1)
    const test = gltf;
    console.dir(test)





        const indicatorGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Small sphere to represent the landing sector
        const indicatorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for the indicator
        const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
        indicator.position.set(0, 0, 0); // Ensure it centers relative to the sector object




        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Draw interactive content on the canvas (charts, text, etc.)
        //ctx.fillStyle = "black";
        //ctx.font = "20px Arial";
        //ctx.fillText("Machine Learning Report", 10, 50);
        
        // Use the canvas as a texture for the phone screen
        const texture = new THREE.CanvasTexture(canvas);
 





    const screenGeometry = new THREE.PlaneGeometry(1, 2); // Screen size (adjust these values based on your phone model)
const screenMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // White background for the screen
    side: THREE.DoubleSide,
});
const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
phone.add(screenMesh);



const parent = new THREE.Object3D();



        
parent.add(phone)
parent.add(indicator)

//phone.rotation.set( Math.PI / 2, Math.PI / 2, 0)

phone.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(270))
phone.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(270))

screenMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(90))
screenMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(90))
screenMesh.position.set(1, .5, 1); // Position it slightly in front of the phone model
screenMesh.scale.set(5, 5, 5)

phone.position.set(.1, -.1, 0)

sectorOne.add(parent)



});

scene.add(sectorOne)







function animate() {
    controls.update(); 
    //checkRaycast();
    renderer.render( scene, camera );
    cssRenderer.render(scene, camera);
 }




import WebGL from 'three/addons/capabilities/WebGL.js';
 
 if ( WebGL.isWebGL2Available() ) {

 
    
    renderer.setAnimationLoop( animate );
 } else {
    
     const warning = WebGL.getWebGL2ErrorMessage();
     document.getElementById( 'container' ).appendChild( warning );
 
 }