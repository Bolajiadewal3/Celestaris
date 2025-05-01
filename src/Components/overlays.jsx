import { useState } from "react";
import { useTrail, animated, useSpring } from "@react-spring/web";

function StartScreen({ onStart, visible }) {
  const styles = useSpring({
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    config: { duration: 500 },
  });

  return (
    <animated.div
      style={{
        ...styles,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <button
        id="startButton"
        style={{
          padding: "20px 40px",
          fontSize: "42px",
          fontWeight: "bold",
          borderRadius: "12px",

          fontFamily: "Orbitron, sans-serif",
        }}
        onClick={onStart}
      >
        By MOBOLAJI ADEWALE
      </button>
    </animated.div>
  );
}

function Overlay({ isActive, onClose, items = [] }) {
  const [hovered, setHovered] = useState(false);

  const overlaySpring = useSpring({
    opacity: isActive ? 1 : 0,
    config: { tension: 220, friction: 50 },
  });

  const trail = useTrail(Array.isArray(items) ? items.length : 0, {
    from: { transform: "translateX(200%)", opacity: 0 },
    to: {
      transform: isActive ? "translateX(0%)" : "translateX(100%)",
      opacity: isActive ? 1 : 0,
    },
    config: { mass: 1, tension: 150, friction: 100, delay: 100 },
  });

  return (
    <animated.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.9)",
        pointerEvents: isActive ? "auto" : "none",
        opacity: overlaySpring.opacity,
        zIndex: 10,
        display: "flex",
        justifyContent: "flexStart", // Center horizontally
        alignItems: "center",
        flexDirection: "column", // Center vertically
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <div
        className="normalExitButton"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          color: "white",
          fontSize: "30px",
          fontWeight: "bold",
          zIndex: 20,
        }}
        onClick={onClose}
      >
        Exit
      </div>

      {trail.map((style, index) => (
        <animated.div
          key={index}
          style={{
            ...style,
            width: "80%",
            height: "auto",
            background: "#222",
            color: "#fff",
            padding: "20px",
            marginBottom: "15px",
            marginTop: "15px",
            borderRadius: "12px",
            transform: style.transform,
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
            {items[index].title}
          </h2>
          <a href={
                items[index].website
                ? items[index].website // External website
                : `${import.meta.env.BASE_URL}${items[index].siteLink}` // Internal page
            
            }>Go To</a>
          <p>{items[index].abstract}</p>
        </animated.div>
      ))}
    </animated.div>
  );
}

export { StartScreen, Overlay };
