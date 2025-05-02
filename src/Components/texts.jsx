import { Text, Edges } from "@react-three/drei";
import { useState } from "react";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

/**
 * GlowingTextBanner is a clickable 3D text component that changes color when hovered over. It displays
 * a glowing text surrounded by an invisible box with a border. The text can be customized with a `text` prop,
 * and the position and rotation can be adjusted via the `position` and `rotation` props.
 *
 * @param {Object} props - The props for the GlowingTextBanner component.
 * @param {string} [props.text="Projects"] - The text to display in the banner.
 * @param {Array} [props.position=[0, 5, 0]] - The position of the banner in the 3D space (x, y, z).
 * @param {Array} [props.rotation=[0, 0, 0]] - The rotation of the banner in the 3D space (x, y, z).
 * @param {Function} props.onClick - Callback function triggered when the text is clicked.
 *
 * @returns {JSX.Element} The rendered component displaying the glowing text and its surrounding border.
 */
function GlowingTextBanner({
  text = "Projects",
  position = [0, 5, 0],
  rotation = [0, 0, 0],
  onClick,
}) {
  const [hovered, setHovered] = useState(false); // State to track if the text is being hovered
  const textWidth = text.length * 5; // Estimate of the text width based on character length, adjust based on font
  const padding = 2; // Padding to add around the text for the surrounding box
  const boxWidth = textWidth + padding; // Box width based on text width and padding
  const boxHeight = 13.5; // Fixed box height for the surrounding border

  return (
    <group position={position} rotation={rotation}>
      {/* Invisible Box with Border */}
      <mesh>
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial transparent opacity={0} /> {/* Invisible material */}
        <Edges scale={1.01}>
          {" "}
          {/* Slight scale to ensure edges are visible */}
          <lineBasicMaterial color="#ffd700" /> {/* Gold-colored border */}
        </Edges>
      </mesh>

      {/* Glowing Text */}
      <Text
        fontSize={10} // Size of the text
        style={{ fontFamily: "Arial", fontWeight: "bold" }} // Font style for the text
        color={hovered ? "#ff0000" : "#ffd700"} // Changes color when hovered (red when hovered, gold when not)
        anchorX="center" // Horizontally centers the text
        anchorY="middle" // Vertically centers the text
        onPointerOver={() => setHovered(true)} // Change hover state when mouse enters
        onPointerOut={() => setHovered(false)} // Change hover state when mouse leaves
        onClick={onClick} // Trigger the onClick function when clicked
      >
        {text}
      </Text>
    </group>
  );
}

/**
 * SmallTextBanner is a clickable 3D banner that expands when clicked. It contains two text fields: a `title`
 * and a `text`. When clicked, the banner triggers an animation to expand and display the text content.
 * The component can be customized via props such as `title`, `text`, `position`, and `rotation`.
 *
 * @param {Object} props - The props for the SmallTextBanner component.
 * @param {string} [props.title="SMALL TEXT"] - The title text to display in the banner.
 * @param {string} [props.text="text"] - The secondary text to display in the banner.
 * @param {Array} [props.position=[0, 10, 0]] - The position of the banner in the 3D space (x, y, z).
 * @param {Array} [props.rotation=[0, 0, 0]] - The rotation of the banner in the 3D space (x, y, z).
 * @param {number} [props.width=10] - The width of the banner for text alignment.
 * @param {Function} props.onClick - Callback function triggered when the banner is clicked.
 * @param {boolean} props.isOpen - Boolean to control if the banner is expanded or not.
 * @param {Function} props.onOpen - Callback function triggered when the banner opens (onClick).
 *
 * @returns {JSX.Element} The rendered component displaying the animated expandable banner.
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
  // Estimate text width based on length and font
  const textWidth = text.length * 1.1;
  const padding = 0.3; // Padding for the box surrounding the text
  const boxWidth = width + padding; // Box width with padding
  const boxHeight = 10; // Fixed box height for the banner

  console.log(isOpen); // Debugging open state
  console.log(onOpen); // Debugging onOpen callback

  const [open, setOpen] = useState(false); // State to track if the banner is opened
  const [hovered, setHovered] = useState(false); // State to track if the banner is hovered

  // Spring animation for scaling and box opacity based on the open state
  const { scale, box } = useSpring({
    scale: isOpen ? 1 : 0, // Scale the text group when open
    box: isOpen ? 0 : 1, // Hide the box when open
    config: { mass: 1, tension: 170, friction: 150 }, // Animation config
  });

  return (
    <group position={position} rotation={rotation}>
      {/* 3D Box Trigger */}
      <a.mesh
        scale={box} // Apply box animation scale
        position={[0, 10, -3]} // Position of the clickable box
        onPointerOver={() => setHovered(true)} // Set hover state when mouse enters
        onPointerOut={() => setHovered(false)} // Set hover state when mouse leaves
        onClick={() => {
          onClick(); // Execute parent onClick handler
          onOpen(); // Trigger parent onOpen handler
          setOpen(true); // Update internal state to open
          console.log(open); // Debugging open state
        }}
      >
        <boxGeometry args={[3, 3, 3]} /> {/* 3D box for interaction */}
        <meshStandardMaterial
          color={hovered ? "red" : "orange"} // Change color when hovered
          emissive={hovered ? "red" : "orange"} // Glowing effect on hover
        />
      </a.mesh>

      {/* Animated Text Group */}
      <a.group scale={scale}>
        {/* Invisible Box Border */}
        <mesh>
          <planeGeometry args={[boxWidth, boxHeight]} />
          <meshBasicMaterial transparent opacity={0} />{" "}
          {/* Invisible material */}
          <Edges scale={1.002} threshold={15}>
            {" "}
            {/* Border edges */}
            <lineBasicMaterial color="#000000" toneMapped={false} />{" "}
            {/* Black border color */}
          </Edges>
        </mesh>

        {/* Title Text */}
        <Text
          maxWidth={width}
          fontSize={1.6}
          color="black"
          anchorX="center"
          anchorY="center"
          textAlign="center"
          position={[0, 5, 1]} // Shift title slightly upward
          strokeWidth={0.5} // Stroke thickness for text
          strokeColor="black" // Stroke color for text
        >
          {title} {/* Display title text */}
        </Text>

        {/* Content Text */}
        <Text
          maxWidth={width}
          fontSize={1.0}
          color="black"
          anchorX="center"
          anchorY="center"
          textAlign="center"
          position={[0, 2.5, 1]} // Shift content text upward slightly
          strokeWidth={0.5} // Stroke thickness for text
          strokeColor="black" // Stroke color for text
        >
          {text} {/* Display content text */}
        </Text>
      </a.group>
    </group>
  );
}

export { GlowingTextBanner, SmallTextBanner };
