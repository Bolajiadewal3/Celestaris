/**
 * @module Components
 * @category Utility
 * @description Provides a modal component that appears when the user has fully unlocked all achievements, offering access to exclusive content.
 */


import { useAchievementStore } from "../Store/useAchievementStore";

/**
 * Renders a modal that appears when the user has fully unlocked all achievements, providing a link to exclusive content.
 * @param root0 
 * @param root0.isOpen 
 * @param root0.onClose 
 */
export function GrandUnlockModal({ isOpen, onClose }) {
  const isFullyUnlocked = useAchievementStore((state) => state.isFullyUnlocked);

  if (!isFullyUnlocked || !isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        backgroundColor: "rgba(5, 7, 15, 0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.4s ease-out",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "480px",
          background:
            "linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(10, 12, 22, 0.98))",
          border: "1px solid #00ffcc",
          boxShadow: "0 0 40px rgba(0, 255, 204, 0.25)",
          borderRadius: "16px",
          padding: "30px",
          color: "#fff",
          fontFamily: "monospace",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "transparent",
            border: "none",
            color: "#8c9ba5",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <div style={{ fontSize: "28px", marginBottom: "15px" }}>🎧⚡</div>

        <div
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#00ffcc",
            marginBottom: "8px",
          }}
        >
          SYSTEM OVERRIDE // 100% UNLOCKED
        </div>

        <h2
          style={{ fontSize: "20px", margin: "0 0 15px 0", fontWeight: "bold" }}
        >
          VIP Access: LUX Vault
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#a0aec0",
            lineHeight: "1.6",
            marginBottom: "25px",
          }}
        >
          You've mapped all network datanodes across Celestaris. Your decryption
          key has verified access to the unreleased music vault on{" "}
          <span style={{ color: "#fff" }}>aremu.art</span>.
        </p>

        <a
          href="https://aremu.art/?tab=music&unlock=phantom"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            padding: "12px",
            background: "#00ffcc",
            color: "#05070f",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            boxShadow: "0 4px 20px rgba(0, 255, 204, 0.4)",
            transition: "transform 0.2s ease",
            boxSizing: "border-box",
          }}
        >
          LAUNCH UNRELEASED ALBUM PORTAL ↗
        </a>
      </div>
    </div>
  );
}
