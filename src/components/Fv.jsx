import React from "react";
import { C } from "../constants/theme.js";

export function Fv({ label, value }) {
  return (
    <div className="fv">
      <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: value ? C.text : C.textMuted }}>{value || "Not provided"}</div>
    </div>
  );
}
