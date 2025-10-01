import React, { useState } from "react";
import "./HumanDetectionPage.css";

const HumanDetectionPage = () => {
  const [status, setStatus] = useState("idle");
  const [logs, setLogs] = useState([]);
  const [humanMarkers, setHumanMarkers] = useState([]);

  const startMission = () => {
    setStatus("in-flight");

    setTimeout(() => {
      const newHuman = {
        id: logs.length + 1,
        timestamp: new Date().toLocaleTimeString(),
        location: { lat: 28.6139, lng: 77.2090 }, 
        confidence: (Math.random() * 0.5 + 0.5).toFixed(2),
      };
      setHumanMarkers((prev) => [...prev, newHuman]);
      setLogs((prev) => [...prev, newHuman]);
      setStatus("tracking");
    }, 3000);
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
          <div className="human-map-placeholder">
            {humanMarkers.map((marker) => (
              <div
                key={marker.id}
                className="human-marker"
                style={{
                  top: `${Math.random() * 80 + 10}%`, 
                  left: `${Math.random() * 80 + 10}%`,
                }}
                title={`Confidence: ${marker.confidence}`}
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
          <p>No humans detected yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Location</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.timestamp}</td>
                  <td>
                    {log.location.lat.toFixed(4)}, {log.location.lng.toFixed(4)}
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
