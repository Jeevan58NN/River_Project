import React, { useState } from "react";
import riverImg from "../assets/river.jpg"; 
import saveWater from "../assets/save_water.jpg";
import noLitter from "../assets/no_litter.jpg";
import trees from "../assets/trees.jpg";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [report, setReport] = useState({ title: "", details: "", coords: "" });
  const [waterLevel, setWaterLevel] = useState(42);

  const calcFloodChance = (wl) => Math.min(95, Math.round(wl * 0.9 + Math.random() * 15));

  function submitReport(e) {
    e.preventDefault();
    if (!report.title) return alert("Give a title");
    setReports((r) => [{ id: Date.now(), ...report, time: new Date().toLocaleString() }, ...r]);
    setReport({ title: "", details: "", coords: "" });
    alert("Report submitted — thanks!");
  }

  function joinVolunteer(e) {
    e.preventDefault();
    if (!form.name) return alert("Name required");
    setVolunteers((v) => [{ id: Date.now(), ...form, joinedAt: new Date().toLocaleString() }, ...v]);
    setForm({ name: "", phone: "", email: "", note: "" });
    alert("Thanks for joining!");
  }

  const dailyNews = [
    "Sabarmati Riverfront: community cleanup this Sunday",
    "Local school adopts river awareness program",
    "Monitoring sensors report stable DO levels"
  ];

  const floodChance = calcFloodChance(waterLevel);

  return (
    <div className="page-root">
      <div className="home-hero card">
        <img src={riverImg} alt="Sabarmati" className="hero-img" />
        <div className="hero-content">
          <h2>Sabarmati Riverfront</h2>
          <p className="muted">
            The Sabarmati Riverfront is a landmark river restoration and public
            space development in Ahmedabad. This demo monitors water health,
            detections and supports community actions.
          </p>

          
        </div>
      </div>

      <div className="home-grid">
        <div className="card">
          <h3>Report an Issue</h3>
          <form onSubmit={submitReport} className="form">
            <input placeholder="Title" value={report.title} onChange={(e) => setReport({ ...report, title: e.target.value })} />
            <input placeholder="Coordinates (lat,lng)" value={report.coords} onChange={(e) => setReport({ ...report, coords: e.target.value })} />
            <textarea placeholder="Details" rows="4" value={report.details} onChange={(e) => setReport({ ...report, details: e.target.value })} />
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" type="submit">Submit Report</button>
              <button type="button" className="btn-ghost" onClick={() => setReport({ title: "", details: "", coords: "" })}>Clear</button>
            </div>
          </form>

          {reports.length > 0 && (
            <div className="recent-reports">
              <h4>Recent Reports</h4>
              <ul>
                {reports.map((r) => (
                  <li key={r.id}><strong>{r.title}</strong> — {r.coords || "no coords"} <div className="muted">{r.time}</div></li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="card">
          <h3>Volunteer / Join</h3>
          <form onSubmit={joinVolunteer} className="form">
            <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea placeholder="How you want to help?" rows="3" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" type="submit">Join as Volunteer</button>
              <button type="button" className="btn-ghost" onClick={() => setForm({ name: "", phone: "", email: "", note: "" })}>Reset</button>
            </div>
          </form>

          {volunteers.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h4>Recent Volunteers</h4>
              <ul>
                {volunteers.map((v) => <li key={v.id}><strong>{v.name}</strong> — <span className="muted">{v.joinedAt}</span></li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="news-strip card">
        <div className="news-title">Daily Sabarmati News</div>
        <div className="news-marquee">
          <div className="news-track">
            {dailyNews.concat(dailyNews).map((n, i) => <span key={i} className="news-item">• {n}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
