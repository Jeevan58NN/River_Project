import React, { useState } from "react";
import "./HumanDetectionPage.css";

const HumanDetectionPage = () => {
  const [status, setStatus] = useState("idle");
  const [logs, setLogs] = useState([]);
  const [humanMarkers, setHumanMarkers] = useState([]);

  const handleMapClick = (e) => {
    if (status !== "idle") return; 

    const mapBounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - mapBounds.left;
    const y = e.clientY - mapBounds.top;

    const leftPercent = (x / mapBounds.width) * 100;
    const topPercent = (y / mapBounds.height) * 100;

    const newMarker = {
      id: humanMarkers.length + 1,
      location: { x: leftPercent.toFixed(2), y: topPercent.toFixed(2) },
    };

    setHumanMarkers((prev) => [...prev, newMarker]);
  };

  const startMission = () => {
    if (humanMarkers.length === 0) {
      alert("Please select points on the map before starting the mission!");
      return;
    }

    setStatus("in-flight");

    setTimeout(() => {
      const detected = humanMarkers.map((marker, index) => ({
        ...marker,
        timestamp: new Date().toLocaleTimeString(),
        confidence: (Math.random() * 0.5 + 0.5).toFixed(2),
        id: index + 1,
      }));

      setLogs(detected);
      setHumanMarkers(detected);
      setStatus("tracking");
    }, 2000);
  };

  return (
    <div className="human-detection-container">
      <div className="human-top-section">
        <button onClick={startMission} disabled={status !== "idle"}>
          Start Human Detection Mission
        </button>
        <span className={`human-status ${status}`}>
          Status: <strong>{status}</strong>
        </span>
      </div>

      <div className="human-middle-section">
        <div className="human-map-section">
          <h3>Map</h3>
          <div
            className="human-map-placeholder"
            onClick={handleMapClick}
            style={{
              backgroundImage: `url(${"./river_map.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {humanMarkers.map((marker) => (
              <div
                key={marker.id}
                className="human-marker"
                style={{
                  top: `${marker.location.y}%`,
                  left: `${marker.location.x}%`,
                }}
                title={
                  marker.confidence
                    ? `Confidence: ${marker.confidence}`
                    : "Selected Point"
                }
              ></div>
            ))}
          </div>
        </div>

        <div className="human-video-section">
          <h3>Video Feed</h3>
          <div className="human-video-placeholder">
            Video Feed Placeholder
          </div>
        </div>
      </div>

      <div className="human-bottom-section">
        <h3>Human Detection Logs</h3>
        {logs.length === 0 ? (
          <p>No detections yet. Select points and then start mission.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Map Position (x%, y%)</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.timestamp}</td>
                  <td>
                    {log.location.x}%, {log.location.y}%
                  </td>
                  <td>{log.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HumanDetectionPage;
