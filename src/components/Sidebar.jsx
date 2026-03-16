import React from "react";
import { NavLink } from "react-router-dom";
import { C } from "../constants/theme.js";
import { NAV_ITEMS } from "../constants/auth.js";
import { ALLOWED } from "../constants/auth.js";
import { Av } from "./Av.jsx";

/**
 * Application sidebar.
 *
 * Navigation is built with React Router's `NavLink` component.  NavLink
 * automatically adds an `aria-current="page"` attribute and lets us apply
 * an active style via its `className` callback — no manual page-state
 * tracking required.  This also means that the browser's back/forward
 * buttons and direct URL access work correctly out of the box.
 *
 * Rendered nav items are filtered by the user's role using the `ALLOWED`
 * map, so students, faculty, and admins each see only the sections they
 * are permitted to access.
 */
export function Sidebar({ user, onLogout }) {
  const items = NAV_ITEMS.filter((n) => ALLOWED[user.role].includes(n.id));
  return (
    <div style={{ width: 200, background: C.surface, borderRight: "1px solid " + C.border, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, flexShrink: 0 }}>
      <div style={{ padding: "17px 14px 13px", borderBottom: "1px solid " + C.border }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg," + C.accent + "," + C.accent + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff" }}>A</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 11, color: C.accent, letterSpacing: ".5px" }}>IT and CS APS</div>
            <div style={{ fontSize: 10, color: C.textMuted }}>Academic Profiling</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => "nbtn" + (isActive ? " on" : "")}
          >
            {item.lbl}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: "12px", borderTop: "1px solid " + C.border }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Av name={user.name} size={26} color={user.role === "admin" ? C.gold : user.role === "faculty" ? C.purple : C.accent} />
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 11, fontWeight: 600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ fontSize: 10, color: C.textMuted, textTransform: "capitalize" }}>{user.role}</div>
          </div>
        </div>
        <button className="bo sm" style={{ width: "100%" }} onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}
