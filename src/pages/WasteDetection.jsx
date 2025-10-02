import React, { useState, useEffect } from "react";
import "./WasteDetection.css";

const WasteDetection = () => {
  const [droneStatus, setDroneStatus] = useState("Idle");
  const [detections, setDetections] = useState([]);
  const [missionStarted, setMissionStarted] = useState(false);
  const [path, setPath] = useState([]);

  useEffect(() => {
    let interval;
    if (missionStarted && path.length > 0) {
      setDroneStatus("In-flight");

      let step = 0;
      interval = setInterval(() => {
        if (step < path.length) {
          const newDetection = {
            id: step + 1,
            timestamp: new Date().toLocaleTimeString(),
            location: path[step],
          };
          setDroneStatus("Detecting Waste");
          setDetections((prev) => [...prev, newDetection]);
          step++;
        } else {
          clearInterval(interval);
          setDroneStatus("Idle");
          setMissionStarted(false);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [missionStarted, path]);

  const startMission = () => {
    if (path.length === 0) {
      alert("Click on the map to define a path first!");
      return;
    }
    setMissionStarted(true);
    setDetections([]);
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const lat = (37.77 + (yPercent / 100) * 0.05).toFixed(4);
    const lng = (-122.42 + (xPercent / 100) * 0.05).toFixed(4);

    setPath((prev) => [
      ...prev,
      { lat: parseFloat(lat), lng: parseFloat(lng), x: xPercent, y: yPercent },
    ]);
  };

  return (
    <div className="waste-detection-container">
      <div className="top-section">
        <button onClick={startMission} disabled={missionStarted}>
          Start Waste Detection Mission
        </button>
        <div
          className={`drone-status ${
            droneStatus === "Idle"
              ? "idle"
              : droneStatus === "Detecting Waste"
              ? "detecting"
              : ""
          }`}
        >
          Drone Status: {droneStatus}
        </div>
      </div>

      <div className="middle-section">
        <div className="map-section">
          <h3>Drone Map (Click to set path)</h3>
          <div className="map-placeholder" onClick={handleMapClick}>
            <img
              src="/river_map.jpg" 
              alt="Drone Map"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {path.map((point, idx) => (
              <div
                key={idx}
                className="marker"
                style={{
                  top: `${point.y}%`,
                  left: `${point.x}%`,
                  transform: "translate(-50%, -50%)",
                }}
                title={`Lat: ${point.lat}, Lng: ${point.lng}`}
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
