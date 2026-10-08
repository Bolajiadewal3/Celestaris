/**
 * @category Utility
 * @description Provides controls for managing the environment settings.
 */
import { useEnvironmentStore } from "../Store/useEnvironmentStore";


/**
 * Renders a UI panel for controlling the environment settings, including time of day and weather.
 * @category Environment
 */
export function EnvironmentControls() {
  const {
    manualTime,
    setManualTime,
    setOverriding,
    weather,
    setWeather,
    setWeatherMode,
  } = useEnvironmentStore();

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 20,
        zIndex: 100,
        background: "rgba(10, 12, 22, 0.85)",
        backdropFilter: "blur(8px)",
        padding: "15px 20px",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#fff",
        fontFamily: "sans-serif",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: "14px",
        }}
      >
        <span style={{ fontWeight: 600 }}>Time of Day</span>
        <span style={{ color: "#70a1ff" }}>{manualTime.toFixed(1)}:00</span>
      </div>

      <input
        type="range"
        min="0"
        max="24"
        step="0.5"
        value={manualTime}
        onMouseDown={() => setOverriding(true)}
        onChange={(e) => setManualTime(Number.parseFloat(e.target.value))}
        style={{
          display: "block",
          width: "180px",
          marginBottom: 12,
          cursor: "pointer",
        }}
      />

      {/* Primary Action Buttons Row */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <button
          onClick={() => setOverriding(false)}
          style={{
            flex: 1,
            padding: "6px 10px",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Auto Cycle
        </button>

        <button
          onClick={() => setWeather(weather === "rain" ? "clear" : "rain")}
          style={{
            flex: 1,
            padding: "6px 10px",
            background:
              weather === "rain" ? "#70a1ff" : "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "6px",
            color: weather === "rain" ? "#000" : "#fff",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: weather === "rain" ? 600 : 400,
          }}
        >
          {weather === "rain" ? "🌧️ Rain" : "☀️ Clear"}
        </button>
      </div>

      {/* Full-width Dynamic Weather Reset Button */}
      <button
        onClick={() => {
          setWeatherMode("auto");
          setWeather("clear"); 
        }}
        style={{
          width: "100%",
          padding: "6px 10px",
          background: "rgba(112, 161, 255, 0.15)",
          border: "1px solid rgba(112, 161, 255, 0.3)",
          borderRadius: "6px",
          color: "#70a1ff",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        🔄 Reset to Dynamic Weather
      </button>
    </div>
  );
}
