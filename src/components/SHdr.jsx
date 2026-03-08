import React from "react";

export function SHdr({ title, sub, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15, flexWrap: "wrap", gap: 8 }}>
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 700 }}>{title}</h2>
        {sub && <p style={{ color: "#4a607a", fontSize: 12, marginTop: 2 }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}
