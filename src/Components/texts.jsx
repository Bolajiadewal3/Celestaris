import { Text, Edges } from "@react-three/drei";
import { useState } from "react";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

function GlowingTextBanner({
  text = "Projects",
  position = [0, 5, 0],
  rotation = [0, 0, 0],
  onClick,
}) {
  const [hovered, setHovered] = useState(false);
  const textWidth = text.length * 5; // Estimate; adjust based on font
  const padding = 2;
  const boxWidth = textWidth + padding;
  const boxHeight = 13.5;

  return (
    <group position={position} rotation={rotation}>
      {/* Invisible Box with Border */}
      <mesh>
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges scale={1.01}>
          <lineBasicMaterial color="#ffd700" />
        </Edges>
      </mesh>

      {/* Glowing Text */}
      <Text
        fontSize={10}
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
  const textWidth = text.length * 1.1; // Estimate; adjust based on font
  const padding = 0.3;
  const boxWidth = width + padding;
  const boxHeight = 10;

  console.log(isOpen);
  console.log(onOpen);

  const [open, setOpen] = useState(false);

  const { scale, box } = useSpring({
    scale: isOpen ? 1 : 0,
    box: isOpen ? 0 : 1,

    config: { mass: 1, tension: 170, friction: 150 },
  });

  return (
    <group position={position} rotation={rotation}>
      <a.mesh
        scale={box}
        position={[0, 10, -3]}
        onClick={() => {
          onClick();
          onOpen();
          setOpen(true);
          console.log(open);
        }}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="orange" emissive={"orange"} />
      </a.mesh>

      <a.group scale={scale}>
        <mesh>
          <planeGeometry args={[boxWidth, boxHeight]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges scale={1.002} threshold={15}>
            <lineBasicMaterial color="#000000" toneMapped={false} />
          </Edges>
        </mesh>

        <Text
          maxWidth={width}
          fontSize={1.6}
          color="black"
          anchorX="center"
          anchorY="center"
          textAlign="center"
          position={[0, 5, 1]} // shift upward a bit
          strokeWidth={0.5} // Stroke thickness
          strokeColor="black"
        >
          {title}
        </Text>

        {/* Text */}
        <Text
          maxWidth={width}
          fontSize={1.0}
          color="black"
          anchorX="center"
          anchorY="center"
          textAlign="center"
          position={[0, 2.5, 1]} // shift upward a bit
          strokeWidth={0.5} // Stroke thickness
          strokeColor="black"
        >
          {text}
        </Text>
      </a.group>
    </group>
  );
}

export { GlowingTextBanner, SmallTextBanner };
