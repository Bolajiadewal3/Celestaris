/**
 * @module NHS
 * @category Scenes
 * @description Case study to showcase data visualisation with NHS data
 */

import { useMemo, useState, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import * as d3 from "d3";
import { Loader, AudioButton } from "./Components/overlays.jsx";
import { OrbitControls } from "@react-three/drei";

const CENTER = [-3.44, 55.36];

const createRegionShape = (feature) => {
  if (!feature.geometry) return [];
  const type = feature.geometry.type;
  const coords = feature.geometry.coordinates;

  const processPolygon = (polygonCoords) => {
    const shape = new THREE.Shape();
    polygonCoords[0].forEach((coord, i) => {
      // DO NOT subtract CENTER here. Keep raw coordinates.
      const x = coord[0];
      const y = coord[1];
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    return shape;
  };

  if (type === "Polygon") return [processPolygon(coords)];
  if (type === "MultiPolygon")
    return coords.map((poly) => processPolygon(poly));
  return [];
};

function UKDashboard({ regionsGeoJson, locationsCsvUrl }) {
  const rawGeoJson = useLoader(THREE.FileLoader, regionsGeoJson);
  const rawCsv = useLoader(THREE.FileLoader, locationsCsvUrl);

  const regionsData = useMemo(() => JSON.parse(rawGeoJson), [rawGeoJson]);
  const locations = useMemo(() => d3.csvParse(rawCsv), [rawCsv]);

  const regionMeshes = useMemo(() => {
    return regionsData.features.map((feature, idx) => {
      const shapes = createRegionShape(feature);
      return {
        id: feature.properties.areacd || idx,
        name: feature.properties.areanm,
        shapes: shapes,
      };
    });
  }, [regionsData]);

  return (
    <group scale={25}>
      {/* THE MAP LAYER */}
      <group
        position={[-CENTER[0], 0, CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {" "}
        <group>
          {regionMeshes.map((region) =>
            region.shapes.map((shape, i) => (
              <mesh key={`${region.id}-${i}`} position={[0, 0, 0]}>
                <extrudeGeometry
                  args={[shape, { depth: 0.2, bevelEnabled: false }]}
                />
                <meshStandardMaterial
                  color="#005EB8" // NHS Blue
                  transparent
                  opacity={0.55}
                  emissive="#6a0dad"
                  emissiveIntensity={0.3}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )),
          )}
        </group>
        {/* THE HOSPITAL LAYER */}
        {locations.map((loc, i) => {
          const lon = parseFloat(loc.Longitude);
          const lat = parseFloat(loc.Latitude);
          if (lat < 49 || lat > 61 || lon < -10 || lon > 3) return null;
          return (
            <group key={i} position={[lon, lat, 0.2]}>
              {" "}
              {/* Glowing hospital marker */}
              <mesh>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshBasicMaterial color="#00f5d4" />
              </mesh>
              {/* Vertical data pillar */}
              <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
                {" "}
                <cylinderGeometry args={[0.02, 0.02, 2]} />
                <meshBasicMaterial color="#00f5d4" transparent opacity={0.3} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/**
 * Main application component rendering a Three.js city scene,
 * interactive UI overlays, banners, and ambient experience.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function NHS() {
  // UI states
  const [controlsEnabled, setControlsEnabled] = useState(true);

  // Camera/interaction state
  const controlsRef = useRef();

  /**
   * Toggles the overlay and OrbitControls simultaneously.
   */
  const toggleOverlay = () => {
    setOverlayActive((prev) => {
      const newState = !prev;
      if (controlsRef.current) {
        controlsRef.current.enabled = !newState;
      }
      return newState;
    });
  };

  /**
   * Starts city background audio on first interaction.
   */

  const audioRef = useRef(null);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <AudioButton
        url={`${import.meta.env.BASE_URL}NHS/hospital_ambience.mp3`}
      ></AudioButton>

      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{ position: [0, 330, 140], fov: 50, near: 1, far: 5000 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          performance={{ min: 0.8 }}
        >
          <UKDashboard
            regionsGeoJson={`${import.meta.env.BASE_URL}NHS/unitedkingdom.geojson`}
            locationsCsvUrl={`${import.meta.env.BASE_URL}NHS/hospital_locations_england.csv`}
          ></UKDashboard>

          {/* User controls */}
          <OrbitControls
            ref={controlsRef}
            target={[0, 0, 0]}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={10}
            maxDistance={4000}
            enabled={controlsEnabled}
          />
          {/* Lighting */}
          {/*<CameraLight />*/}
          <ambientLight intensity={0.8} />
          <directionalLight position={[300, 300, 300]} intensity={3} />
          {/* Center */}
          <mesh position={[5, 0, -2]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>

          <color attach="background" args={["#ffffff"]} />
        </Canvas>
      </Suspense>
    </div>
  );
}
