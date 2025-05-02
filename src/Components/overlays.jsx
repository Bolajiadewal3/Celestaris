import { useState } from "react";
import { useTrail, animated, useSpring } from "@react-spring/web";

/**
 * StartScreen component renders the initial start screen overlay with a button and hint text.
 * It fades in when `visible` is true, and displays a button to begin the experience.
 *
 * @param {Object} props - The props for the StartScreen component.
 * @param {Function} props.onStart - Callback function triggered when the start button is clicked.
 * @param {boolean} props.visible - Controls whether the start screen is visible or not.
 *
 * @returns {JSX.Element} The rendered StartScreen component.
 */
function StartScreen({ onStart, visible }) {
  // Spring animation to fade in and out the start screen with a smooth transition.
  const styles = useSpring({
    opacity: visible ? 1 : 0, // Fades in when visible is true.
    pointerEvents: visible ? "auto" : "none", // Disables pointer events when hidden.
    config: { duration: 500 }, // Sets the duration of the fade effect to 500ms.
  });

  return (
    <animated.div
      style={{
        ...styles, // Apply animated styles for fade-in/fade-out.
        position: "absolute", // Positions the screen overlay absolutely.
        top: 0, // Aligns the top edge of the screen.
        left: 0, // Aligns the left edge of the screen.
        width: "100%", // Ensures the overlay takes the full width of the viewport.
        height: "100%", // Ensures the overlay takes the full height of the viewport.
        backgroundColor: "black", // Sets the background color to black.
        display: "flex", // Uses flexbox to center content.
        justifyContent: "center", // Centers the content horizontally.
        alignItems: "center", // Centers the content vertically.
        zIndex: 20, // Ensures the start screen appears on top of other content.
      }}
    >
      {/* Start button triggers the onStart function when clicked */}
      <button
        id="startButton"
        style={{
          padding: "20px 40px", // Padding around the button text.
          fontSize: "42px", // Large font size for the button text.
          fontWeight: "bold", // Makes the button text bold.
          borderRadius: "12px", // Rounds the corners of the button.
          fontFamily: "Orbitron, sans-serif", // Sets a specific font for the button text.
        }}
        onClick={onStart} // Calls onStart when the button is clicked.
      >
        By MOBOLAJI ADEWALE
      </button>

      {/* Hint text at the bottom of the screen providing instructions */}
      <div
        id="hintText"
        style={{
          position: "absolute", // Positions the hint text absolutely.
          bottom: "2%", // Positions the hint text near the bottom of the screen.
          padding: "20px 40px", // Adds padding around the hint text.
          fontSize: "15px", // Sets the font size for the hint text.
          borderRadius: "1px", // Applies a small radius to the hint text container.
          color: "white", // Sets the color of the hint text to white.
          fontFamily: "Orbitron, sans-serif", // Sets a specific font for the hint text.
        }}
      >
        HINT: Find the glowing orbs and press them to learn more about me
      </div>
    </animated.div>
  );
}

/**
 * Overlay component renders a full-screen overlay with items that animate into view when activated.
 * It includes a close button and displays a list of items passed via props, each with a title, link, and abstract.
 *
 * @param {Object} props - The props for the Overlay component.
 * @param {boolean} props.isActive - Determines whether the overlay is visible or hidden.
 * @param {Function} props.onClose - Callback function triggered when the close button is clicked.
 * @param {Array} [props.items=[]] - An array of items to display in the overlay. Each item should contain:
 *    - `title`: The title of the item.
 *    - `website`: A URL for external links (optional).
 *    - `siteLink`: A relative URL for internal links (optional).
 *    - `abstract`: A short description or summary of the item.
 *
 * @returns {JSX.Element} The rendered Overlay component.
 */
function Overlay({ isActive, onClose, items = [] }) {
  // Local state to track hover state for individual items (not used in this version).
  const [hovered, setHovered] = useState(false);

  // Spring animation for the overlay opacity.
  const overlaySpring = useSpring({
    opacity: isActive ? 1 : 0, // Fade in/out based on isActive.
    config: { tension: 220, friction: 50 }, // Configures the animation's tension and friction.
  });

  // Trail animation for the list items (each item animates individually).
  const trail = useTrail(Array.isArray(items) ? items.length : 0, {
    from: { transform: "translateX(200%)", opacity: 0 }, // Initial state (items off-screen).
    to: {
      transform: isActive ? "translateX(0%)" : "translateX(100%)", // Moves the items into view when active.
      opacity: isActive ? 1 : 0, // Fades in/out based on isActive.
    },
    config: { mass: 1, tension: 150, friction: 100, delay: 100 }, // Configures the animation's physical properties.
  });

  return (
    <animated.div
      style={{
        position: "absolute", // Positions the overlay over the entire screen.
        top: 0,
        left: 0,
        width: "100%", // Takes up full width.
        height: "100%", // Takes up full height.
        background: "rgba(0, 0, 0, 0.9)", // Semi-transparent black background.
        pointerEvents: isActive ? "auto" : "none", // Disables pointer events when not active.
        opacity: overlaySpring.opacity, // Applies the spring opacity animation.
        zIndex: 10, // Ensures overlay is on top.
        display: "flex", // Uses flexbox for centering content.
        justifyContent: "flexStart", // Aligns items to the start of the container.
        alignItems: "center", // Centers content vertically.
        flexDirection: "column", // Stacks items vertically.
        overflowX: "hidden", // Prevents horizontal overflow.
        overflowY: "auto", // Allows vertical scrolling.
      }}
    >
      {/* Close button at the top left corner */}
      <div
        className="normalExitButton"
        style={{
          position: "fixed", // Fixed position in the viewport.
          top: "20px", // 20px from the top of the viewport.
          left: "20px", // 20px from the left of the viewport.
          color: "white", // White text color for contrast.
          fontSize: "30px", // Larger font size for visibility.
          fontWeight: "bold", // Bold font for emphasis.
          zIndex: 20, // Ensures the exit button is on top of other content.
        }}
        onClick={onClose} // Triggers onClose when the button is clicked.
      >
        Exit
      </div>

      {/* Render the items using the trail animation */}
      {trail.map((style, index) => (
        <animated.div
          key={index}
          style={{
            ...style, // Applies the animation styles.
            width: "80%", // Sets the width of each item.
            height: "auto", // Auto-adjusts height.
            background: "#222", // Dark background for the items.
            color: "#fff", // White text color for readability.
            padding: "20px", // Padding inside each item.
            marginBottom: "15px", // Margin between items.
            marginTop: "15px", // Margin at the top of each item.
            borderRadius: "12px", // Rounded corners.
          }}
        >
          {/* Title of the item */}
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
            {items[index].title}
          </h2>

          {/* Link to the item's external or internal page */}
          <a
            href={
              items[index].website
                ? items[index].website // External link if website is provided.
                : `${import.meta.env.BASE_URL}${items[index].siteLink}` // Internal link using BASE_URL.
            }
          >
            Go To
          </a>

          {/* Abstract or description of the item */}
          <p>{items[index].abstract}</p>
        </animated.div>
      ))}
    </animated.div>
  );
}

export { StartScreen, Overlay };
