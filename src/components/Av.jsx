import React from "react";
import { C } from "../constants/theme.js";
import { initials } from "../utils/helpers.js";

export function Av({ name, photo, size, color }) {
  const sz = size || 36;
  const col = color || C.accent;
  return (
    <div style={{ width: sz + 4, height: sz + 4, borderRadius: "50%", padding: 2, background: "linear-gradient(135deg," + col + "," + col + "88)", flexShrink: 0 }}>
      <div style={{ width: sz, height: sz, borderRadius: "50%", overflow: "hidden", background: C.surfaceHi, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {photo ? (
          <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontWeight: 800, fontSize: sz * 0.32, color: col }}>{initials(name)}</span>
        )}
      </div>
    </div>
  );
}
