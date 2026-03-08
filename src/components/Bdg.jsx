import React from "react";

export function Bdg({ label, color }) {
  return <span className="bdg" style={{ background: color + "20", color: color, border: "1px solid " + color + "44" }}>{label}</span>;
}
