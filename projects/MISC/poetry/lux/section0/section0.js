import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import MarkdownIt from 'markdown-it';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.zIndex = '0';
renderer.domElement.style.position = 'absolute';

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 7); // Slightly above the ground looking forward
camera.lookAt(0, 0, 0);

controls.target.set(0, 0, 0);
let currentLookAt = {x: 0, y: 0, z: 0};
controls.update();
scene.add( camera );

const cssRenderer = new CSS2DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.top = '0';  // Ensure it aligns with the WebGL renderer
//cssRenderer.domElement.style.left = '0';
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


const overlayPanel = document.createElement('div');
    overlayPanel.style.position = 'absolute';
    overlayPanel.style.id = 'overlayPanel';
    overlayPanel.style.width = '100%';
    overlayPanel.style.height = '100vh';
    overlayPanel.style.display = "flex"
    overlayPanel.style.flexWrap = "wrap"

    //overlayPanel.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions
    overlayPanel.style.position = 'relative';


    cssRenderer.domElement.appendChild(overlayPanel);
    cssRenderer.domElement.style.display = "block";





    let currentPoem = 0;




    const poemLinks = []
poemLinks.push('/documents/poetry/lux/section0/I - Musings.md')
poemLinks.push('/documents/poetry/lux/section0/II - Mirrors.md')
poemLinks.push('/documents/poetry/lux/section0/III- Ex Nihilo.md')
poemLinks.push('/documents/poetry/lux/section0/IV - The Black.md')
poemLinks.push('/documents/poetry/lux/section0/V - Infinitum.md')
poemLinks.push('/documents/poetry/lux/section0/VI - Polar.md')
poemLinks.push('/documents/poetry/lux/section0/VII - Fleeting.md')
poemLinks.push('/documents/poetry/lux/section0/VIII - Coin.md')
poemLinks.push('/documents/poetry/lux/section0/IX - Florence.md')







    
    
    const md = new MarkdownIt();
    const text = document.createElement('div');


    let poemText = ''; // Holds the current poem text to be typed
    let index = 0; // Index for typing the poem
    let typingInterval; // Reference to the typing interval for controlling typing speed
    let isTyping = false; // Flag to check if typing is in progress
    let textContainer; // Container where the poem will be typed
    


    async function loadMarkdown(poemIndex) {
        console.log("index at", poemIndex, poemLinks[poemIndex])


      const response = await fetch(poemLinks[poemIndex]);
      const markdownText = await response.text();
    
      // Convert markdown to HTML
      const poem = md.render(markdownText);



      // Clear canvas before drawing new content
      text.style.position = 'relative';
      text.style.pointerEvents = 'none'; // Ensures it doesn't block 3D interactions

      text.innerHTML = poem;

      text.style.top = '0vh';

      text.style.color = 'white';
    text.style.fontSize = 14+'px';
    text.style.zIndex = '5'; // Ensure the text appears above other elements
    text.style.fontFamily = '"Orbitron", sans-serif';
    text.style.filter = `
    drop-shadow(-1px -1px 0 #000)
    drop-shadow(1px -1px 0 #000)
    drop-shadow(-1px 1px 0 #000)
    drop-shadow(1px 1px 0 #000)
`;

text.style.whiteSpace = 'pre-wrap';  
text.style.margin = "auto"
//text.style.width = '50%'
text.style.width = '100%'

text.style.height = '85vh'; // Full viewport height

// Flexbox centering
text.style.display = 'flex';
text.style.flexDirection = 'column'; // Stack content vertically
text.style.flexWrap = 'wrap'; // Stack content vertically

text.style.justifyContent = 'center'; // Center content vertically
text.style.alignContent = 'center';
text.style.order = "1"


const elements = Array.from(text.querySelectorAll('p, h1, h2, h3, span, li')); // You can adjust the querySelector for other tags

elements.forEach((element, index) => {
  // Initially set opacity to 0 for each element
  element.style.opacity = '0';
  
  // Set the animation (you can adjust the delay for each element)
  setTimeout(() => {
    element.style.transition = 'opacity 0.5s ease-in-out';
    element.style.opacity = '1'; // Make the text visible
  }, index * (1000 + (300*index))); // Delay each element based on its order
});

      overlayPanel.appendChild(text)

}





      








    
      
    


      function typePoem(textContainer, targetText) {
        isTyping = true;
        function type() {
          if (index < targetText.length) {
            textContainer.innerHTML += targetText[index++];
            setTimeout(type, 50); // Adjust typing speed here (50ms between characters)
          }
        }
        type();
      }


      function untypePoem(callback, textContainer) {
        let currentText = textContainer.innerHTML;
        let currentIndex = currentText.length;
      
        function untype() {
          if (currentIndex > 0) {
            // Remove one character at a time from the end
            textContainer.innerHTML = currentText.substring(0, currentIndex - 1);
            currentIndex--;
            setTimeout(untype, 50); // Adjust untyping speed here (50ms between character removals)
          } else {
            // After untyping is complete, call the callback to start typing the next poem
            isTyping = false;
            callback();
          }
        }
        untype();
      }






    
    loadMarkdown(currentPoem);
    



    const links = document.createElement('div');
    links.style.position = 'relative';
    links.style.display = "flex"
    links.style.flexWrap = "wrap"
    links.style.alignContent = "center"
    links.style.justifyContent = "center"

    links.style.whiteSpace = 'pre-wrap';  
    links.style.margin = "auto"
    links.style.width = '70%'
    links.style.color = 'white';
    links.style.fontSize = 15+'px';
    links.style.zIndex = '5'; // Ensure the text appears above other elements
    links.style.fontFamily = '"Orbitron", sans-serif';
    links.style.height = '15vh'; // Full viewport height
    links.style.order = "2"
    //links.style.top = "80vh"

    overlayPanel.appendChild(links)

    poemLinks.forEach((poem, index) => {
        console.log(poem, index)
        const link = document.createElement('div');
        link.innerText = `${toRoman(index)}`;
        link.style.pointerEvents = "auto";
        link.style.marginLeft = `${(100/poemLinks.length)*0.33}%`
        link.style.marginRight = `${(100/poemLinks.length)*0.33}%`
        link.style.padding = '1%';              // Smooth transition

        
        link.addEventListener('click', () => {
            console.log('Link at index ' + index + ' clicked!');
            loadMarkdown(index-1)
            currentPoem = index-1;
          });

          link.addEventListener('mouseover', () => {
            link.style.backgroundColor = 'lightcoral';  // Change background color on hover
            link.style.transform = 'scale(1.1)';        // Slightly enlarge the div on hover
            link.style.transition = '0.4s';    
            link.style.borderRadius = '40%';      
  
          });
        
          link.addEventListener('mouseout', () => {
            link.style.backgroundColor = '';  // Reset background color
            link.style.transform = ''; 
            link.style.borderRadius = '15%';      

          });

        links.appendChild(link)
});






    function toRoman(num) {
        const romanNumerals = [
            { value: 1000, symbol: 'M' },
            { value: 900, symbol: 'CM' },
            { value: 500, symbol: 'D' },
            { value: 400, symbol: 'CD' },
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' }
        ];
    
        let result = '';
        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                result += romanNumerals[i].symbol;
                num -= romanNumerals[i].value;
            }
        }
    
        return result;
    }








// Create a dark environment with subtle movement
const geometry = new THREE.SphereGeometry(50, 32, 32);
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
     uniform float time;
    varying vec3 vPosition;

    void main() {
        float distance = length(vPosition.xy);
        float swirl = sin(vPosition.x * 5.0 + time) * cos(vPosition.y * 5.0 - time);
        float chaos = sin(distance * 10.0 - time * 0.5);
        float intensity = swirl * 0.5 + chaos * 0.5;
        float fade = 1.0 / (distance * 0.5 + 1.0);

        gl_FragColor = vec4(vec3(intensity * fade), 1.0);;
    }
  `,
  side: THREE.BackSide,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);






    function type() {
        if (index < poemText.length) {
          element.innerHTML += poemText[index++];
          setTimeout(type, 100); // Adjust typing speed
        }
      }






    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
    
    
    
    
    
    function animate() {
        controls.update(); 
        //checkRaycast();

        material.uniforms.time.value += 0.07;

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