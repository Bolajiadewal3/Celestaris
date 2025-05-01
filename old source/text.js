import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


const scaleFactor = window.devicePixelRatio; // To scale for high-DPI displays




export function addDynamicText(scene, text, corner, size, position) {
const textElement = document.createElement('div');
textElement.style.position = 'absolute';
//textElement.style.height = '100%';
//textElement.style.width = '100%';
textElement.style.fontFamily = '"Orbitron", sans-serif';
const shadowOffset = "0.1em"; // Adjust this value to fit the scale

/*
textElement.style.filter = `
    drop-shadow(-${shadowOffset} -${shadowOffset} 0 #000)
    drop-shadow(${shadowOffset} -${shadowOffset} 0 #000)
    drop-shadow(-${shadowOffset} ${shadowOffset} 0 #000)
    drop-shadow(${shadowOffset} ${shadowOffset} 0 #000)
`;*/



textElement.style.color = 'white';

const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        textElement.style.fontSize = "0.5rem";
        textElement.style.webkitTextStroke = `0.02em black`;  // For webkit-based browsers
textElement.style.textStroke = `0.02em black`; 
    } else {
        textElement.style.fontSize = "2rem";
        textElement.style.webkitTextStroke = `0.04em black`;  // For webkit-based browsers
        textElement.style.textStroke = `0.04em black`; 

    }


//textElement.style.fontSize = size+'px';
//textElement.style.fontSize = "calc(2px + 2vw)";
//textElement.style.transform = `scale(${scaleFactor})`;

textElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
textElement.innerText = text; // Example text
textElement.style.zIndex = '5'; // Ensure the text appears above other elements

textElement.style.webkitFontSmoothing = 'antialiased';  // For Webkit-based browsers (Chrome, Safari)
textElement.style.fontSmoothing = 'antialiased';

const strokeFactor = textElement.style.fontSize;
console.log(strokeFactor)

 // For other browsers


//textElement.style.webkitTextStroke = `calc(${strokeFactor}/3) black`;  // For webkit-based browsers
//textElement.style.textStroke = `calc(${strokeFactor}/3) black`;  // For other browsers



//16px to 1rem

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

    //textElement.style.fontSize = size+'px';
    //textElement.style.fontSize = (size/16)+'rem';

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        textElement.style.fontSize = "0.5rem";
        textElement.style.webkitTextStroke = `0.02em black`;  // For webkit-based browsers
        textElement.style.textStroke = `0.02em black`; 
    } else {
        textElement.style.fontSize = "2rem";
        textElement.style.webkitTextStroke = `0.04em black`;  // For webkit-based browsers
        textElement.style.textStroke = `0.04em black`; 

    }
   // textElement.style.fontSize = "calc(2px + 2vw)";
    //textElement.style.transform = `scale(${scaleFactor})`;

    textElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    textElement.innerText = text; // Example text
    textElement.style.zIndex = '5'; // Ensure the text appears above other elements
    textElement.style.fontFamily = '"Orbitron", sans-serif';
    const shadowOffset = "0.1em"; // Adjust this value to fit the scale

    textElement.style.webkitFontSmoothing = 'antialiased';  // For Webkit-based browsers (Chrome, Safari)
    textElement.style.fontSmoothing = 'antialiased';

    textElement.style.webkitTextStroke = '0.04em black';  // For webkit-based browsers
textElement.style.textStroke = '0.04em black';  // For other browsers
    /*
    textElement.style.filter = `
        drop-shadow(-${shadowOffset} -${shadowOffset} 0 #000)
        drop-shadow(${shadowOffset} -${shadowOffset} 0 #000)
        drop-shadow(-${shadowOffset} ${shadowOffset} 0 #000)
        drop-shadow(${shadowOffset} ${shadowOffset} 0 #000)
    `;*/


    // Create a CSS2DObject and add the text to it
    //const textObject = new CSS2DObject(textElement);
    
    // Position the text in world space (doesn't matter much, we'll control screen position with CSS)
    //textObject.position.set(0, 0, 0);
    //scene.add(textObject);
    
    const posX = x + 'vh';
    const posY = y + 'vh';
    
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
        size: 5,  // Adjust size to fit your scene
        height: 1, // Depth of the text
        curveSegments: 20,  // The level of detail
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