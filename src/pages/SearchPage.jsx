import React, { useState } from "react";
import { C } from "../constants/theme.js";
import { STUDENTS } from "../constants/data/students.js";
import { FACULTY } from "../constants/data/faculty.js";
import { RESEARCH_DATA } from "../constants/data/research.js";
import { EVENTS_DATA } from "../constants/data/events.js";
import { Bdg, SHdr } from "../components/index.js";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const results = query.length >= 2
    ? [
        ...STUDENTS.filter((s) => s.fullName.toLowerCase().includes(query.toLowerCase())).map((s) => ({ type: "Student", title: s.fullName, sub: s.course + " - " + s.section, col: C.accent })),
        ...FACULTY.filter((f) => f.fullName.toLowerCase().includes(query.toLowerCase())).map((f) => ({ type: "Faculty", title: f.fullName, sub: f.position, col: C.purple })),
        ...RESEARCH_DATA.filter((r) => r.title.toLowerCase().includes(query.toLowerCase())).map((r) => ({ type: "Research", title: r.title, sub: r.authors.join(", "), col: C.green })),
        ...EVENTS_DATA.filter((e) => e.title.toLowerCase().includes(query.toLowerCase())).map((e) => ({ type: "Event", title: e.title, sub: e.type + " - " + e.date, col: C.gold })),
      ].filter((r) => cat === "All" || r.type === cat)
    : [];

  return (
    <div className="anim">
      <SHdr title="Global Search" sub="Search across students, faculty, research and events" />
      <div style={{ maxWidth: 540, margin: "0 auto 22px" }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search everything..." style={{ fontSize: 15, height: 46 }} />
        <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 10 }}>{["All", "Student", "Faculty", "Research", "Event"].map((c) => <button key={c} onClick={() => setCat(c)} style={{ padding: "4px 13px", borderRadius: 20, border: "1px solid " + (cat === c ? C.accent + "88" : C.border), background: cat === c ? C.accent + "15" : "transparent", color: cat === c ? C.accent : C.textMuted, fontSize: 12, fontFamily: "'Outfit',sans-serif", fontWeight: cat === c ? 600 : 400, cursor: "pointer" }}>{c}</button>)}</div>
      </div>
      {query.length >= 2 ? (
        <div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 11 }}>{results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;</div>
          {results.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 15px", background: C.surface, border: "1px solid " + C.border, borderRadius: 10, marginBottom: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: r.col + "20", border: "1px solid " + r.col + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: r.col, flexShrink: 0 }}>{r.type[0]}</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{r.title}</div><div style={{ fontSize: 11, color: C.textMuted }}>{r.sub}</div></div>
              <Bdg label={r.type} color={r.col} />
            </div>
          ))}
          {results.length === 0 && <div style={{ textAlign: "center", padding: 45, color: C.textMuted }}>No results for &quot;{query}&quot;</div>}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "45px 20px", color: C.textMuted }}>
          <div style={{ fontSize: 32, marginBottom: 11, color: C.border }}>?</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.textSub, marginBottom: 6 }}>Search the System</div>
          <div style={{ fontSize: 13 }}>Type at least 2 characters to search students, faculty, research and events.</div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
