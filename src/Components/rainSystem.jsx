import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useEnvironmentStore } from "../Store/useEnvironmentStore";

const DROP_COUNT = 1500;
const DROP_LENGTH = 1.8;

/**
 * Renders a rain system in the 3D scene, simulating falling raindrops with wind drift.
 * The rain system is only active when the weather state is set to "rain".
 * Each raindrop has a randomized fall speed and wind drift, creating a natural effect.
 * The rain system is anchored to the camera's position to maintain its appearance relative to the viewer.
 */
export function RainSystem() {
  const linesRef = useRef();
  const { camera } = useThree();
  const weather = useEnvironmentStore((state) => state.weather);

  // Stores individual drop data (speeds and wind drift) in a ref so they persist across frames
  const dropData = useRef([]);

  const [positions] = React.useState(() => {
    const pos = new Float32Array(DROP_COUNT * 6);
    const data = [];

    for (let i = 0; i < DROP_COUNT * 6; i += 6) {
      const x = (Math.random() - 0.5) * 90;
      const y = Math.random() * 60;
      const z = (Math.random() - 0.5) * 90;

      // Top vertex
      pos[i] = x;
      pos[i + 1] = y;
      pos[i + 2] = z;

      // Bottom vertex (slanted slightly for wind effect)
      const windOffset = 0.3;
      pos[i + 3] = x + windOffset;
      pos[i + 4] = y - DROP_LENGTH;
      pos[i + 5] = z;

      // Randomize individual fall speed and wind drift per drop
      data.push({
        speed: 150 + Math.random() * 100,
        drift: 0.1 + Math.random() * 0.4,
      });
    }

    dropData.current = data;
    return pos;
  });

  useFrame((_, delta) => {
    if (weather !== "rain" || !linesRef.current) return;

    const arr = linesRef.current.geometry.attributes.position.array;
    const data = dropData.current;

    for (let i = 0, j = 0; i < arr.length; i += 6, j++) {
      const drop = data[j];
      const fallAmount = delta * drop.speed;

      // Move both top and bottom vertices down, plus a bit of wind drift
      arr[i + 1] -= fallAmount;
      arr[i + 4] -= fallAmount;
      arr[i] += delta * drop.drift * 20; // X wind sway
      arr[i + 3] += delta * drop.drift * 20;

      // Reset when it hits the ground
      if (arr[i + 1] < 0) {
        const resetY = 50 + Math.random() * 10;
        const newX = (Math.random() - 0.5) * 90;
        const newZ = (Math.random() - 0.5) * 90;

        arr[i] = newX;
        arr[i + 1] = resetY;
        arr[i + 2] = newZ;

        arr[i + 3] = newX + 0.3;
        arr[i + 4] = resetY - DROP_LENGTH;
        arr[i + 5] = newZ;
      }
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;

    // Anchor to camera
    linesRef.current.position.x = camera.position.x;
    linesRef.current.position.z = camera.position.z;
  });

  if (weather !== "rain") return null;

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#bfe3ff" transparent opacity={0.3} />
    </lineSegments>
  );
}

/**
 * Manages the weather system in the application, automatically transitioning between "clear" and "rain" states based on random chance when in "auto" mode.
 * The weather state is stored in the environment store and can be accessed by other components to adjust their behavior accordingly.
 */
export function WeatherManager() {
  const weatherMode = useEnvironmentStore((state) => state.weatherMode);
  const weather = useEnvironmentStore((state) => state.weather);
  const setAutoWeather = useEnvironmentStore((state) => state.setAutoWeather);

  useEffect(() => {
    if (weatherMode !== "auto") return;

    // Check every 45 seconds for a weather roll
    const interval = setInterval(() => {
      const roll = Math.random();

      // If it's clear, 30% chance to start raining. If it's raining, 50% chance to clear up.
      if (weather === "clear" && roll < 0.3) {
        setAutoWeather("rain");
        console.log("🌧️ Weather shift: Rain starting naturally...");
      } else if (weather === "rain" && roll < 0.5) {
        setAutoWeather("clear");
        console.log("☀️ Weather shift: Skies clearing up...");
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [weatherMode, weather, setAutoWeather]);

  return null;
}