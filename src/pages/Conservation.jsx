import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    temperature: 0,
    tds: 0,
    turbidity: 0,
    ph: 0,
    stale: true,
  });

  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/get_data");
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <header className="topbar">
        <div className="top-buttons">
          <button className="btn-top" onClick={() => navigate("/login")}>
            🔑 Login
          </button>
          <button className="btn-top" onClick={() => navigate("/live-feed")}>
            🚁 Live Drone Feed
          </button>
        </div>

        <h1>🌊 Water Quality Monitoring Dashboard</h1>
        <div
          className={`connection-status ${
            data.stale ? "disconnected" : "connected"
          }`}
        >
          {data.stale ? "🔴 Disconnected" : "🟢 Connected"}
        </div>
      </header>

     <div className="sensor-grid">
        <div className="sensor-card">
          <h2>🌡️ Temperature</h2>
          <p>{data.temperature} °C</p>
        </div>
        <div className="sensor-card">
          <h2>💧 TDS</h2>
          <p>{data.tds} ppm</p>
        </div>
        <div className="sensor-card">
          <h2>🌫️ Turbidity</h2>
          <p>{data.turbidity} NTU</p>
        </div>
        <div className="sensor-card">
          <h2>⚗️ pH Level</h2>
          <p>{data.ph}</p>
        </div>
      </div>

      <div className="vertical-section">
        <div className="vertical-card">
          <h2>🐟 Fish Health & Survival</h2>
          <p>Based on current water quality, fish survival rate is healthy ✅</p>
        </div>
        <div className="vertical-card">
          <h2>🌱 Aquatic Life Sustainability</h2>
          <p>Conditions are suitable for aquatic plants and microorganisms.</p>
        </div>
      </div>

      <footer className="footer">
        Last updated: {lastUpdated || "Loading..."}
      </footer>
    </div>
  );
};

export default Dashboard;
