/**
 * @module Components
 * @category Utility
 * @description Various overlay rendering functions
 */
import { useState, useRef, useEffect } from "react";
import { useTrail, animated, useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@react-three/drei";
import { playSFX } from "../audioManager.js";

import ReactMarkdown from "react-markdown";
/**
 * Allows for a loading screen at the start of a page that waits for the assets to load
 * @function
 * @category Loading
 */
function Loader() {
  /**
   * Variable that tracks the current progress on asset loading on the page
   * @type {useProgress}
   */
  const { progress } = useProgress();

  return (
    /* The white background */
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        zIndex: 2000,
        color: "black",
        fontFamily: "sans-serif",
      }}
    >
      {/* The "Loading Experience" prompt for the user */}
      <div
        style={{
          fontSize: "2rem",
          marginBottom: "20px",
          letterSpacing: "0.2em",
          marginRight: "-0.2em", // Offsets the letter-spacing on the last letter
          textAlign: "center",
        }}
      >
        LOADING EXPERIENCE
      </div>

      {/* A % bar that tracks and displays the current load progress */}
      <div style={{ width: "200px", height: "2px", background: "#333" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#6a0dad",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* The numerical display of the load % */}
      <div style={{ marginTop: "10px", fontSize: "0.8rem", opacity: 0.5 }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}

/**
 * Allows for a custom start screen with a button to start the experience; assets load on click and the page is not revealed until assets fully loaded
 * @function
 * @category Loading
 * @deprecated use Loader() instead
 */
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

      <div
        id="hintText"
        style={{
          position: "absolute",
          bottom: "2%",
          padding: "20px 40px",
          fontSize: "15px",
          borderRadius: "1px",
          color: "white",
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        HINT: Find the glowing orbs and press them to learn more about me
      </div>
    </animated.div>
  );
}

/**
 * Displays a html/css overlay over the 3D scene; that is populated with JSON data as text; includes a return to scene and internal navigation buttons
 * @function
 * @category Overlay
 */

/**
 * Displays a html/css overlay over the 3D scene; that is populated with JSON data as text; includes a return to scene and internal navigation buttons
 * @function
 * @category Overlay
 */
function Overlay({ isActive, onClose, items = [] }) {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isActive, viewMode, selectedItem]);

  const overlaySpring = useSpring({
    opacity: isActive ? 1 : 0,
    config: { tension: 220, friction: 50 },
  });

  const [wipeStyle, wipeApi] = useSpring(() => ({
    transform: "translateX(100%)",
    config: { tension: 280, friction: 30 },
  }));

  const trail = useTrail(Array.isArray(items) ? items.length : 0, {
    from: { transform: "translateX(200%)", opacity: 0 },
    to: {
      transform: isActive ? "translateX(0%)" : "translateX(100%)",
      opacity: isActive ? 1 : 0,
    },
    config: { mass: 1, tension: 150, friction: 100, delay: 100 },
  });

  const handleOpenMarkdown = (item) => {
    playSFX("overlay_wipe", 0.3);

    wipeApi.start({
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(0%)" },
      onRest: async () => {
        setSelectedItem(item);
        setViewMode("detail");
        setIsLoadingContent(true);

        if (item.markdown) {
          try {
            const cleanPath = item.markdown.replace(/^\//, "");
            const filePath = item.markdown.startsWith("http")
              ? item.markdown
              : `${import.meta.env.BASE_URL}${cleanPath}`;

            const response = await fetch(filePath);
            if (!response.ok) throw new Error("Failed to load file");
            const text = await response.text();
            setMarkdownContent(text);
          } catch (error) {
            console.error("Error fetching markdown file:", error);
            setMarkdownContent(
              `${item.abstract}\n\n# WORK IN PROGRESS` ||
                "Error loading markdown file.",
            );
          }
        } else {
          setMarkdownContent(
            `${item.abstract}\n\n# WORK IN PROGRESS` || "# WORK IN PROGRESS",
          );
        }

        setIsLoadingContent(false);

        wipeApi.start({
          to: { transform: "translateX(-100%)" },
          onRest: () => wipeApi.set({ transform: "translateX(100%)" }),
        });
      },
    });
  };

  const handleBackToList = () => {
    playSFX("overlay_wipe", 0.3);

    wipeApi.start({
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(0%)" },
      onRest: () => {
        setViewMode("list");
        setSelectedItem(null);
        setMarkdownContent("");

        wipeApi.start({
          to: { transform: "translateX(-100%)" },
          onRest: () => wipeApi.set({ transform: "translateX(100%)" }),
        });
      },
    });
  };

  const handleCloseAll = () => {
    setViewMode("list");
    setSelectedItem(null);
    setMarkdownContent("");
    onClose();
  };

  // Compact, highly responsive typography mapping for markdown
  const markdownComponents = {
    h1: ({ children }) => (
      <h1
        style={{
          fontSize: "clamp(1.05rem, 0.85rem + 1vw, 1.6rem)",
          color: "#a855f7",
          marginTop: "1em",
          marginBottom: "0.5em",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "clamp(0.95rem, 0.75rem + 0.8vw, 1.3rem)",
          color: "#d8b4fe",
          marginTop: "0.8em",
          marginBottom: "0.4em",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: "clamp(0.85rem, 0.7rem + 0.5vw, 1.1rem)",
          color: "#e9d5ff",
          marginTop: "0.6em",
          marginBottom: "0.3em",
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        style={{
          fontSize: "clamp(0.75rem, 0.68rem + 0.35vw, 0.95rem)",
          lineHeight: "1.55",
          color: "#e2e8f0",
          marginBottom: "0.8em",
        }}
      >
        {children}
      </p>
    ),
    li: ({ children }) => (
      <li
        style={{
          fontSize: "clamp(0.75rem, 0.68rem + 0.35vw, 0.95rem)",
          lineHeight: "1.5",
          color: "#cbd5e1",
          marginBottom: "0.3em",
        }}
      >
        {children}
      </li>
    ),
    code: ({ children }) => (
      <code
        style={{
          fontSize: "clamp(0.7rem, 0.65rem + 0.25vw, 0.85rem)",
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: "2px 5px",
          borderRadius: "4px",
        }}
      >
        {children}
      </code>
    ),
  };

  return (
    <animated.div
      className="jsonOverlay"
      style={{
        pointerEvents: isActive ? "auto" : "none",
        opacity: overlaySpring.opacity,
        position: "fixed",
        top: "1dvh",
        left: "1vw",
        width: "98vw",
        height: "98dvh",
        border: "3px solid #6a0dad",
        borderRadius: "16px",
        backgroundColor: "rgba(15, 15, 15, 0.95)",
        overflow: "hidden",
        boxSizing: "border-box",
        backdropFilter: isActive ? "blur(12px)" : "none",
        WebkitBackdropFilter: isActive ? "blur(12px)" : "none",
        zIndex: 1000,
      }}
    >
      {/* Screen Wipe */}
      <animated.div
        style={{
          ...wipeStyle,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#6a0dad",
          zIndex: 50,
          pointerEvents: "none",
        }}
      />

      {/* Exit / Back Button (Smaller footprint on small screens) */}
      <div
        className="normalExitButton"
        onClick={() => {
          playSFX(viewMode === "detail" ? "exit_click" : "overlay_close", 0.3);
          if (viewMode === "detail") {
            handleBackToList();
          } else {
            handleCloseAll();
          }
        }}
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 100,
          fontSize: "clamp(0.75rem, 0.65rem + 0.35vw, 0.9rem)",
          padding: "5px 12px",
        }}
      >
        {viewMode === "detail" ? "← Back" : "Exit"}
      </div>

      {/* Inner Scroll Container */}
      <div
        ref={scrollContainerRef}
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          boxSizing: "border-box",
          paddingTop: "clamp(48px, 6vh, 70px)", // Dynamic height adjustment for mobile landscape
          paddingLeft: "clamp(8px, 1.5vw, 32px)", // Tight margins allow maximum card width
          paddingRight: "clamp(8px, 1.5vw, 32px)",
          paddingBottom: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {viewMode === "list" ? (
          trail.map((style, index) => {
            const item = items[index];

            return (
              <animated.div
                key={index}
                className="jsonOverlayItems"
                style={{
                  transform: style.transform,
                  width: "100%",
                  maxWidth: "1100px", // Allows cards to span wider on landscape/wide displays
                  boxSizing: "border-box",
                  padding: "clamp(10px, 2vw, 20px)", // Tightened interior padding
                }}
              >
                {/* Responsive Card Title */}
                <h2
                  style={{
                    fontSize: "clamp(0.95rem, 0.75rem + 0.75vw, 1.35rem)",
                    marginBottom: "6px",
                    lineHeight: "1.25",
                    wordWrap: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.title}
                </h2>

                <div style={{ marginBottom: "8px" }}>
                  {item.siteLink ? (
                    <a
                      className="goToComputerButton a_1"
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "clamp(0.7rem, 0.65rem + 0.3vw, 0.85rem)",
                        display: "inline-block",
                        padding: "4px 10px",
                        textDecoration: "none",
                      }}
                      href={item.siteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSFX("button_click", 0.3); // Optional: play a click SFX
                      }}
                    >
                      Go to
                    </a>
                  ) : (
                    <a
                      className="goToComputerButton a_1"
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "clamp(0.7rem, 0.65rem + 0.3vw, 0.85rem)",
                        display: "inline-block",
                        padding: "4px 10px",
                      }}
                      onClick={() => handleOpenMarkdown(item)}
                    >
                      {item.WIP ? "W I P" : "Read"}
                    </a>
                  )}
                </div>

                {/* Scaled Down Abstract Text */}
                <p
                  style={{
                    fontSize: "clamp(0.75rem, 0.68rem + 0.35vw, 0.925rem)",
                    lineHeight: "1.45",
                    opacity: 0.9,
                  }}
                >
                  {item.abstract}
                </p>
              </animated.div>
            );
          })
        ) : (
          /* Markdown Reader View */
          <div
            style={{
              color: "white",
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
            }}
          >
            <h1
              style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#6a0dad",
                marginBottom: "12px",
                fontSize: "clamp(1.1rem, 0.85rem + 1vw, 1.75rem)",
                lineHeight: "1.2",
                wordWrap: "break-word",
              }}
            >
              {selectedItem?.title}
            </h1>

            {selectedItem?.iframeUrl ? (
              <iframe
                src={`${import.meta.env.BASE_URL}${selectedItem.iframeUrl}`}
                title={selectedItem.title}
                style={{
                  width: "100%",
                  height: "65dvh",
                  border: "1px solid rgba(106, 13, 173, 0.4)",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              />
            ) : isLoadingContent ? (
              <p style={{ color: "#aaa", fontSize: "0.8rem" }}>
                Loading document...
              </p>
            ) : (
              <ReactMarkdown components={markdownComponents}>
                {markdownContent}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </animated.div>
  );
}

/**
 * Displays an audio toggle
 * @function
 * @category Button
 */
function AudioButton({ url }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  // This effect handles stopping the audio if the component unmounts
  // or if the URL changes (page navigation)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
    }

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio blocked:", err));
    }
    setPlaying(!playing);
  };

  return (
    <button
      style={{
        left: "20px",
        bottom: "20px",
        position: "fixed",
      }}
      onClick={toggleAudio}
      className="overlayButton"
    >
      {playing ? "🔊 Mute" : "🔈 Play Ambience"}
    </button>
  );
}

/**
 * Displays a headings toggle
 * @function
 * @category Button
 */
function HeadingsButton({ showHeadings, setShowHeadings }) {
  const toggleHeadings = () => {
    // This toggles the boolean to its opposite value
    setShowHeadings((prev) => !prev);
  };

  return (
    <button
      style={{
        right: "20px",
        bottom: "20px",
        position: "fixed",
      }}
      onClick={toggleHeadings}
      className="overlayButton"
    >
      {showHeadings ? "Hide Headings" : "Show Headings"}
    </button>
  );
}

/**
 * Displays a documentation navigation button
 * @function
 * @category Button
 */

/*
function DocumentationButton() {
  const navigate = useNavigate();

  return (
    <button
      style={{
        left: "20px",
        top: "20px",
        position: "fixed",
      }}
      onClick={() => {
        navigate("/Documentation");
      }}
      className="overlayButton"
    >
      Documentation
    </button>
  );
}*/

function DocumentationButton({ onClick }) {
  return (
    <button
      style={{
        left: "20px",
        top: "20px",
        position: "fixed",
      }}
      onClick={onClick}
      className="overlayButton"
    >
      Documentation
    </button>
  );
}

/**
 * Displays a resume navigation button
 * @function
 * @category Button
 */
function ResumeButton() {
  return (
    <a
      style={{
        right: "20px",
        top: "20px",
        position: "fixed",
      }}
      className="overlayButton"
      href={`${import.meta.env.BASE_URL}Resume.pdf`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>
  );
}

export {
  StartScreen,
  Overlay,
  Loader,
  AudioButton,
  HeadingsButton,
  ResumeButton,
  DocumentationButton,
};
