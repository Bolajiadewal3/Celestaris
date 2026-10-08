/**
 * @module Components
 * @category Utility
 * @description Provides a toast notification component for displaying newly unlocked achievements.
 */


/**
 * Displays a toast notification when a new achievement is unlocked.
 */
export function AchievementToast() {
  const discoveredNodes = useAchievementStore((state) => state.discoveredNodes);
  const [latestToast, setLatestToast] = useState(null);

  useEffect(() => {
    if (discoveredNodes.length === 0) return;

    const latestId = discoveredNodes[discoveredNodes.length - 1];
    setLatestToast(latestId);

    // Hide toast after 4 seconds
    const timer = setTimeout(() => {
      setLatestToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [discoveredNodes]);

  if (!latestToast) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "rgba(10, 12, 22, 0.9)",
        border: "1px solid #00ffcc",
        boxShadow: "0 0 15px rgba(0, 255, 204, 0.3)",
        padding: "10px 20px",
        borderRadius: "8px",
        color: "#fff",
        fontFamily: "monospace",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backdropFilter: "blur(8px)",
        animation: "slideDown 0.3s ease-out",
      }}
    >
      <span style={{ color: "#00ffcc", fontSize: "16px" }}>⚡</span>
      <div>
        <div style={{ fontSize: "10px", color: "#8c9ba5" }}>
          DATAPOINT UNLOCKED
        </div>
        <div style={{ fontSize: "13px", fontWeight: "bold" }}>
          Node: {latestToast}
        </div>
      </div>
    </div>
  );
}
