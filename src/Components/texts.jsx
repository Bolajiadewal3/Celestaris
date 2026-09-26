/**
 * @module Components
 * @category Utility
 * @description Various text rendering functions
 */
import { Text, Edges } from "@react-three/drei";
import { useState } from "react";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

/**
 * Creates a white bordered banner of glowing gold text; that turns red on hover
 * @function
 * @category Text
 */
function GlowingTextBanner({
  text = "Projects",
  position = [0, 5, 0],
  rotation = [0, 0, 0],
  onClick,
}) {
  /**
   * State to track whether the text is being actively hovered over
   * @type {boolean}
   */
  const [hovered, setHovered] = useState(false);

  const textWidth = text.length * 4.5;
  const padding = 2;
  const boxWidth = textWidth + padding;
  const boxHeight = 12;

  return (
    <group position={position} rotation={rotation}>
      {/* Invisible Box with Border */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.35} />
        <Edges scale={1.01}>
          <lineBasicMaterial color="#ffd700" />
        </Edges>
      </mesh>

      {/* Glowing Text */}
      <Text
        fontSize={8}
        style={{ fontFamily: "Arial", fontWeight: "bold" }}
        color={hovered ? "#ff0000" : "#ffd700"}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {text}
      </Text>
    </group>
  );
}

/**
 * Creates a white bordered banner of glowing white text; to denote overarching groups
 * @function
 * @category Text
 */
function LargeGroupText({
  text = "Group",
  position = [0, 8, 0],
  rotation = [0, 0, 0],
}) {
  const textWidth = text.length * 9;
  const padding = 2;
  const boxWidth = textWidth + padding;
  const boxHeight = 20;

  return (
    <group position={position} rotation={rotation}>
      {/* Invisible Box with Border */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.35} />
        <Edges scale={1.01}>
          <lineBasicMaterial color="#fff" />
        </Edges>
      </mesh>

      {/* Glowing Text */}
      <Text
        fontSize={15}
        style={{ fontFamily: "Arial", fontWeight: "bold" }}
        color={"#fff"}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

/**
 * Creates a white bordered banner of white text, with a grey background and glowing orange box to open it; that can be placed on scene objects and tracks if its being viewed
 * @function
 * @category Text
 */
function SmallTextBanner({
  title = "SMALL TEXT",
  text = "text",
  position = [0, 10, 0],
  rotation = [0, 0, 0],
  width = 10,
  onClick,
  isOpen,
  onOpen,
}) {
  const padding = 0.3;
  const boxWidth = width + padding;
  const boxHeight = 10;

  //console.log(isOpen);
  //console.log(onOpen);

  /**
   * State to track whether the text is being viewed currently
   * @type {boolean}
   */
  const [open, setOpen] = useState(false);

  /**
   * Animation effect to have the text box expand open and close shut on enter and exit, respectively
   * @type {useSpring}
   */
  const { scale, box } = useSpring({
    scale: isOpen ? 1 : 0,
    box: isOpen ? 0 : 1,

    config: { mass: 1, tension: 170, friction: 150 },
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Glowing box to open and view the text */}
      <a.mesh
        scale={box}
        position={[0, 10, -3]}
        onClick={() => {
          onClick();
          onOpen();
          setOpen(true);
          //console.log(open);
        }}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color="green"
          emissive={"green"}
          emissiveIntensity={4}
        />
      </a.mesh>

      {/* The grey background that the text is set on; with the white text border */}
      <a.group scale={scale}>
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[boxWidth, boxHeight]} />
          <meshBasicMaterial color="#050505" transparent opacity={0.85} />
          <Edges scale={1}>
            <lineBasicMaterial color="#ffffff" toneMapped={false} />
          </Edges>
        </mesh>

        {/* The TITLE text to be displayed, in uppercase */}
        <Text
          maxWidth={width}
          fontSize={1.6}
          color="white"
          style={{ fontFamily: "Orbitron", fontWeight: "bold" }}
          anchorX="center"
          anchorY="middle"
          position={[0, 3.5, 0.1]} // Lifted forward to prevent flicker
          outlineWidth={0.1}
          outlineColor="#aaa"
        >
          {title.toUpperCase()}
        </Text>

        {/* The BODY test to be displayed */}
        <Text
          maxWidth={width - 1}
          fontSize={0.7}
          color="#dddddd"
          anchorX="center"
          anchorY="top"
          textAlign="center"
          position={[0, 1.5, 0.1]}
          lineHeight={1.4}
        >
          {text}
        </Text>

        {/* The HINT for the user 'Click "Return" to Close' */}
        <Text fontSize={0.5} color="#AAAAAA" position={[0, -3.5, 0.1]}>
          (Click "Return" to close)
        </Text>
      </a.group>
    </group>
  );
}

export { GlowingTextBanner, SmallTextBanner, LargeGroupText };
