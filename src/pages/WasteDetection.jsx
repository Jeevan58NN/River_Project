import React, { useState, useEffect } from "react";
import "./WasteDetection.css";



const WasteDetection = () => {
  const [droneStatus, setDroneStatus] = useState("Idle");
  const [detections, setDetections] = useState([]);
  const [missionStarted, setMissionStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (missionStarted) {
      setDroneStatus("In-flight");
      interval = setInterval(() => {
        const newDetection = {
          id: detections.length + 1,
          timestamp: new Date().toLocaleTimeString(),
          location: {
            lat: (Math.random() * 0.1 + 37.77).toFixed(4), 
            lng: (Math.random() * 0.1 - 122.42).toFixed(4), 
          },
        };
        setDroneStatus("Detecting Waste");
        setDetections((prev) => [...prev, newDetection]);
      }, 3000);

      setTimeout(() => {
        clearInterval(interval);
        setDroneStatus("Idle");
        setMissionStarted(false);
      }, 16000);
    }
    return () => clearInterval(interval);
  }, [missionStarted]);

  const startMission = () => {
    setMissionStarted(true);
    setDetections([]);
  };

  return (
    <div className="waste-detection-container">
      <div className="top-section">
        <button onClick={startMission} disabled={missionStarted}>
          Start Waste Detection Mission
        </button>
        <div className="drone-status">Drone Status: {droneStatus}</div>
      </div>

      <div className="middle-section">
        <div className="map-section">
          <h3>Drone Map</h3>
          <div className="map-placeholder">
            {detections.map((d) => (
              <div
                key={d.id}
                className="marker"
                style={{
                  top: `${Math.random() * 90}%`,
                  left: `${Math.random() * 90}%`,
                }}
                title={`Detection at ${d.timestamp}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="video-section">
          <h3>Video Feed</h3>
          <div className="video-placeholder">No Feed Yet</div>
        </div>
      </div>

      <div className="bottom-section">
        <h3>Detection Logs</h3>
        <ul>
          {detections.map((d) => (
            <li key={d.id}>
              {d.timestamp} → Lat: {d.location.lat}, Lng: {d.location.lng}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WasteDetection;
