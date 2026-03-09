import React, { useState } from "react";
import { C } from "../constants/theme.js";
import { RESEARCH_DATA } from "../constants/data/research.js";
import { Bdg, SHdr, Modal, Fv } from "../components/index.js";

const AC = { "Artificial Intelligence": C.accent, Cybersecurity: C.red, "Software Engineering": C.purple };

export function ResearchPage({ user }) {
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const filtered = RESEARCH_DATA.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()) || r.authors.join(" ").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="anim">
      <SHdr title="Research Repository" sub="IT and CS research publications" action={user.role !== "student" && <button className="bp sm">+ Upload Research</button>} />
      <div style={{ marginBottom: 14 }}><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, author, keyword..." /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 12 }}>
        {filtered.map((r) => {
          const col = AC[r.area] || C.accent;
          return (
            <div key={r.id} className="card ch" style={{ cursor: "pointer", borderTop: "2px solid " + col }} onClick={() => setSel(r)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}><Bdg label={r.area} color={col} /><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.textMuted }}>{r.year}</span></div>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.4, marginBottom: 7 }}>{r.title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 9, lineHeight: 1.5 }}>{r.abstract.slice(0, 80)}...</div>
              <div style={{ borderTop: "1px solid " + C.border, paddingTop: 7 }}><div style={{ fontSize: 11, color: C.textMuted, marginBottom: 5 }}>{r.authors.join(", ")}</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{r.keywords.slice(0, 3).map((k) => <Bdg key={k} label={k} color={col} />)}</div></div>
            </div>
          );
        })}
      </div>
      <Modal open={!!sel} onClose={() => setSel(null)} title="Research Details">
        {sel && (
          <div>
            <Bdg label={sel.area} color={AC[sel.area] || C.accent} />
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: "11px 0 8px", lineHeight: 1.4 }}>{sel.title}</h3>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>{sel.authors.join(", ")} - {sel.year}</div>
            <div style={{ padding: 12, background: C.surfaceHi, borderRadius: 8, marginBottom: 12 }}><div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 5 }}>Abstract</div><p style={{ fontSize: 13, lineHeight: 1.7 }}>{sel.abstract}</p></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{sel.keywords.map((k) => <Bdg key={k} label={k} color={AC[sel.area] || C.accent} />)}</div>
            {sel.doi && <div style={{ fontSize: 12, color: C.accent, marginTop: 10 }}>DOI: {sel.doi}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ResearchPage;
