import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { C } from "./constants/theme.js";
import { PAGE_TITLES } from "./constants/config.js";
import { Sidebar, Bdg } from "./components/index.js";
import { LoginPage } from "./pages/LoginPage.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { StudentsPage } from "./pages/StudentsPage.jsx";
import { FacultyPage } from "./pages/FacultyPage.jsx";
import { EventsPage } from "./pages/EventsPage.jsx";
import { SchedulingPage } from "./pages/SchedulingPage.jsx";
import { ResearchPage } from "./pages/ResearchPage.jsx";
import { CurriculumPage } from "./pages/CurriculumPage.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { ReportsPage } from "./pages/ReportsPage.jsx";

/**
 * AppShell wraps every authenticated page with the shared sidebar and top
 * navigation bar.  It is only rendered after a successful login.
 *
 * Separating the shell from the route declarations means the sidebar and
 * header don't need to know about the routing tree — they simply read the
 * current URL via `useLocation` to highlight the active nav item and
 * display the correct page title.
 */
function AppShell({ user, onLogout }) {
  const location = useLocation();
  // Derive the page key from the first path segment (e.g. "/students" → "students")
  const pageKey = location.pathname.replace("/", "") || "dashboard";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar user={user} onLogout={onLogout} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* ── Top bar ───────────────────────────────────────────────────── */}
        <div style={{ background: C.surface, borderBottom: "1px solid " + C.border, padding: "0 18px", height: 50, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{PAGE_TITLES[pageKey] || "Dashboard"}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.textMuted }}>
              {new Date().toLocaleDateString("en-PH", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
            </span>
            <Bdg
              label={user.role === "admin" ? "Registrar" : user.role === "faculty" ? "Faculty" : "Student"}
              color={user.role === "admin" ? C.gold : user.role === "faculty" ? C.purple : C.accent}
            />
          </div>
        </div>

        {/* ── Page content ──────────────────────────────────────────────── */}
        <main style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/students" element={<StudentsPage user={user} />} />
            <Route path="/faculty" element={<FacultyPage user={user} />} />
            <Route path="/events" element={<EventsPage user={user} />} />
            <Route path="/scheduling" element={<SchedulingPage user={user} />} />
            <Route path="/research" element={<ResearchPage user={user} />} />
            <Route path="/curriculum" element={<CurriculumPage user={user} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            {/* Catch-all: redirect unknown paths back to the dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/**
 * Root application component.
 *
 * Responsibilities:
 * 1. Owns the authenticated `user` state.  Passing the user down to child
 *    components (rather than using a global store) keeps the auth flow simple
 *    and explicit for a system of this scale.
 * 2. Guards all routes: unauthenticated visitors are redirected to /login;
 *    logged-in users trying to access /login are redirected to /dashboard.
 * 3. Delegates layout and page rendering to AppShell once authenticated.
 */
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={(u) => setUser(u)} />}
      />

      {/* Protected routes — render AppShell when authenticated */}
      <Route
        path="/*"
        element={
          user
            ? <AppShell user={user} onLogout={() => setUser(null)} />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}
