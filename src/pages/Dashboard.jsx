import React, { useEffect, useState } from "react";
import { initial } from "../data";
import riverImg from "../assets/river.jpg";

export default function Dashboard() {
  const [weather, setWeather] = useState(initial.weather);
  const [waterQuality, setWaterQuality] = useState(initial.waterQuality);
  const [eco, setEco] = useState({
    biodiversityIndex: 72,
    invasiveSpecies: 3,
    suggestions: ["Reduce runoff", "Plant native trees"],
  });
  const [cleanup, setCleanup] = useState({ wasteKg: 120, humansSaved: 2 });

  const [waterLevel, setWaterLevel] = useState(42);
  const [floodChance, setFloodChance] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWeather({
        temp: 22 + Math.floor(Math.random() * 12),
        humidity: 40 + Math.floor(Math.random() * 50),
        condition: ["Clear", "Cloudy", "Rain", "Windy", "Stormy"][
          Math.floor(Math.random() * 5)
        ],
        windKmph: 5 + Math.floor(Math.random() * 20),
        rainChance: Math.floor(Math.random() * 100),
      });

      setWaterQuality((wq) =>
        wq.map((w) => ({
          ...w,
          ppm: Number((w.ppm * (0.9 + Math.random() * 0.2)).toFixed(2)),
        }))
      );

      setEco((prev) => ({
        ...prev,
        biodiversityIndex: Math.max(
          40,
          Math.min(95, prev.biodiversityIndex + Math.floor(Math.random() * 5 - 2))
        ),
        invasiveSpecies:
          Math.max(0, prev.invasiveSpecies + (Math.random() > 0.8 ? 1 : 0)),
      }));

      setCleanup((prev) => ({
        wasteKg: Math.max(0, prev.wasteKg + Math.floor(Math.random() * 10 - 3)),
        humansSaved: prev.humansSaved + (Math.random() > 0.95 ? 1 : 0),
      }));

      setWaterLevel((prev) => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 5 - 2))));

      setFloodChance(Math.min(95, Math.round(waterLevel * 0.9 + Math.random() * 15)));
    }, 4500);

    return () => clearInterval(t);
  }, [waterLevel]); 

  return (
    <div className="page-root inner-page">
      <h2>Dashboard Overview</h2>
      <div className="grid-2x2">
        <div className="card">
          <h3>Live Weather</h3>
          <div className="stat-row">
            <div className="big">{weather.temp}°C</div>
            <div>
              <div className="muted">Condition</div>
              <div style={{ fontWeight: 700 }}>{weather.condition}</div>
              <div className="muted">Humidity: {weather.humidity}%</div>
              <div className="muted">
                Wind: {weather.windKmph} km/h • Rain chance: {weather.rainChance}%
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Water Level & Flood Prediction</h3>
          <div className="flood-block">
            <div className="flood-title">Flood Prediction</div>
            <div className="flood-row">
              <div className="flood-meter">
                <div
                  className={`flood-fill ${
                    floodChance > 70 ? "danger" : floodChance > 40 ? "warning" : "safe"
                  }`}
                  style={{ width: `${floodChance}%` }}
                />
              </div>
              <div className="flood-text">{floodChance}% chance of localized flooding</div>
            </div>
            <div className="muted">Based on simulated water level: {waterLevel}%</div>
            <div style={{ marginTop: 10 }}>
              <label className="small muted">Simulate water level:</label>
              <input
                type="range"
                min="0"
                max="100"
                value={waterLevel}
                onChange={(e) => setWaterLevel(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Ecological Assessment</h3>
          <p className="muted">Biodiversity Index</p>
          <div className="eco-meter">{eco.biodiversityIndex}%</div>
          <p className="muted">
            Invasive species: <strong>{eco.invasiveSpecies}</strong>
          </p>
          <div>
            <p style={{ fontWeight: 700 }}>Suggestions</p>
            <ul>
              {eco.suggestions.map((s, i) => (
                <li key={i} className="muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <h3>Cleaning & Rescue (Today)</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="muted">Waste cleaned</div>
              <div className="big">{cleanup.wasteKg} kg</div>
            </div>
            <div>
              <div className="muted">Humans aided</div>
              <div className="big">{cleanup.humansSaved}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
