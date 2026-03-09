import React from "react";
import { C } from "../constants/theme.js";
import { STUDENTS } from "../constants/data/students.js";
import { FACULTY } from "../constants/data/faculty.js";
import { RESEARCH_DATA } from "../constants/data/research.js";
import { EVENTS_DATA } from "../constants/data/events.js";
import { StatCard, SHdr, Lbar } from "../components/index.js";

export function ReportsPage() {
  const bsit = STUDENTS.filter((s) => s.course === "BSIT").length;
  const bscs = STUDENTS.filter((s) => s.course === "BSCS").length;
  const avg = (STUDENTS.reduce((a, s) => a + s.gpa, 0) / STUDENTS.length).toFixed(2);

  return (
    <div className="anim">
      <SHdr title="Reports and Analytics" sub="Academic data overview" action={<button className="bo sm">Export PDF</button>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 11, marginBottom: 18 }}>
        <StatCard label="Total Students" value={STUDENTS.length} color={C.accent} />
        <StatCard label="Faculty" value={FACULTY.length} color={C.purple} />
        <StatCard label="Avg GPA" value={avg} color={C.green} />
        <StatCard label="Research" value={RESEARCH_DATA.length} color={C.teal} />
        <StatCard label="Events" value={EVENTS_DATA.length} color={C.gold} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="card"><SHdr title="Enrollment by Course" />{[["BSIT", bsit, C.accent], ["BSCS", bscs, C.purple]].map((kv) => <div key={kv[0]} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 13 }}><span>{kv[0]}</span><span style={{ color: kv[2], fontFamily: "'JetBrains Mono',monospace" }}>{kv[1]} students</span></div><div style={{ height: 7, background: C.border, borderRadius: 4 }}><div style={{ width: ((kv[1] / STUDENTS.length) * 100) + "%", height: "100%", background: kv[2], borderRadius: 4 }} /></div></div>)}</div>
        <div className="card"><SHdr title="Faculty Teaching Load" />{FACULTY.map((f) => <div key={f.id} style={{ marginBottom: 12 }}><div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{f.fullName}</div><Lbar cur={f.currentLoad} max={f.maxLoad} /></div>)}</div>
        <div className="card"><SHdr title="Research by Area" />{[...new Set(RESEARCH_DATA.map((r) => r.area))].map((area) => { const col = { "Artificial Intelligence": C.accent, Cybersecurity: C.red, "Software Engineering": C.purple }[area] || C.accent; const cnt = RESEARCH_DATA.filter((r) => r.area === area).length; return <div key={area} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 12 }}><span>{area}</span><span style={{ color: col }}>{cnt}</span></div><div style={{ height: 7, background: C.border, borderRadius: 4 }}><div style={{ width: ((cnt / RESEARCH_DATA.length) * 100) + "%", height: "100%", background: col, borderRadius: 4 }} /></div></div>; })}</div>
        <div className="card"><SHdr title="Students by Year Level" />{[1, 2, 3, 4].map((y) => { const cnt = STUDENTS.filter((s) => s.year === y).length; return <div key={y} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 13 }}><span>Year {y}</span><span style={{ color: C.green }}>{cnt}</span></div><div style={{ height: 7, background: C.border, borderRadius: 4 }}><div style={{ width: cnt > 0 ? ((cnt / STUDENTS.length) * 100) + "%" : "0%", height: "100%", background: C.green, borderRadius: 4 }} /></div></div>; })}</div>
      </div>
    </div>
  );
}

export default ReportsPage;
