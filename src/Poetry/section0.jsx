import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import MarkdownIt from "markdown-it";

const poemLinks = [
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/I - Musings.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/II - Mirrors.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/III - Ex Nihilo.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/IV - The Black.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/V - Infinitum.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/VI - Polar.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/VII - Fleeting.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/VIII - Coin.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/IX - Florence.md`,
];

function toRoman(num) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];
  return romanNumerals.reduce((acc, curr) => {
    while (num >= curr.value) {
      acc += curr.symbol;
      num -= curr.value;
    }
    return acc;
  }, "");
}

const Section0 = () => {
  const containerRef = useRef();
  const currentPoem = useRef(0);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.zIndex = "0";
    containerRef.current.appendChild(renderer.domElement);

    const cssRenderer = new CSS2DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.zIndex = "5";
    //cssRenderer.domElement.style.pointerEvents = "none";
    containerRef.current.appendChild(cssRenderer.domElement);

    // Background sphere
    const geometry = new THREE.SphereGeometry(50, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
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
          gl_FragColor = vec4(vec3(intensity * fade), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Create overlay panel
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.width = "80%";
    overlay.style.height = "100vh";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.flexWrap = "nowrap";

    overlayRef.current = overlay;
    // cssRenderer.domElement.appendChild(overlay);
    containerRef.current.appendChild(overlay);

    // Text container
    const text = document.createElement("div");
    textRef.current = text;
    overlay.appendChild(text);

    // Links container
    const links = document.createElement("div");
    links.className = "poemLinks";
    links.style.display = "flex";
    links.style.justifyContent = "center";
    links.style.alignItems = "center";
    links.style.flexWrap = "wrap";
    links.style.height = "15vh";
    links.style.fontFamily = '"Orbitron", sans-serif';
    links.style.color = "white";
    links.style.zIndex = "6";
    links.style.pointerEvents = "auto !important";

    overlay.appendChild(links);
    linksRef.current = links;

    poemLinks.forEach((_, i) => {
      const link = document.createElement("div");
      link.innerText = toRoman(i + 1);
      link.style.cursor = "pointer";
      link.style.margin = "0 1%";
      link.style.padding = "0.5em 1em";
      link.addEventListener("click", () => {
        loadMarkdown(i);
        currentPoem.current = i;
      });
      links.appendChild(link);
    });

    const md = new MarkdownIt();

    async function loadMarkdown(index) {
      const response = await fetch(poemLinks[index]);
      const markdownText = await response.text();
      const poem = md.render(markdownText);
      const container = textRef.current;

      container.innerHTML = poem;
      container.style.color = "white";
      container.style.fontFamily = '"Orbitron", sans-serif';
      container.style.padding = "2%";
      container.style.fontSize = "14px";
      container.style.height = "85vh";
      container.style.overflowY = "auto";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.justifyContent = "center";
      container.style.alignContent = "center";

      const elements = Array.from(
        container.querySelectorAll("p, h1, h2, h3, span, li")
      );
      elements.forEach((element, index) => {
        element.style.opacity = "0";
        setTimeout(() => {
          element.style.transition = "opacity 0.5s ease-in-out";
          element.style.opacity = "1";
        }, index * (1000 + 300 * index));
      });
    }

    loadMarkdown(currentPoem.current);

    const clock = new THREE.Clock();
    const animate = () => {
      material.uniforms.time.value = clock.getElapsedTime();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      renderer.dispose();
      cssRenderer.dispose();
      window.removeEventListener("resize", handleResize);
      containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    />
  );
};

export default Section0;
