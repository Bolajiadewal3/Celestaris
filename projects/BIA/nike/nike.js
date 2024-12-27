import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

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
camera.position.set(0, 5, 7); // Slightly above the ground looking forward
camera.lookAt(0, 0, 0);

controls.target.set(0, 0, 0);
let currentLookAt = {x: 0, y: 0, z: 0};
controls.update();
scene.add( camera );







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



const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;  // Use the full width of the window
canvas.height = window.innerHeight;  // Use the full height of the window
//context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
const texture = new THREE.CanvasTexture(canvas);

const planeGeometry = new THREE.PlaneGeometry(300, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ 
    side: THREE.DoubleSide,
    color: 0x999999,
 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//plane.position.set(0, 0, -10);
//plane.scale.set(10, 10, 1);
//plane.scale.set(window.innerWidth, window.innerHeight, 1);

// Position the plane far behind the scene
plane.position.z = -50;

//scene.add(plane);
camera.add(plane);  // This makes the plane move with the camera





const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorReflector = new Reflector(floorGeometry, {
  color: 0x222222,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
});
floorReflector.rotation.x = -Math.PI / 2; // Make it horizontal
floorReflector.position.y = -5; // Position below the cube
floorReflector.position.z = -5; // Position below the cube


scene.add(floorReflector);
//camera.add(floorReflector)



const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -4, 10, 100 );
scene.add(spotLight)




let numberOfSections = 5;


const sections = []
for (let i = 0; i < numberOfSections; i++) {
    const individualSection = new THREE.Group();
    individualSection.name = `Section ${i+1}`;
    individualSection.index = i;
    individualSection.position.set(20*(i), 0, 0);
    individualSection.look = {x: 20*(i), y: 0, z: 0};
    sections.push(individualSection)
    scene.add(individualSection)
}





const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });







const overlayPanel = document.createElement('div');
    overlayPanel.style.position = 'flex';
    overlayPanel.style.id = 'overlayPanel';
    overlayPanel.style.width = '100%';
    overlayPanel.style.height = '100vh';
    //overlayPanel.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    overlayPanel.style.position = 'relative';


    cssRenderer.domElement.appendChild(overlayPanel);
    cssRenderer.domElement.style.display = "block";





    const rotationSlider = document.createElement('input');
    rotationSlider.style.position = "absolute";
    rotationSlider.style.bottom = "20px";
    //rotationSlider.style.left = "50%";
    rotationSlider.style.bottom = "10%";
    rotationSlider.style.left = "50%";
    rotationSlider.style.transform = "translate(-50%, -50%)";
    rotationSlider.style.zIndex = "2";
    rotationSlider.style.width = "60vw";
    rotationSlider.style.pointerEvents = 'auto'; // Ensures it doesn't block 3D interactions

    rotationSlider.type = "range";
    rotationSlider.min = "0";
    rotationSlider.max = sections.length-1;
    rotationSlider.value = "0";
    rotationSlider.step = "1";


/*rotationSlider.addEventListener('input', (event) => {

    if(!movingBetweenPoints) {
        const value = event.target.value; // Slider value
        //cube.rotation.y = THREE.MathUtils.degToRad(value); // Convert degrees to radians
        animateCamera(cameraPoints[value], lookAtPoints[value]);
    }
});*/






overlayPanel.appendChild(rotationSlider);





const cube = new THREE.Mesh(geometry, material);
cube.position.set(-5,0,0);
sections[0].add(cube);

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(0,0,0);
sections[0].add(cube2);

const cube3 = new THREE.Mesh(geometry, material);
cube3.position.set(5,0,0);
sections[0].add(cube3);

/*const cameraPoints = []
cameraPoints.push(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z))
cameraPoints.push(new THREE.Vector3(5, 5, 7))
cameraPoints.push(new THREE.Vector3(10, 5, 7))
cameraPoints.push(new THREE.Vector3(15, 5, 7))
cameraPoints.push(new THREE.Vector3(20, 5, 7))*/

/*const lookAtPoints = []
lookAtPoints.push(new THREE.Vector3(currentLookAt.x, currentLookAt.y, currentLookAt.z))
lookAtPoints.push(new THREE.Vector3(5, 0, 0))
lookAtPoints.push(new THREE.Vector3(10, 0, 0))
lookAtPoints.push(new THREE.Vector3(15, 0, 0))
lookAtPoints.push(new THREE.Vector3(20, 0, 0))*/

function getCameraPosition(sectionPosition) {
    return {x: sectionPosition.x, y: sectionPosition.y + 5, z: sectionPosition.z + 7}
}


rotationSlider.addEventListener('change', (event) => {

    if(!movingBetweenPoints) {
        const value = event.target.value; // Slider value
        //cube.rotation.y = THREE.MathUtils.degToRad(value); // Convert degrees to radians
        //animateCamera(cameraPoints[value], lookAtPoints[value]);
        animateCamera(getCameraPosition(sections[value].position), sections[value].look);
    }
});




async function animateCamera(targPoint, targLook) {
    movingBetweenPoints = true;
    rotationSlider.disabled = true;

//CAMERA IS 7 ABOVE AND 5 AWAY FROM SECTOR ITS LOOKING AT
    const startX = camera.position.x;
    const startY = camera.position.y;
    const startZ = camera.position.z;


    //console.log(`Camera Position: ${camera.position.x},${camera.position.y},${camera.position.z}`); // Log the position
    //const {cx, cy, cz} = currentLookAt;

    const tx = targLook.x;    const ty = targLook.y;    const tz = targLook.z;
    const lx = currentLookAt.x;    const ly = currentLookAt.y;    const lz = currentLookAt.z;
    const px = targPoint.x;    const py = targPoint.y;    const pz = targPoint.z;



    console.log(`Camera Position: ${startX},${startY},${startZ}`); // Log the position
    console.log(`Camera Look At: ${lx},${ly},${lz}`); // Log the position
    console.log(`Camera Target Pos: ${px},${py},${pz}`); // Log the position
    console.log(`Camera Target Look: ${tx},${ty},${tz}`); // Log the position


    //const targetLookAt = targLook; // Camera looks at the landing sector
    const duration = 2; // Seconds

    let startTime = null;
    const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);

        camera.position.x = THREE.MathUtils.lerp(startX, px, progress);
        camera.position.y = THREE.MathUtils.lerp(startY, py, progress);
        camera.position.z = THREE.MathUtils.lerp(startZ, pz, progress);

        camera.up.set(0, 1, 0); // Keep the camera's up vector fixed


        camera.lookAt(
            THREE.MathUtils.lerp(lx, tx, progress),
            THREE.MathUtils.lerp(ly, ty, progress),
            THREE.MathUtils.lerp(lz, tz, progress)
        );

        controls.target.set(
            THREE.MathUtils.lerp(lx, tx, progress),
        THREE.MathUtils.lerp(ly, ty, progress),
        THREE.MathUtils.lerp(lz, tz, progress)
    );
        

        controls.update();


        if (progress < 1) {
            //console.log(`Intermediate Camera Position: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`);
                //console.log(`Intermediate Camera Position: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`);
                //console.log(`Intermediate LookAt: ${currentLookAt.x}, ${currentLookAt.y}, ${currentLookAt.z}`);

            requestAnimationFrame(animate);

        } else {


            camera.lookAt(tx, ty, tz);

            controls.target.set(tx, ty, tz);
            controls.update();

            //camera.position.set(offset);
 
            currentLookAt = {x: tx, y: ty, z: tz};
            //console.log(`Camera End Position: ${camera.position.x},${camera.position.y},${camera.position.z}`); // Log the position
            //console.log(`Camera End Look: ${currentLookAt.x},${currentLookAt.y},${currentLookAt.z}`); // Log the position
            movingBetweenPoints = false;
            rotationSlider.disabled = false;


        }

    };
   requestAnimationFrame(animate);
};





/*
    <div id="ui" style="position: absolute; top: 10px; left: 10px; z-index: 1;">
  <label for="rotation-slider">Rotation:</label>
  <input type="range" id="rotation-slider" min="0" max="360" value="0" step="1">
</div>

*/














window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});






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