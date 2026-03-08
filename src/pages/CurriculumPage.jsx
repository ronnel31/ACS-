import React, { useState } from "react";
import { C } from "../constants/theme.js";
import { CURRICULUM_DATA } from "../constants/data/curriculum.js";
import { Bdg, SHdr } from "../components/index.js";

export function CurriculumPage({ user }) {
  const [sel, setSel] = useState(CURRICULUM_DATA[0]);

  return (
    <div className="anim">
      <SHdr title="Curriculum Management" sub="Academic curriculum versions" action={user.role === "admin" && <button className="bp sm">+ New Curriculum</button>} />
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 14 }}>
        <div>
          {CURRICULUM_DATA.map((c) => (
            <div key={c.id} onClick={() => setSel(c)} style={{ padding: "11px 13px", borderRadius: 9, marginBottom: 6, cursor: "pointer", border: "1px solid " + (sel && sel.id === c.id ? C.accent + "66" : C.border), background: sel && sel.id === c.id ? C.accent + "15" : C.surface }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{c.version}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{c.program}</div>
              <Bdg label={c.status} color={c.status === "Active" ? C.green : C.textMuted} />
            </div>
          ))}
        </div>
        <div className="card">
          {sel && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 7 }}><div><div style={{ fontSize: 15, fontWeight: 700 }}>{sel.version}</div><div style={{ fontSize: 12, color: C.textMuted }}>{sel.program} - {sel.year}</div></div><Bdg label={sel.status} color={sel.status === "Active" ? C.green : C.textMuted} /></div>
              <table>
                <thead><tr><th>Code</th><th>Subject Title</th><th>Units</th><th>Year</th><th>Sem</th><th>Prerequisite</th></tr></thead>
                <tbody>{sel.courses.map((c) => <tr key={c.code}><td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.accent }}>{c.code}</span></td><td style={{ fontWeight: 500 }}>{c.title}</td><td style={{ textAlign: "center" }}><Bdg label={String(c.units)} color={C.accent} /></td><td style={{ textAlign: "center", fontSize: 12 }}>Year {c.yearLevel}</td><td style={{ textAlign: "center", fontSize: 12 }}>{c.sem === 1 ? "1st" : "2nd"}</td><td style={{ fontSize: 11, color: C.textMuted }}>{c.prereq}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
