import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


export function addDynamicText(scene, text, corner, size, position) {
const textElement = document.createElement('div');
textElement.style.position = 'absolute';
//textElement.style.height = '100%';
//textElement.style.width = '100%';
textElement.style.fontFamily = '"Orbitron", sans-serif';
textElement.style.filter = `
drop-shadow(-1px -1px 0 #000)
drop-shadow(1px -1px 0 #000)
drop-shadow(-1px 1px 0 #000)
drop-shadow(1px 1px 0 #000)
`;
textElement.style.color = 'white';
textElement.style.fontSize = size+'px';
textElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
textElement.innerText = text; // Example text
textElement.style.zIndex = '5'; // Ensure the text appears above other elements


// Create a CSS2DObject and add the text to it
const textObject = new CSS2DObject(textElement);

// Position the text in world space (doesn't matter much, we'll control screen position with CSS)
textObject.position.set(position.x, position.y, position.z);
scene.add(textObject);



console.log("attempting to add text");
return textObject;
}


export function addStaticText(scene, text, corner, x, y, size, parent) {
    const textElement = document.createElement('div');
    textElement.style.position = 'absolute';
    //textElement.style.height = '100%';
    //textElement.style.width = '100%';
    
    textElement.style.color = 'white';
    textElement.style.fontSize = size+'px';
    textElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    textElement.innerText = text; // Example text
    textElement.style.zIndex = '5'; // Ensure the text appears above other elements
    textElement.style.fontFamily = '"Orbitron", sans-serif';
    textElement.style.filter = `
    drop-shadow(-1px -1px 0 #000)
    drop-shadow(1px -1px 0 #000)
    drop-shadow(-1px 1px 0 #000)
    drop-shadow(1px 1px 0 #000)
`;
    
    // Create a CSS2DObject and add the text to it
    //const textObject = new CSS2DObject(textElement);
    
    // Position the text in world space (doesn't matter much, we'll control screen position with CSS)
    //textObject.position.set(0, 0, 0);
    //scene.add(textObject);
    
    const posX = x + 'px';
    const posY = y + 'px';
    
    console.log(posX);
    
    switch(corner) {
        case "top right":
            textElement.style.top = posY; // 10px from the top
            textElement.style.right = posX;
            console.log("top right text added");
    
            break;
        case "top left":
            textElement.style.top = posY;// 10px from the top
            textElement.style.left = posX;
            console.log("top left text added");
    
            break;
        case "bottom right":
            textElement.style.bottom = posY; // 10px from the top
            textElement.style.right = posX;
            console.log("bottom right text added");
    
            break;
        case "bottom left":
            textElement.style.bottom = posY; // 10px from the top
            textElement.style.left = posX;
            console.log("bottom left text added");
    
            break;
    }


    parent.appendChild(textElement);

    console.log("attempting to add text");
    return textElement;
    }




    function addThreeDText() {

// Load a font
const loader = new FontLoader();
loader.load('path/to/your/font.json', (font) => {
    // Create 3D text geometry
    const textGeometry = new TextGeometry('By Mobolaji Adewale', {
        font: font,
        size: 10,  // Adjust size to fit your scene
        height: 1, // Depth of the text
        curveSegments: 12,  // The level of detail
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 3
    });

    // Create a material for the text
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Create the text mesh
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Set position of the 3D text object
    textMesh.position.set(ax, ay, az);

    // Add the text mesh to the scene
    scene.add(textMesh);
});

    }