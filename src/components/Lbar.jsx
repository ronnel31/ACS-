import React from "react";
import { C } from "../constants/theme.js";

export function Lbar({ cur, max }) {
  const m = max || 21;
  const pct = Math.min((cur / m) * 100, 100);
  const col = pct >= 90 ? C.red : pct >= 65 ? C.gold : C.green;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
        <span style={{ color: C.textMuted }}>Teaching Load</span>
        <span style={{ color: col, fontFamily: "'JetBrains Mono',monospace" }}>{cur}/{m} hrs</span>
      </div>
      <div style={{ height: 5, background: C.border, borderRadius: 3 }}>
        <div style={{ width: pct + "%", height: "100%", background: col, borderRadius: 3 }} />
      </div>
    </div>
  );
}
