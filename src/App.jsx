import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Conservation from "./pages/Conservation";
import WasteDetection from "./pages/WasteDetection"; 
import HumanDetectionPage from "./pages/HumanDetectionPage"; 
import "./index.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
  { key: "conserve", label: "Conservation", path: "/" },
  { key: "waste", label: "Waste Detection", path: "/waste" },
  { key: "dashboard", label: "Dashboard", path: "/dashboard" },
  { key: "human", label: "Human Detection", path: "/human" },
  { key: "alerts", label: "Alerts", path: "/alerts" },
  { key: "volunteer", label: "Volunteer", path: "/volunteer" }
];


  return (
    <div className="app-dark">
      <header className="topbar">
        <div className="brand">
          <div className="logo">🌊</div>
          <div>
            <div className="app-title">Sabarmati River Monitor</div>
            <div className="app-sub">Ahmedabad, Gujarat — Demo (pseudo data)</div>
          </div>
        </div>

        <nav className="nav-pills">
          {navItems.map((p) => (
            <button
              key={p.key}
              className={"pill " + (location.pathname === p.path ? "active" : "")}
              onClick={() => navigate(p.path)}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/volunteer" element={<Home />} />
          <Route path="/" element={<Conservation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/waste" element={<WasteDetection />} />
          <Route path="/human" element={<HumanDetectionPage/>} />


          
        </Routes>
      </main>

      <footer className="footer">© Sabarmati River Monitoring • Demo · Pseudo data</footer>
    </div>
  );
}
