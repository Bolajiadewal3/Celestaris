import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );



const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );




const material2 = new THREE.MeshStandardMaterial({
    color: 0xffffff,  // Default color is white
    roughness: 0.5,   // Adjust roughness to control how light interacts with the surface
    metalness: 0.5,   // Adjust metalness for reflective properties
    emissive: 0x000000, // Optionally add an emissive color (glowing)
    emissiveIntensity: 0.1  // Controls the strength of the emissive glow
});

const translucentMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,  // Random color
    transparent: true,  // Make the material transparent
    opacity: 0.3,       // Adjust opacity (0 = fully transparent, 1 = fully opaque)
    roughness: 0.3,
    metalness: 0.9
});

const cloudGeometry = new THREE.BufferGeometry();
const c = null;

camera.position.z = 5;
let globalRotation = 0.003;
let cloud;
let fourParticles;
let particlesArray;
let textMaterial;
let textMesh;


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 20);  // Light position
scene.add(light);

let cameraPosition = { x: 0, y: 0, z: 5 }; // Initial camera position
let targetPosition = { x: 0, y: 0, z: -10 }; // Target position to zoom to
let zoomSpeed = 0.02; // Zoom speed (controls how fast the zoom occurs)
let isZoomComplete = false; // To track when zoom is finished

// Function to update the camera position with easing
function zoomCamera() {
    if (!isZooming) return;  // Only proceed if zooming is triggered


    const elapsedTime = Date.now() - startTime;
    const zoomDuration = 5000; // Duration of the zoom effect (e.g., 3 seconds)

    // Check if the zoom duration is complete, stop zooming if true
    if (elapsedTime >= zoomDuration) {
        isZooming = false;  // Stop zooming after the duration is over

        isZoomComplete = true; // Mark zoom as complete
        onZoomComplete(); // Call the next step
    }

    let progress = Math.min(elapsedTime / zoomDuration, .4);  // Ensure progress doesn't exceed 1
    camera.position.x += (targetPosition.x - camera.position.x) * progress * zoomSpeed;
    camera.position.y += (targetPosition.y - camera.position.y) * progress * zoomSpeed;
    camera.position.z += (targetPosition.z - camera.position.z) * progress * zoomSpeed;

    // Optionally, you can also update the camera's lookAt to keep focus on the center
    camera.lookAt(new THREE.Vector3(0, 0, -20)); // Keep looking at the center of the scene
}


function onZoomComplete() {
    if (isZoomComplete) {
        // Load the next page or perform any action after zoom completes
        // For example, navigate to the next page:
        window.location.href = 'landing.html'; // Replace with the actual next page URL
    }
}


// Fade-in function
function fadeIn(text) {
    text.material.opacity = 0; // Set initial opacity to 0
    let startTime = Date.now();
    
    function fade() {
        let elapsedTime = Date.now() - startTime;
        let opacity = elapsedTime / 2000; // Adjust the time to control fade-in speed (2000ms = 2 seconds)
        
        if (opacity < 1) {
            text.material.opacity = opacity;
            requestAnimationFrame(fade);
        } else {
            text.material.opacity = 1; // Ensure it reaches full opacity
        }
    }

    fade(); // Start the fade-in
}

// Fade-out function
function fadeOut(text) {
    let startTime = Date.now();
    
    function fade() {
        let elapsedTime = Date.now() - startTime;
        let opacity = 1 - (elapsedTime / 2000); // Decrease opacity over time
        
        if (opacity > 0) {
            text.material.opacity = opacity;
            requestAnimationFrame(fade);
        } else {
            text.material.opacity = 0; // Ensure it reaches full transparency
            scene.remove(text); // Optionally remove the text from the scene
            if (onFadeOutComplete) {
                onFadeOutComplete(); // Call the callback function (event) when fade-out is complete
            }
        }
    }

    fade(); // Start the fade-out
}


let isZooming = false;
let startTime = null;

function onFadeOutComplete() {
    isZooming = true;
    startTime = Date.now();
}





const colorsArray = [
    new THREE.Color(0x99ccff),  // Light blue
    new THREE.Color(0xff0000),  // Red
    new THREE.Color(0x00ff00),  // Green
    new THREE.Color(0xffff00),  // Yellow
];






function createOpeningText() {
    const loader = new FontLoader();
    loader.load('Lena_Regular.json', function (font) {
        const textGeometry = new TextGeometry('By Mobolaji Adewale', {
            font: font,  // Directly use the loaded font
            size: 0.5,
            depth: -0.01

        });

  // Create a material for the text
    textMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff ,
        transparent: true
    });
    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    
  // Create the mesh from the geometry and material
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(-textWidth/2, 0, 1); // Move to center (0, 0, 0) and then further in (-20)


    textMesh.material.opacity = 0;


  // Add the text to the scene
  scene.add(textMesh);
  setTimeout(() => {
    fadeIn(textMesh); // Fade out the text after 5 seconds (or based on some event)
}, 2000);
 

setTimeout(() => {
    fadeOut(textMesh); // Fade out the text after 5 seconds (or based on some event)
}, 5000);


});
}




// Function to create the four colored particles
function createFourParticles() {

    const particleTexture = new THREE.TextureLoader().load(
        '/circle_05.png',
        () => console.log('Texture loaded successfully'),
        undefined,
        (err) => console.error('Error loading texture', err)
    );

    const fourParticleMaterial = new THREE.PointsMaterial({
        map: particleTexture,
        size: 1.2,               // Size of each particle
        transparent: true,     // Enable transparency
        opacity: 1,            // Soft opacity
        depthWrite: false,     // Prevent depth writing
        blending: THREE.AdditiveBlending,  // Additive blending to give the glow effect
        vertexColors: true
        //emissive: new THREE.Color(1, 1, 1), // Glow effect
        //emissiveIntensity: 0.5,  // Slight emissive intensity for glow
        //roughness: 0.2, // Control roughness for lighting interaction
        //metalness: 0.3 // Slightly reflective surface
    })

    const fourParticleGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const velocities = [];

    // Create four particles with random positions and assigned colors
    for (let i = 0; i < 4; i++) {
        positions.push(
            (Math.random() - 0.5) * 20,  // Random X position
            (Math.random() - 0.5) * 20,  // Random Y position
            Math.random() * -15 - 2      // Random Z position (further away)
        );

        colors.push(colorsArray[i].r, colorsArray[i].g, colorsArray[i].b);  // Assign color for each particle

        // Set random velocity for each particle to move independently
        velocities.push(
            (Math.random() - 0.5) * 0.05, // Random X velocity
            (Math.random() - 0.5) * 0.05, // Random Y velocity
            (Math.random() - 0.5) * 0.0  // Random Z velocity
        );
    }

    fourParticleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    fourParticleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    fourParticles = new THREE.Points(fourParticleGeometry, fourParticleMaterial);
    scene.add(fourParticles);

    particlesArray = positions.map((pos, index) => {
        return {
            particle: fourParticles,
            velocity: new THREE.Vector3(velocities[index*3], velocities[index*3+1], velocities[index*3+2]),
            trail: []
        };
    });
}


function updateFourParticles() {
    const MAX_X = 7;
    const MAX_Y = 7;
    const MAX_Z = 5;

    particlesArray.forEach((data, i) => {
        const position = data.particle.geometry.attributes.position.array;
        const velocity = data.velocity;

        data.trail.push(new THREE.Vector3(position[i * 3], position[i * 3 + 1], position[i * 3 + 2]));

        // Keep trail to a maximum length (e.g., 50 points)
        if (data.trail.length > 50) {
            data.trail.shift();  // Remove the oldest point from the trail
        }

        // Update position with velocity
       // for (let i = 0; i < position.length; i += 3) {
            position[i] += velocity.x;
            position[i+1] += velocity.y;
            position[i+2] += velocity.z;
       // }


       if (position[i * 3] > MAX_X || position[i * 3] < -MAX_X) {
        velocity.x = -velocity.x; // Reverse direction when hitting bounds
    }
    if (position[i * 3 + 1] > MAX_Y || position[i * 3 + 1] < -MAX_Y) {
        velocity.y = -velocity.y;
    }
    //if (position[i * 3 + 2] > MAX_Z || position[i * 3 + 2] < -MAX_Z) {
      //  velocity.z = -velocity.z;
    //}

        // Update the geometry to apply changes
    });
    fourParticles.geometry.attributes.position.needsUpdate = true;

}

function createTrails() {
    particlesArray.forEach(data => {
        const trailGeometry = new THREE.BufferGeometry();
        const trailMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,  // Trail color
            opacity: 0.5,
            transparent: true
        });

        const trailPositions = [];
        data.trail.forEach(position => {
            trailPositions.push(position.x, position.y, position.z);
        });

        trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));

        const trail = new THREE.Line(trailGeometry, trailMaterial);
        scene.add(trail);
    });
}


function rotateFourParticles(particles) {
    //particles.rotation.x += 0.0001;
    //particles.rotation.y += 0.0001;
    particles.rotation.z += 0.0001
}




function createTranslucentCubes() {
    console.log("createTranslucentCubes called");

    for (let i = 0; i < 15; i++) {
        // Create a translucent material
        

        const cube = new THREE.Mesh(geometry, translucentMaterial);
        cube.position.set(
            (Math.random() - 0.5) * 30, 
            (Math.random() - 0.5) * 20, 
            (Math.random() - 1) * 22
        );
        cube.userData.rotationSpeed = {
            x: Math.random() * globalRotation, 
            y: Math.random() * globalRotation  
        };
        scene.add( cube );

    }


}

function createCubes() {
    console.log("createCubes called");

    for(let i = 0; i < 55; i++) {
        const cube = new THREE.Mesh( geometry, material2 );
        cube.position.set(
            (Math.random() - 0.5) * 30, 
            (Math.random() - 0.5) * 20, 
            (Math.random() - 1) * 40 
        );

        cube.userData.rotationSpeed = {
            x: Math.random() * globalRotation, 
            y: Math.random() * globalRotation  
        };

        scene.add( cube );
    }
}

function createCloud() {
    
    const cloudMaterial = new THREE.PointsMaterial({
        color: 0x0000ff,    
        size: 2,            
        transparent: true,   
        opacity: 0.3         
      });


    const positions = []
    for (let i = 0; i < 1000; i++) {
        positions.push(
            Math.random() * 50 - 25,  // Random position in the X axis
            Math.random() * 50 - 25,  // Random position in the Y axis
            Math.random() * -50       // Random position in the Z axis (negative to push them farther)
        );
    }

    cloudGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    cloud = new THREE.Points(cloudGeometry, cloudMaterial);
    scene.add(cloud);


}


function createTexturedCloud() {
    const cloudTexture = new THREE.TextureLoader().load(
        '/circle_05.png',
        () => console.log('Texture loaded successfully'),
        undefined,
        (err) => console.error('Error loading texture', err)
    );
    
    const cloudMaterial = new THREE.PointsMaterial({
        map: cloudTexture, // Use the texture
        color: 0x99ccff,   // Soft blue color
        size: 10,           // Adjust size of particles
        transparent: true, // Enable transparency
        opacity: 0.15,      // Subtle opacity
        depthWrite: false, // Prevent writing to the depth buffer
        blending: THREE.AdditiveBlending // Additive blending for glow
    });

    const particles = [];
    const positions = [];
    for (let i = 0; i < 5000; i++) {
        positions.push(
            (Math.random() - 0.5) * 40,  // Random position in the X axis
            (Math.random() - 0.5) * 30,  // Random position in the Y axis
            Math.random() * -100 - 20     // Random position in the Z axis (negative to push them farther)
        );
        particles.push(new THREE.Vector3(positions[0], positions[1], positions[2]));
    }

    cloudGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    cloud = new THREE.Points(cloudGeometry, cloudMaterial);

    scene.add(cloud);
}

function createBluelight() {
    const blueLight = new THREE.PointLight(0x0000ff, 10, 100);
    blueLight.position.set(0, 0, -50); // Light positioned far away
    scene.add(blueLight);
}


function createFog()
 {
    scene.fog = new THREE.Fog(0x1a1a66, 10, 30);
    //scene.fog = new THREE.FogExp2(0x0000ff, 0.01); // Exponential fog, blue color

 }

function rotate() {

    scene.traverse((object) => {
        if (object.isMesh && !(object.geometry instanceof TextGeometry) ) {
            let randRotation = object.userData.rotationSpeed;
            object.rotation.x += randRotation.x;
            object.rotation.y += randRotation.y;
        }
    });

    rotateFourParticles(fourParticles);

    cloud.rotation.z += 0.0001;
    //if(cloudGeometry != null)cloudGeometry.attributes.position.needsUpdate = true;
}


function animate() {
   // requestAnimationFrame(animate);
   updateFourParticles();
   //createTrails();
    rotate();

    zoomCamera();

	renderer.render( scene, camera );
}





import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {
    createFourParticles();
    createOpeningText();
    createFog();
    createBluelight();

    createTexturedCloud();
    createTranslucentCubes();
    createCubes();


    renderer.setAnimationLoop( animate );
    //animate();

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}






function disposeScene() {
    // Dispose of all meshes, geometries, materials, and textures
    scene.traverse(function (object) {
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

    // Remove all children from the scene
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Dispose of any remaining resources
    if (renderer) {
        renderer.dispose();
    }
}

// When changing the page or unloading the scene:
window.onbeforeunload = function () {
    disposeScene();
};



document.body.appendChild( renderer.domElement );