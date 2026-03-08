import React from "react";
import { C } from "../constants/theme.js";

export function Fl({ children }) {
  return (
    <label style={{ display: "block", fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", marginBottom: 5 }}>
      {children}
    </label>
  );
}
