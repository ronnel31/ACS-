import React from "react";
import { useNavigate } from "react-router-dom";
import { C } from "../constants/theme.js";
import { STUDENTS } from "../constants/data/students.js";
import { FACULTY } from "../constants/data/faculty.js";
import { RESEARCH_DATA } from "../constants/data/research.js";
import { EVENTS_DATA } from "../constants/data/events.js";
import { Av } from "../components/Av.jsx";
import { StatCard } from "../components/StatCard.jsx";
import { SHdr } from "../components/SHdr.jsx";
import { Lbar } from "../components/Lbar.jsx";

export function Dashboard({ user }) {
  const navigate = useNavigate();
  return (
    <div className="anim">
      <div style={{ background: "linear-gradient(135deg," + C.accent + "22," + C.purple + "18)", border: "1px solid " + C.border, borderRadius: 13, padding: "18px 22px", marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 9 }}>
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 800 }}>Welcome, {user.name.split(" ")[0]}</h1>
            <p style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>IT and CS Academic Profiling System - 1st Semester A.Y. 2024-2025</p>
          </div>
          {user.role === "admin" && (
            <div style={{ display: "flex", gap: 7 }}>
              <button className="bp sm" onClick={() => navigate("/students")}>Manage Students</button>
              <button className="bo sm" onClick={() => navigate("/reports")}>Reports</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 12, marginBottom: 18 }}>
        <StatCard label="Total Students" value={STUDENTS.length} color={C.accent} />
        <StatCard label="Faculty Members" value={FACULTY.length} color={C.purple} />
        <StatCard label="Research Papers" value={RESEARCH_DATA.length} color={C.green} />
        <StatCard label="Events" value={EVENTS_DATA.length} color={C.gold} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
        <div className="card">
          <SHdr title="Recent Students" action={<button className="bo sm" onClick={() => navigate("/students")}>View All</button>} />
          {STUDENTS.map((s) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid " + C.border + "33" }}>
              <Av name={s.fullName} size={28} color={s.course === "BSIT" ? C.accent : C.purple} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.fullName}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{s.course} - {s.section}</div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: s.gpa <= 1.5 ? C.accent : s.gpa <= 2 ? C.green : C.gold }}>{s.gpa}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <SHdr title="Faculty Teaching Load" action={<button className="bo sm" onClick={() => navigate("/faculty")}>View All</button>} />
          {FACULTY.map((f) => (
            <div key={f.id} style={{ padding: "9px 0", borderBottom: "1px solid " + C.border + "33" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 7 }}>
                <Av name={f.fullName} size={24} color={C.purple} />
                <div style={{ fontSize: 12, fontWeight: 600 }}>{f.fullName}</div>
              </div>
              <Lbar cur={f.currentLoad} max={f.maxLoad} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
