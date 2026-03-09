import React from "react";
import { C } from "../constants/theme.js";

export function StatCard({ label, value, color }) {
  const col = color || C.accent;
  return (
    <div className="card ch" style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: col + "22", border: "1px solid " + col + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: col, flexShrink: 0 }}>
        {String(value)[0]}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: col }}>{value}</div>
        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{label}</div>
      </div>
    </div>
  );
}
