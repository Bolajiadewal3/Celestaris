
/**
 * @category Utility
 * @description Provides a UI component for tracking achievements in the application.
 */
import { useAchievementStore } from "../Store/useAchievementStore";

/**
 * Displays the achievement tracker UI, showing the number of discovered nodes and total nodes.
 */
export function AchievementTracker() {
  const discoveredCount = useAchievementStore(
    (state) => state.discoveredNodes.length,
  );
  const totalNodes = useAchievementStore((state) => state.totalNodes);
  const isFullyUnlocked = useAchievementStore((state) => state.isFullyUnlocked);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        left: "20px", // Adjust to sit opposite or alongside your AudioButton
        zIndex: 10,
        fontFamily: "monospace",
        color: isFullyUnlocked ? "#00ffcc" : "white",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "8px 16px",
        border: `1px solid ${isFullyUnlocked ? "#00ffcc" : "rgba(255, 255, 255, 0.2)"}`,
        borderRadius: "4px",
        backdropFilter: "blur(8px)",
        pointerEvents: "none", // Prevents the UI from blocking clicks intended for the Canvas
        transition: "all 0.3s ease",
      }}
    >
      {isFullyUnlocked
        ? "100% // NETWORK UNLOCKED"
        : `DATAPOINTS: ${discoveredCount}/${totalNodes}`}
    </div>
  );
}
