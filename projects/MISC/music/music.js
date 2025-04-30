import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as SectorHelper from '/src/sectors.js';
import * as TextHelper from '/src/text.js';
import * as OverlayHelper from '/src/overlays.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.zIndex = '0';
renderer.domElement.style.position = 'absolute';



// Create a gradient texture
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;  // Use the full width of the window
canvas.height = window.innerHeight;  // Use the full height of the window


const cssRenderer = new CSS2DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.top = '0';  // Ensure it aligns with the WebGL renderer
cssRenderer.domElement.style.left = '0';
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.zIndex = '5';
cssRenderer.domElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
document.body.appendChild(cssRenderer.domElement);
document.body.appendChild(renderer.domElement);


// Create gradient
const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#eeeeee'); // Top-left (white)
gradient.addColorStop(1, '#000000'); // Bottom-right (dark gray)

// Fill the canvas with the gradient
context.fillStyle = gradient;
//context.fillStyle = '#eeeeee'; // Set a solid color temporarily

context.fillRect(0, 0, canvas.width, canvas.height);

// Create a texture from the canvas
const texture = new THREE.CanvasTexture(canvas);

// Create a large plane to cover the background
const planeGeometry = new THREE.PlaneGeometry(300, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ 
    map: texture, side: THREE.DoubleSide
 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//plane.position.set(0, 0, -10);
//plane.scale.set(10, 10, 1);
//plane.scale.set(window.innerWidth, window.innerHeight, 1);

// Position the plane far behind the scene
plane.position.z = -50;

//scene.add(plane);
camera.add(plane);  // This makes the plane move with the camera
const controls = new OrbitControls(camera, renderer.domElement);



camera.position.set(0, -10, 7); // Slightly above the ground looking forward
camera.lookAt(0, -15, -10);

/*controls.target.set(0, -15, -10);
let currentLookAt = {x: 0, y: -15, z: -10};*/


controls.update();
scene.add( camera );


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});




import WebGL from 'three/addons/capabilities/WebGL.js';
 
 if ( WebGL.isWebGL2Available() ) {

    renderer.setAnimationLoop( animate );
    
 } else {
    
     const warning = WebGL.getWebGL2ErrorMessage();
     document.getElementById( 'container' ).appendChild( warning );
 
 }

// Trigger Camera Animation
//setTimeout(animateCamera, 1000); // Delay for initial camera setup


function animate() {
    controls.update(); // For testing only
    renderer.render( scene, camera );
    cssRenderer.render(scene, camera);

 }
