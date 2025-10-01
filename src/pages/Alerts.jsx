import React, { useEffect, useState } from "react";
import { initial } from "../data";

export default function Alerts() {
  const [detections, setDetections] = useState(initial.detections);
  const [waterLevel, setWaterLevel] = useState(initial.waterLevelPercent || 42);
  const [weather, setWeather] = useState(initial.weather);
  const [quality, setQuality] = useState(initial.waterQuality);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      setDetections((prev) => {
        if (Math.random() > 0.75) {
          const id = Date.now();
          const type = Math.random() > 0.5 ? "Human" : "Waste";
          const d = {
            id,
            type,
            coords: { lat: 23 + Math.random() * 0.06, lng: 72.5 + Math.random() * 0.06 },
            time: new Date().toLocaleTimeString()
          };
          setAlerts((a) => [{ id, cat: "Detection", msg: `${type} detected at ${d.coords.lat.toFixed(3)}, ${d.coords.lng.toFixed(3)}`, time: d.time }, ...a].slice(0, 30));
          return [d, ...prev].slice(0, 40);
        }
        return prev;
      });

      setWaterLevel((prev) => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 11 - 5))));
      setWeather({ temp: 22 + Math.floor(Math.random() * 12), humidity: 40 + Math.floor(Math.random() * 50), condition: ["Clear", "Cloudy", "Rain", "Stormy"][Math.floor(Math.random() * 4)] });
      setQuality((q) => q.map((item) => ({ ...item, ppm: Number((item.ppm * (0.95 + Math.random() * 0.1)).toFixed(2)) })));

      const poor = quality.find((p) => (p.safeMax != null && p.ppm > p.safeMax) || (p.safeMin != null && p.ppm < p.safeMin));
      if (poor) {
        setAlerts((a) => [{ id: Date.now(), cat: "Water Quality", msg: `${poor.toxin} out of safe range (${poor.ppm})`, time: new Date().toLocaleTimeString() }, ...a].slice(0, 30));
      }

      if (waterLevel > 75) {
        setAlerts((a) => [{ id: Date.now(), cat: "Water Level", msg: `Water level critical: ${waterLevel}%`, time: new Date().toLocaleTimeString() }, ...a].slice(0, 30));
      }

      if (weather.condition === "Stormy" || weather.condition === "Rain") {
        setAlerts((a) => [{ id: Date.now(), cat: "Weather", msg: `Poor weather: ${weather.condition}`, time: new Date().toLocaleTimeString() }, ...a].slice(0, 30));
      }
    }, 4200);
    return () => clearInterval(t);
  }, [quality, weather, waterLevel]);

  const detectionAlerts = alerts.filter((a) => a.cat === "Detection");
  const waterQualityAlerts = alerts.filter((a) => a.cat === "Water Quality");
  const weatherAlerts = alerts.filter((a) => a.cat === "Weather");
  const levelAlerts = alerts.filter((a) => a.cat === "Water Level");

  return (
    <div className="page-root inner-page">
      <h2>All Alerts</h2>

      <div className="vert-blocks">
        <div className="card block">
          <div className="block-head"><h3>Detections (Human / Waste)</h3><div className="muted">{detectionAlerts.length} items</div></div>
          <div className="alert-stack">{detectionAlerts.length === 0 ? <div className="muted">No detection alerts</div> : detectionAlerts.map((a) => <div key={a.id} className="alert info"><div><div className="alert-msg">{a.msg}</div><div className="muted">{a.time}</div></div></div>)}</div>
        </div>

        <div className="card block">
          <div className="block-head"><h3>Poor Water Quality</h3><div className="muted">{waterQualityAlerts.length} items</div></div>
          <div className="alert-stack">{waterQualityAlerts.length === 0 ? <div className="muted">No water quality alerts</div> : waterQualityAlerts.map((a) => <div key={a.id} className="alert warning"><div><div className="alert-msg">{a.msg}</div><div className="muted">{a.time}</div></div></div>)}</div>
        </div>

        <div className="card block">
          <div className="block-head"><h3>Poor Weather</h3><div className="muted">{weatherAlerts.length} items</div></div>
          <div className="alert-stack">{weatherAlerts.length === 0 ? <div className="muted">No weather alerts</div> : weatherAlerts.map((a) => <div key={a.id} className="alert warning"><div><div className="alert-msg">{a.msg}</div><div className="muted">{a.time}</div></div></div>)}</div>
        </div>

        <div className="card block">
          <div className="block-head"><h3>Water Level Risk</h3><div className="muted">{levelAlerts.length} items</div></div>
          <div className="alert-stack">{levelAlerts.length === 0 ? <div className="muted">Water level normal</div> : levelAlerts.map((a) => <div key={a.id} className="alert danger"><div><div className="alert-msg">{a.msg}</div><div className="muted">{a.time}</div></div></div>)}</div>
        </div>
      </div>
    </div>
  );
}
