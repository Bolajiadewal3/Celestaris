// Import Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as SectorHelper from '/src/sectors.js';
import * as TextHelper from '/src/text.js';
import * as OverlayHelper from '/src/overlays.js';

import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


let interactionNotAllowed = false;
let leftMove;
let rightMove;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();



renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.zIndex = '0';
renderer.domElement.style.position = 'absolute';

//document.body.appendChild(renderer.domElement);
let staticRenderer;

let currentSec;

/*
document.addEventListener('DOMContentLoaded', function() {
    staticRenderer = document.createElement('div');
    staticRenderer.style.top = '0';
    staticRenderer.style.left = '0';
    staticRenderer.style.position = 'absolute';
    staticRenderer.style.zIndex = '5';
    staticRenderer.style.pointerEvents = 'none';
    document.body.appendChild(staticRenderer);
});*/

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

controls.target.set(0, -15, -10);
let currentLookAt = {x: 0, y: -15, z: -10};
controls.update();
scene.add( camera );


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const sectors = [
    {
        name: "Game Design & Development",
        position: new THREE.Vector3(0, 10, -20), // Position of the cube for this sector
        num: 0
    },
    {
        name: "Business Intelligence & Analytics",
        position: new THREE.Vector3(20, 10, 0), // Position of the cube for this sector
        num: 1
        //lookAt: new THREE.Vector3(0, 0, 5)
    },
    {
        name: "Miscellaneous",
        position: new THREE.Vector3(0, 10, 20), // Position of the cube for this sector
        num: 2
        //lookAt: new THREE.Vector3(0, 0, 5)
    },
    {
        name: "Dissertation",
        position: new THREE.Vector3(-20, 10, 0), // Position of the cube for this sector
        num: 3
        //lookAt: new THREE.Vector3(0, 0, -5)
    }
   
   
];



sectors.forEach(element => {
    const sec = new THREE.Object3D();
    const {x,y,z} = element.position;
    sec.position.set(x,y,z);
    sec.lookAt(0, 0, 0); // Set the position of the landing sector in 3D space
    const indicatorGeometry = new THREE.SphereGeometry(0.2, 8, 8); // Small sphere to represent the landing sector
    const indicatorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for the indicator
    const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
    indicator.position.set(0, 0, 0); // Ensure it centers relative to the sector object
    sec.add(indicator);
    scene.add(sec);
    element.individualprojects = [];

    element.object = sec;



    let gridPositions = [];

const rows = 3;  // Number of rows in the grid
const cols = 3;  // Number of columns in the grid

const spacing = 4; // Distance between positions on the grid

const gridCenterX = (cols - 1) * spacing / 2; // Horizontal center
const gridCenterZ = (rows - 1) * spacing / 2;

// Create the grid of positions
for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
        // Each position is spaced with a gap between them
        let x = j * spacing - gridCenterX;  // Move horizontally left to right
        let z = i * spacing - gridCenterZ;  // Move vertically top to bottom
        let y = 0;  // Assuming all positions are on the same plane (z = 0)

        row.push(new THREE.Vector3(x, y, z)); // Push position as a Vector3
    }
    gridPositions.push(row);  // Push row to grid array
}

    element.grid = gridPositions;

});

let currentSecIndex = -1;


function updateCurrentSecIndex(direction) {
    let indexToGo;
    if(direction === "left") {indexToGo = currentSecIndex === 0? 3 : currentSecIndex-1;}
    if(direction === "right") {indexToGo = currentSecIndex === 3? 0 : currentSecIndex+1;}
    goToSector(indexToGo);
    return
}




function goToSector(index) {

    console.log(`The CURRENT INDEX is ${index}`)

    movementAnimationDone = false;
    currentSecIndex = index;


    setTimeout(() => animateCamera(sectors[index].position), 1000);
    currentSec = sectors[index].object;

}


function calculateCameraOffsetForSector(sectorPosition) {

    const {x, y, z} = sectorPosition;
    ////console.log(`Sector Position: ${x}, ${y}, ${z}`); // Log the position


    const offsetFromLookAt = new THREE.Vector3(0, 7, 5); // Relative offset: 7 units up and 5 units back
    
    if(z != 0) {
        const direction = z > 0 ? -1 : 1; 
        return {x: x, y: (y + 7), z: (z+(direction*7))};
    }
    if(x != 0) {
        const direction = x > 0 ? -1 : 1; 
        return {x: (x+(direction*7)), y: (y + 7), z: z};
    }

 

    //////console.log(`Camera Position Should Thus Be: ${x}, ${y+7}, ${(z+(direction*5))}`); // Log the position

}


const landingSector = new THREE.Object3D();
landingSector.position.set(0, 0, -4); // Set the position of the landing sector in 3D space
landingSector.num = -1;

const cubes = [];
// Add Boxes
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x0077ff });
for (let i = 0; i < 4; i++) {
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set((i % 2) * 6 - 3,    0,  Math.floor(i / 2) * 6 - 3); // Spread boxes horizontally
   // scene.add(box);

   landingSector.add(box);

    cubes.push({ cuboid: box, index: i });
    

}
// Optionally, add a small visual indicator, like a small sphere or box, to visualize it
const indicatorGeometry = new THREE.SphereGeometry(0.2, 8, 8); // Small sphere to represent the landing sector
const indicatorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for the indicator
const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);

// Add the indicator to the empty object (landing sector)
landingSector.add(indicator);



scene.add(landingSector);
/*
for (let i = 0; i < 5; i++) {
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set((i * 2 - 5)+1, 0, -2.5); // Spread boxes horizontally
    scene.add(box);
    cubes.push(box);

}

for (let i = 0; i < 5; i++) {
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set((i * 2 - 5)+1, 0, 2.5); // Spread boxes horizontally
    scene.add(box);
    cubes.push(box);

}*/

// Initial Camera Position

let openingAnimationDone = false;
let movementAnimationDone = true;
let landingObjectsPresent = false;

let landingObjects = [];

let arrowsMade = false;

let la;
let ra;

// Animate Camera to Point Downward
async function animateCamera(targLook) {


    console.log(`Current ID is: ${currentSecIndex}, The LEFT is: ${leftMove}, The RIGHT is: ${rightMove}`)



    if (!arrowsMade){
        const {leftArrow, rightArrow} = await OverlayHelper.createArrowButtons(cssRenderer, () => updateCurrentSecIndex("left"), () => updateCurrentSecIndex("right"));
        arrowsMade = true;

        leftArrow.style.display = "none";
        rightArrow.style.display = "none";

        la = leftArrow;
        ra = rightArrow;
    }



//CAMERA IS 7 ABOVE AND 5 AWAY FROM SECTOR ITS LOOKING AT
    const startX = camera.position.x;
    const startY = camera.position.y;
    const startZ = camera.position.z;

    const offset = calculateCameraOffsetForSector(targLook);

    ////console.log(`Camera Position: ${camera.position.x},${camera.position.y},${camera.position.z}`); // Log the position
    //const {cx, cy, cz} = currentLookAt;

    const tx = targLook.x;    const ty = targLook.y;    const tz = targLook.z;
    const lx = currentLookAt.x;    const ly = currentLookAt.y;    const lz = currentLookAt.z;
    const px = offset.x;    const py = offset.y;    const pz = offset.z;





    //console.log(`Camera Position: ${startX},${startY},${startZ}`); // Log the position
    //console.log(`Camera Look At: ${lx},${ly},${lz}`); // Log the position

    //console.log(`Camera Target Pos: ${px},${py},${pz}`); // Log the position
    //console.log(`Camera Target Look: ${tx},${ty},${tz}`); // Log the position


    //const {lx, ly, lz} = camera.lookAt
    //const targetPosition = { x: 0, y: 7, z: 2 }; // Mimic PS2 downward tilt
    //const targetLookAt = { x: 0, y: 0, z: -10 };
    const targetLookAt = targLook; // Camera looks at the landing sector

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
        THREE.MathUtils.lerp(lz, tz, progress));
        controls.update();


        if (progress < 1) {
           /* //console.log(`Intermediate Camera Position: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`);
                //console.log(`Intermediate Camera Position: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`);
                //console.log(`Intermediate LookAt: ${currentLookAt.x}, ${currentLookAt.y}, ${currentLookAt.z}`);*/

            requestAnimationFrame(animate);

        } else {

            if(currentSec != landingSector && arrowsMade){
                la.style.display = "block";
                ra.style.display = "block";
            }



            camera.lookAt(tx, ty, tz);

            controls.target.set(tx, ty, tz);
            controls.update();

            //camera.position.set(offset);
            movementAnimationDone = true;
            openingAnimationDone = true;
            currentLookAt = targetLookAt;
            //console.log(`Camera End Position: ${camera.position.x},${camera.position.y},${camera.position.z}`); // Log the position
            //console.log(`Camera End Look: ${currentLookAt.x},${currentLookAt.y},${currentLookAt.z}`); // Log the position


        }

    };
   requestAnimationFrame(animate);
};

// Add Orbit Controls for Testing
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



// Mouse Move Event to Track Hover
function onMouseMove(event) {
    // Normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// Add Event Listener for Mouse Move
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseClick, false);




function checkRaycast()
 {
    if(interactionNotAllowed) {
        return;
    }


    if(!openingAnimationDone || !movementAnimationDone) {
        return;
    }



    raycaster.setFromCamera(mouse, camera); // Proper way to update raycaster

    // Find intersections between the ray and cubes
    
    if(!landingObjectsPresent){
    
    const intersects = raycaster.intersectObjects(cubes.map(cube => cube.cuboid)); // Access 'cuboid' property directly

    // Reset all cubes to original scale
    cubes.forEach(cube => {
        cube.cuboid.scale.set(1, 1, 1); // Reset scale to normal
    });

    // If an intersection occurs, increase the scale of the hovered cube
    if (intersects.length > 0) {
        const hoveredCube = intersects[0].object;
        hoveredCube.scale.set(1.2, 1.2, 1.2); // Scale up the hovered cube
    }
} else {

    const interescts = checkIntersections();
    handleHover(interescts);

}

 }



 function checkIntersections() {
 
    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera); // camera is your Three.js camera

    // Find intersections with the objects in the scene

    //console.log(currentSec.children.length)

    //console.dir(currentSec);
    //console.dir(currentSec).children;

  

    const intersects = raycaster.intersectObjects(currentSec.children);



    return intersects;

 }


 function onMouseClick()
 {
    if(interactionNotAllowed) {
        return;
    }


    if(!openingAnimationDone || !movementAnimationDone) {
        return;
    }


    if(!landingObjectsPresent){

    // Find intersections between the ray and cubes
    const intersects = raycaster.intersectObjects(cubes.map(cube => cube.cuboid)); // Access 'cuboid' property directly

    // If an intersection occurs, increase the scale of the hovered cube
    if (intersects.length > 0) {
        //window.location.href = 'index.html'; // Replace with the actual next page URL
        const clickedcuboid = intersects[0].object;
        const clickedcube = cubes.find(cube => cube.cuboid === clickedcuboid);
        //console.log(`Cube pressed index: ${clickedcube.index}`); // Log the position

        goToSector(clickedcube.index);
    }


    }


    else {

        const interescts = checkIntersections();
        handleClick(interescts);
    }
 }

 function ancestorTraversal(parent, child) {
    let current = child;
    while (current) {
        if (current === parent) return true;
        current = current.parent;
    }
    return false;
}


function handleClick(intersects) {


    if (intersects.length > 0) {

    const intersectedObject = intersects[0].object;
    //console.dir(intersectedObject);
   /* let current = intersectedObject;
    while (current) {
        //console.log(current);
        current = current.parent;
    }

    landingObjects.forEach(obj => {
        //console.log(obj.object);
    });*/


    if(currentSec === landingSector) {

    const objOfInterest = landingObjects.find(obj => ancestorTraversal(obj.object,  intersectedObject) );
    console.dir(objOfInterest);


    //console.dir()

        goToSector(objOfInterest.placeToGo);


    } else {

        console.dir(currentSec);
        const intermediary = sectors.find(obj => ancestorTraversal(obj.object,  intersectedObject) );
        console.dir(intermediary);

        const objOfInterest = intermediary.individualprojects.find(obj => ancestorTraversal(obj.object,  intersectedObject) );
        console.dir(objOfInterest); //HAS THE SITE LINK ETC



        console.dir(camera);
        console.dir(currentLookAt);
        OverlayHelper.updateOverlay(objOfInterest, camera, currentLookAt, interactionNotAllowed);

    }



    }
    //goToSector(clickedcube.index);

}

 let previousObject = null;

 function handleHover(intersects) {
 
     // Reset the previous object
     if (previousObject) {
         //previousObject.material.emissive.set(0x000000); // Reset the color (or any effect)
         //previousObject.scale.set(1, 1, 1); // Reset scale (if applied)
     }
 
     if (intersects.length > 0) {
         const object = intersects[0].object;
         //object.material.emissive.set(0x00ff00); // Highlight the hovered object
         //object.scale.set(1.1, 1.1, 1.1); // Slightly enlarge the object on hover
 
         // Save the hovered object
         previousObject = object;
     }
 }










 const pointLight = new THREE.PointLight(0xffffff, 120, 500); // White light, full intensity, 100-unit range
 pointLight.position.set(0, 2, 0); // Set the position
 pointLight.castShadow = true;

 camera.add(pointLight);



 
 



 let allDynamicText = [];
 let allStaticText = [];
 
 

 
function setLandingObjects (objectInfoArray) {
        //console.log("HERE");
        console.dir(objectInfoArray);


        objectInfoArray.forEach(project => {
            //console.log(`TESTING: ${project.index}`); // Log the position
            

            //const obj = project.object;
            const cubeToReplace = cubes.find(cube => cube.index === project.place);


    const box = new THREE.Box3().setFromObject(project.object);
    const size = new THREE.Vector3();
    box.getSize(size); // Get the size of the model (width, height, depth)

    //console.log(`Model Size: Width = ${size.x}, Height = ${size.y}, Depth = ${size.z}`);

    // Define a maximum size for the model (e.g., maximum size of 10 units)
    const targetSize = 3;

    // Check if any of the model's dimensions exceed the maximum size
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scaleFactor = targetSize / maxDimension;

    // Apply the scale factor to the model
    project.object.scale.set(scaleFactor, scaleFactor, scaleFactor);
    //console.log(`Scaling model by factor: ${scaleFactor}`);

    // Ensure models that are too small are scaled up to a minimum size of 3 units
    // If the model is smaller than 3 units, we apply a minimum scale
    if (scaleFactor > 1) {
        //console.log(`Model is too small and will be scaled up to target size.`);
        project.object.scale.set(1, 1, 1); // Reset to original size (if needed)
        project.object.scale.set(targetSize / maxDimension, targetSize / maxDimension, targetSize / maxDimension);
    }





console.dir(cubeToReplace);

box.getCenter(project.object.position);

    ////console.log(`Aim position: ${cubeToReplace.cuboid.position}`);
    //const {ax, ay, az} = cubeToReplace.cuboid.position;
    //project.object.position.set(ax, ay, az);


    const newBox = new THREE.Box3().setFromObject(project.object);
    const newCenter = new THREE.Vector3();
    newBox.getCenter(newCenter); // Get the center of the scaled model
    const nx = newCenter.x; const ny = newCenter.y; const nz = newCenter.z;
    const ax = cubeToReplace.cuboid.position.x; const ay = cubeToReplace.cuboid.position.y; const az = cubeToReplace.cuboid.position.z; 


    //console.log(`Model new center: x = ${nx}, y = ${ny}, z = ${nz}`);

    // Get the cube's position to place the object
    //console.log(`Cube center: x = ${ax}, y = ${ay}, z = ${az}`);

    project.object.position.set(ax, ay, az);

    //const {mx, my, mz} = obj.position;
    cubeToReplace.cuboid.visible = false;
    //console.log("success");

    project.placeToGo = sectors.find(sec => sec.name === project.title).num;

    landingSector.add(project.object);
    landingSector.remove(cubeToReplace);
    ////console.log(`Model position: x = ${mx}, y = ${my}, z = ${mz}`);
    
    let obj = project.obj;
    //console.log(`EQUALITY CHECK ${obj === project.obj}`);
    ////console.log(`EQUALITY CHECK ${obj === obj}`);
    ////console.log(`EQUALITY CHECK ${project.obj === project.obj}`);
    let worldPos = new THREE.Vector3();;
    project.object.getWorldPosition(worldPos);

    const pos = {x:worldPos.x, y:worldPos.y-.5, z:worldPos.z+1.1};
    allDynamicText.push(  TextHelper.addDynamicText(scene, project.title, "top right", 12, pos));



    //loadOtherSectors(project.title);


        });


    landingObjectsPresent = true;
    animateCamera(landingSector.position);
    currentSec = landingSector;

    landingObjects = objectInfoArray;
}








async function setSectorObjects (objectInfoArray, sector) {

    const sectorToAddTo = sectors.find(sec => sec.name === sector);
    console.log(`THE SECTOR TO BE ADDED TO RIGHT NOW IS ${sectorToAddTo.name}`);

    console.dir(sectorToAddTo);



    let i = 0;


    objectInfoArray.forEach(project => {
        console.dir(project)
   
const box = new THREE.Box3().setFromObject(project.object);
const size = new THREE.Vector3();
box.getSize(size); // Get the size of the model (width, height, depth)

const targetSize = 3;

// Check if any of the model's dimensions exceed the maximum size
const maxDimension = Math.max(size.x, size.y, size.z);
const scaleFactor = targetSize / maxDimension;

// Apply the scale factor to the model
project.object.scale.set(scaleFactor, scaleFactor, scaleFactor);

if (scaleFactor > 1) {
    //console.log(`Model is too small and will be scaled up to target size.`);
    project.object.scale.set(1, 1, 1); // Reset to original size (if needed)
    project.object.scale.set(targetSize / maxDimension, targetSize / maxDimension, targetSize / maxDimension);
}



box.getCenter(project.object.position);


const newBox = new THREE.Box3().setFromObject(project.object);
const newCenter = new THREE.Vector3();
newBox.getCenter(newCenter); // Get the center of the scaled model
const nx = newCenter.x; const ny = newCenter.y; const nz = newCenter.z;




const possiblePositions = sectorToAddTo.grid;
console.dir(possiblePositions);

console.log("THE PLACE IS ")
console.log(project.place)


    const row = Math.floor(project.place / 3);  // Determine row (floor division)
    const col = project.place % 3;             // Determine column (modulo operation)

    // Get the grid position based on the index
    const position = possiblePositions[row][col];

    console.dir(possiblePositions[row]);
    console.dir(possiblePositions[row][col]);

//const position = possiblePositions[project.index];


const ax = position.x; const ay = position.y; const az = position.z; 



project.object.position.set(ax, ay, az);
project.object.rotation.x = -1;
sectorToAddTo.object.add(project.object);

sectorToAddTo.individualprojects.push(project);

console.log(`ADDED ${project.object} TO `);

console.dir(sectorToAddTo.object);
console.log(`AT ${ax},${ay},${az}`);

let obj = project.obj;
//console.log(`EQUALITY CHECK ${obj === project.obj}`);
////console.log(`EQUALITY CHECK ${obj === obj}`);
////console.log(`EQUALITY CHECK ${project.obj === project.obj}`);
let worldPos = new THREE.Vector3();;
project.object.getWorldPosition(worldPos);

const pos = {x:worldPos.x, y:worldPos.y-.5, z:worldPos.z+1.1};
allDynamicText.push(  TextHelper.addDynamicText(scene, project.title, "top right", 12, pos));





    });
}















 
 import WebGL from 'three/addons/capabilities/WebGL.js';
 
 if ( WebGL.isWebGL2Available() ) {

   

   // plane.visible = false;
   //allText.push(TextHelper.addText(scene, "By Mobolaji Adewale", "top left", 0));
    allStaticText.push(TextHelper.addStaticText(scene, "Memory Card: ", "top left", 20, 20,  50, cssRenderer.domElement));




    if (performance.memory) {
        const usedJSHeapSize = performance.memory.usedJSHeapSize;
        //const totalJSHeapSize = performance.memory.totalJSHeapSize;
        const jsHeapSizeLimit = performance.memory.jsHeapSizeLimit;
        
        allStaticText.push(TextHelper.addStaticText(scene, `${(usedJSHeapSize/ 1024 / 1024).toFixed(2) }MB used / ${(jsHeapSizeLimit / 1024 / 1024).toFixed(2) }MB available`, "top left", 20, 100, 25,  cssRenderer.domElement));

    } else {
        console.log("The performance.memory API is not supported in this browser.");
        allStaticText.push(TextHelper.addStaticText(scene, `In Use ${getBrowserName()}`, "top left", 20, 100, 25,  cssRenderer.domElement));
    }

    allStaticText.push(TextHelper.addStaticText(scene, "By Mobolaji Adewale", "top right", 20, 20, 40, cssRenderer.domElement));

    SectorHelper.displayProjects("landing", (p) => setLandingObjects(p));

    await loadOtherSectors("Game Design & Development");
    await loadOtherSectors("Business Intelligence & Analytics");
    await loadOtherSectors("Miscellaneous");
    await loadOtherSectors("Dissertation");


    //OverlayHelper.createOverlay(scene);

/*
    allText.forEach(obj => {
        console.log("TEXT:");
        console.dir(obj);
    });   // setLandingObjects("landing", () => animateCamera(landingSector.position));
*/

    //setTimeout(() => animateCamera(landingSector.position), 2000);
    renderer.setAnimationLoop( animate );
    
 
 } else {
    
     const warning = WebGL.getWebGL2ErrorMessage();
     document.getElementById( 'container' ).appendChild( warning );
 
 }

// Trigger Camera Animation
//setTimeout(animateCamera, 1000); // Delay for initial camera setup


function animate() {
    controls.update(); // For testing only
    // Update the raycaster with the camera and mouse position
    checkRaycast();
    //checkMousePress();

    /*
    allText.forEach(obj => {
        obj.position.set(0, 0, 0); // Keep it 10 units in front of the camera

    });
    */


    renderer.render( scene, camera );
    cssRenderer.render(scene, camera);

 }


async function loadOtherSectors(sectorName) {
    const index = sectors.find(sect => sect.name === sectorName).num;

    //console.dir(sectors.find(sect => sect.name === sectorName))
    //console.log(`The index found is ${index}`)
    SectorHelper.displayProjects(sectorName, (p, s) => setSectorObjects(p, s), index);
}







function getBrowserName() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR")) {
        return "Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "Safari";
    } else if (userAgent.includes("Edg")) {
        return "Edge";
    } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
        return "Opera";
    } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
        return "Internet Explorer";
    } else {
        return "Unknown";
    }
}











function garbage(obj) {
    obj.traverse(function (object) {
        if (object.isMesh) {
            // Dispose of geometries
            if (object.geometry) object.geometry.dispose();

            // Dispose of materials
            if (object.material) {
                if (object.material.map) object.material.map.dispose();  // Dispose of texture
                if (object.material) object.material.dispose();  // Dispose of material
            }
        } else if (object.isPoints) {
            // If it's a point cloud
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (object.material.map) object.material.map.dispose();  // Dispose of texture
                if (object.material) object.material.dispose();
            }
        }
    });

    while (obj.children.length > 0) {
        obj.remove(obj.children[0]);
    }
}