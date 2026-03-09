import React, { useState } from "react";
import { C } from "../constants/theme.js";
import { CREDS } from "../constants/auth.js";
import { Fl } from "../components/Fl.jsx";

export function LoginPage({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  function doLogin(uv, pv) {
    const un = uv !== undefined ? uv : u;
    const pw = pv !== undefined ? pv : p;
    const match = CREDS.find((c) => c.u === un.trim() && c.p === pw);
    if (match) {
      onLogin({ name: match.name, role: match.role });
    } else {
      setErr("Invalid credentials. Click a demo row to auto-login.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.surface, border: "1px solid " + C.border, borderRadius: 16, padding: 34, animation: "fadeUp .4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 50, height: 50, borderRadius: 13, background: "linear-gradient(135deg," + C.accent + ",#1a7ae8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff", margin: "0 auto 11px" }}>A</div>
          <h1 style={{ fontSize: 19, fontWeight: 800 }}>IT and CS APS</h1>
          <p style={{ color: C.textMuted, fontSize: 12, marginTop: 3 }}>Academic Profiling and Records System</p>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Fl>Username</Fl>
          <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Enter username" />
        </div>
        <div style={{ marginBottom: 13 }}>
          <Fl>Password</Fl>
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="Enter password" onKeyDown={(e) => { if (e.key === "Enter") doLogin(); }} />
        </div>
        {err && <div style={{ color: C.red, fontSize: 12, marginBottom: 12, padding: "8px 11px", background: C.red + "15", borderRadius: 7, border: "1px solid " + C.red + "30" }}>{err}</div>}
        <button className="bp" style={{ width: "100%", padding: "11px" }} onClick={() => doLogin()}>Sign In</button>
        {/* <div style={{ marginTop: 15, padding: 12, background: C.surfaceHi, borderRadius: 9, border: "1px solid " + C.border }}>
          <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".7px" }}>Demo Accounts - Click to Login</div>
          {CREDS.map((c) => (
            <div
              key={c.role}
              onClick={() => { setU(c.u); setP(c.p); setErr(""); doLogin(c.u, c.p); }}
              style={{ display: "flex", gap: 8, fontSize: 11, marginBottom: 4, cursor: "pointer", padding: "3px 5px", borderRadius: 5, transition: "background .1s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#ffffff08"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ color: C.textMuted, width: 50, textTransform: "capitalize" }}>{c.role}:</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", color: C.accent }}>{c.u} / {c.p}</span>
              <span style={{ marginLeft: "auto", color: C.green, fontSize: 10 }}>click</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
