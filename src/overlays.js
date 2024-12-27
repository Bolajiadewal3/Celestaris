import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



export let displayOverlay = false;



let currentOverlayScene = null;
let currentOverlayCamera = null;
let currentOverlayRenderer = null;
let currentOverlayCSS = null;

window.addEventListener('resize', () => {
    if(currentOverlayRenderer != null) currentOverlayRenderer.setSize(window.innerWidth, window.innerHeight);
    if(currentOverlayCSS != null) currentOverlayCSS.setSize(window.innerWidth, window.innerHeight);
    if(currentOverlayCamera != null) currentOverlayCamera.aspect = window.innerWidth / window.innerHeight;
    if(currentOverlayCamera != null) currentOverlayCamera.updateProjectionMatrix();
});

const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight); // Full screen size
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080,  // Grey color
    opacity: 0.85,     // Transparency level
    transparent: true // Make the material transparent
});

export function createOverlay(scene) {
    const overlayScene = new THREE.Scene();
    const overlayCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const overlayRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    

    overlayCamera.position.z = 5;
    overlayRenderer.setSize(window.innerWidth, window.innerHeight);
    overlayRenderer.setClearColor(0x000000, 0);  // Transparent background for overlay
    document.body.appendChild(overlayRenderer.domElement);  // Append to overlay container
    overlayRenderer.domElement.style.zIndex = "8";
    overlayRenderer.domElement.style.position = 'absolute';
    overlayRenderer.domElement.style.display = "none";


    const cssOverlayRenderer = new CSS2DRenderer();
    cssOverlayRenderer.setSize(window.innerWidth, window.innerHeight);
    cssOverlayRenderer.domElement.style.top = '0';  // Ensure it aligns with the WebGL renderer
    cssOverlayRenderer.domElement.style.left = '0';
    cssOverlayRenderer.domElement.style.position = 'absolute';
    cssOverlayRenderer.domElement.style.zIndex = '12';
    document.body.appendChild(cssOverlayRenderer.domElement);
    cssOverlayRenderer.domElement.style.display = "none";




     currentOverlayScene = overlayScene;
 currentOverlayCamera = overlayCamera;
 currentOverlayRenderer = overlayRenderer;
 currentOverlayCSS = cssOverlayRenderer;

    return {overlayScene, overlayCamera, overlayRenderer, cssOverlayRenderer}

}

async function gatherOverlay(project) {
    var loader = new GLTFLoader();

    /*const projectModel = await new Promise((resolve, reject) => {
        loader.load(
            project.model,
            (gltf) => resolve(gltf.scene), // Resolve with the loaded scene
            undefined, // Optional progress callback
            (error) => reject(error) // Reject if there's an error
        );
    });*/

    const projectModel = project.object.clone();

const projectTitle = project.title;
const projectText = project.abstract;
const projectLink = project.siteLink;
return {overlayTitle: projectTitle, overlayText: projectText, overlayLink: projectLink, overlayModel: projectModel};


}

let items = [];


function resetOverlay() {
    displayOverlay = false;
    let nodes = [];

        currentOverlayCamera.traverse((child) => {
            // Remove 3D objects (models, lights, etc.)

            console.dir(child);

            //if (child instanceof THREE.Mesh || child instanceof THREE.Light) {
                if (child.geometry) {
                    child.geometry.dispose();
                }
                
                if (child.material) {
                    child.material.dispose();
                }
                try{
                //currentOverlayCamera.remove(child);
                nodes.push(child);

                }catch{
                    console.log(`This failed ${child}`)
                }
            //}


        });   

       



        currentOverlayScene.traverse((child) => {
            // Remove 3D objects (models, lights, etc.)
            if (child instanceof THREE.Mesh || child instanceof THREE.Light) {
                if (child.geometry) {
                    child.geometry.dispose();
                }
                
                if (child.material) {
                    child.material.dispose();
                }
                try{
                    //currentOverlayScene.remove(child);
                    nodes.push(child);

                    }catch{
                        console.log(`This failed ${child}`)
                    }            }
        });       


         

        nodes.forEach((node) => {
            node.removeFromParent();
        });

        currentOverlayRenderer.domElement.parentNode.removeChild(currentOverlayRenderer.domElement);
        currentOverlayCSS.domElement.parentNode.removeChild(currentOverlayCSS.domElement);
        
        
        /* overlayCamera.clear();


        overlayCamera.traverse((child) => {
            // Remove 3D objects (models, lights, etc.)
            if (child instanceof THREE.Mesh || child instanceof THREE.Light) {
                overlayCamera.remove(child);
            }
        });

        items.forEach(element => {

            if (element instanceof HTMLElement) {

                element.remove();
            } else {
                if (element instanceof THREE.Object3D) {
                    element.parent.remove(element); // or any other specific method for Three.js objects
                }           
            }
        });
        */
    
}

export async function updateOverlay(project, originalCamera, originalLookAt, stopInteraction) {
    if (displayOverlay) {
        resetOverlay();
        
    }



let s;
    const {overlayScene, overlayCamera, overlayRenderer, cssOverlayRenderer} =  createOverlay(s);



    stopInteraction = true;

    const info = await gatherOverlay(project);
    console.log(info);

    //console.dir(originalCamera);
    //console.dir(originalLookAt);



    overlayCamera.position.set(originalCamera.position.x, originalCamera.position.y, originalCamera.position.z);
    overlayCamera.lookAt(originalLookAt.x, originalLookAt.y, originalLookAt.z);

    overlayCamera.add(info.overlayModel);
    info.overlayModel.position.set(-3, -1, -4.5);
    info.overlayModel.rotation.x = 0;

    overlayScene.add(overlayCamera);


 const pointLight = new THREE.PointLight(0xffffff, 120, 500); // White light, full intensity, 100-unit range
 pointLight.position.set(0, 2, 0); // Set the position
 pointLight.castShadow = true;

 overlayCamera.add(pointLight);

    //console.dir(overlayCamera);
    //console.dir(info.overlayModel);



    const pos = new THREE.Vector3();
    //let pos2;
    //overlayCamera.getWorldPosition(pos);
    const {lx, ly, lz} = pos;
//plane.rotation.x = Math.PI / 2;  // Rotate it to be parallel to the screen

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -7);
plane.name = 'PLANE!';
overlayCamera.add(plane);


console.log("THE PLANE IS HERE");
console.dir(plane);





    const overlayPanel = document.createElement('div');
    overlayPanel.style.position = 'flex';
    overlayPanel.style.id = 'overlayPanel';
    overlayPanel.style.width = '100%';
    overlayPanel.style.height = '100vh';
    //overlayPanel.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    overlayPanel.style.position = 'relative';

    let textObjects = [];
    let objectsToRotate = [];


    const titleElement = document.createElement('div');
    titleElement.style.position = 'absolute';
    titleElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    setStyle(titleElement, 15);
    textObjects.push(titleElement);
    titleElement.innerText = info.overlayTitle; // Example text


    const textElement = document.createElement('div');
    textElement.style.position = 'absolute';
    textElement.style.overflowWrap = 'break-word';
    textElement.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    setStyle(textElement, 35);
    textElement.style.fontSize = 15+'px';
    textObjects.push(textElement);
    textElement.innerText = info.overlayText; // Example text
    textElement.style.marginRight = '5%'; // Adjust the value as needed


    const forwardButton = document.createElement('button');
    forwardButton.style.position = 'absolute';
    //forwardButton.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    setButton(forwardButton, 55);
    forwardButton.addEventListener('click', () => {
        console.log('Forward button clicked!');
        window.location.href = info.overlayLink;
    });
    textObjects.push(forwardButton);
    
    forwardButton.innerText = "Go To";

    const backButton = document.createElement('button');
    backButton.style.position = 'absolute';
    //backButton.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    setButton(backButton, 75);
    backButton.addEventListener('click', () => {

        resetOverlay();


    });
    textObjects.push(backButton);
    backButton.innerText = "Back";





    //textElement.style.height = '100%';
    //textElement.style.width = '100%';
    



    textObjects.forEach(element => {
        overlayPanel.appendChild(element);
    });




cssOverlayRenderer.domElement.appendChild(overlayPanel);
console.dir(cssOverlayRenderer.domElement);

overlayRenderer.domElement.style.display = "block";
cssOverlayRenderer.domElement.style.display = "block";

objectsToRotate.push(info.overlayModel);

displayOverlay = true;
animateOverlay(objectsToRotate);





/*
//items.push(overlayRenderer);
items.push(cssOverlayRenderer);
items.push(pointLight);
//items.push(overlayCamera);

textObjects.forEach(element => {
    items.push(element);
});
objectsToRotate.forEach(element => {
    items.push(element);
});*/

}


function animateOverlay(objectsToRotate) {
    
    if(displayOverlay) {
        
        requestAnimationFrame(() => animateOverlay(objectsToRotate)); // Pass objectsToRotate recursively
       objectsToRotate.forEach(element => {
        element.rotation.y += 0.001;

        });

        currentOverlayRenderer.render(currentOverlayScene, currentOverlayCamera);

        //console.log(overlayCamera);
        //console.dir(overlayScene);

    }


  }



  function removeOverlay() {
    // Check if overlay exists, and remove the elements
    if (!displayOverlay) return;

    // Remove CSS2DRenderer and other elements
    const cssOverlayRenderer = document.querySelector('#overlayPanel'); // Assuming the overlay renderer has this class
    if (cssOverlayRenderer) {
        cssOverlayRenderer.remove();
    }

    // Remove 3D models and reset flags
    overlayRenderer.domElement.style.display = "none";
    displayOverlay = false;
}



  function setStyle(text, fromTop) {

    text.style.color = 'white';
    text.style.fontSize = 40+'px';
    text.style.zIndex = '5'; // Ensure the text appears above other elements
    text.style.fontFamily = '"Orbitron", sans-serif';
    text.style.filter = `
    drop-shadow(-1px -1px 0 #000)
    drop-shadow(1px -1px 0 #000)
    drop-shadow(-1px 1px 0 #000)
    drop-shadow(1px 1px 0 #000)
`;



text.style.display = 'flex';
text.style.justifyContent = 'center'; // Horizontally center
text.style.alignItems = 'center'; // Vertically center
text.style.height = '100%';

/*
text.style.top = fromTop+'%';
text.style.left = '50%';
text.style.transform = `translate(-50%, -50%) translateX(50%)`;
*/


    return text;
  }

  function setButton(text, fromTop) {
    // Set default styles for the button
    text.style.color = 'white';
    text.style.fontSize = '40px';
    text.style.zIndex = '5'; // Ensure the text appears above other elements
    text.style.fontFamily = '"Orbitron", sans-serif';
    text.style.border = '2px solid black'; // Black outline
    text.style.backgroundColor = 'transparent'; // Transparent background
    text.style.padding = '10px 20px';
    text.style.transition = 'all 0.3s ease'; // Smooth transition for hover effects
    text.style.cursor = 'pointer'; // Pointer cursor for buttons
    text.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.4)'; // Slight shadow around the outline

    // Positioning styles
    text.style.top = `${fromTop}%`;
    text.style.left = '50%';
    text.style.transform = 'translate(-50%, -50%) translateX(70%)';
    text.style.borderRadius = '10px'; // Rounded corners

    // Add hover effect using an event listener
    text.addEventListener('mouseover', () => {
        const randomColor = getRandomSubtleColor(); // Get a random subtle color
        text.style.color = randomColor; // Change text color
        text.style.transform = 'translate(-50%, -50%) translateX(70%) scale(1.1)'; // Slightly enlarge
        text.style.boxShadow = `0px 6px 10px ${randomColor}`;// Change text color to a random subtle color
    });

    text.addEventListener('mouseout', () => {
        text.style.transform = 'translate(-50%, -50%) translateX(70%)'; // Reset size
        text.style.color = 'white'; // Reset text color to white
        text.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.4)'; // Reset shadow to the default

    });

    return text;
}

// Helper function to generate a random subtle color
function getRandomSubtleColor() {
    const colors = ['#a6dcef', '#ffe6a7', '#c1e1c1', '#eac8cf', '#d4c4fb'];
    return colors[Math.floor(Math.random() * colors.length)];
}





export async function createArrowButtons(renderer, leftArrowFunction, rightArrowFunction) {
    return new Promise((resolve) => {

    // Create left arrow button
    const leftArrow = document.createElement('div');
    leftArrow.style.id = 'leftArrow';

    leftArrow.style.position = 'absolute';
    leftArrow.style.top = '50%';
    leftArrow.style.left = '20px';
    leftArrow.style.transform = 'translateY(-10%)';
    leftArrow.style.width = '60px'; // Set size for the image
    leftArrow.style.height = '40px';
    leftArrow.style.backgroundImage = 'url(files/arrows/leftArrow.png)'; // Path to your left arrow image
    leftArrow.style.backgroundSize = 'contain';
    leftArrow.style.backgroundRepeat = 'no-repeat';
    leftArrow.style.cursor = 'pointer';
    leftArrow.style.zIndex = '99';
    leftArrow.style.pointerEvents = 'auto';
    // Hover effect
    leftArrow.addEventListener('mouseover', () => {
        leftArrow.style.transform = 'translateY(-10%) scale(1.5)';
    });
    leftArrow.addEventListener('mouseout', () => {
        leftArrow.style.transform = 'translateY(-10%)';
    });

    // Add click event
    leftArrow.addEventListener('click', () => {
        leftArrowFunction();
    });

    // Create right arrow button
    const rightArrow = document.createElement('div');
    rightArrow.style.id = 'rightArrow';

    rightArrow.style.position = 'absolute';
    rightArrow.style.top = '50%';
    rightArrow.style.right = '20px';
    rightArrow.style.transform = 'translateY(-10%)';
    rightArrow.style.width = '60px';
    rightArrow.style.height = '40px';
    rightArrow.style.backgroundImage = 'url(files/arrows/rightArrow.png)'; // Path to your right arrow image
    rightArrow.style.backgroundSize = 'contain';
    rightArrow.style.backgroundRepeat = 'no-repeat';
    rightArrow.style.cursor = 'pointer';
    rightArrow.style.zIndex = '99';
    rightArrow.style.pointerEvents = 'auto';
    // Hover effect
    rightArrow.addEventListener('mouseover', () => {
        rightArrow.style.transform = 'translateY(-50%) scale(1.5)';
    });
    rightArrow.addEventListener('mouseout', () => {
        rightArrow.style.transform = 'translateY(-50%)';
    });

    // Add click event
    rightArrow.addEventListener('click', () => {
        rightArrowFunction();
    });

    // Append arrows to the CSS2DRenderer's DOM element
    renderer.domElement.appendChild(leftArrow);
    renderer.domElement.appendChild(rightArrow);


    resolve({ leftArrow, rightArrow });
});

}
