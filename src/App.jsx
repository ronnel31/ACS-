import React, { useState } from "react";
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

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  function renderPage() {
    if (page === "dashboard") return <Dashboard user={user} setPage={setPage} />;
    if (page === "students") return <StudentsPage user={user} />;
    if (page === "faculty") return <FacultyPage user={user} />;
    if (page === "events") return <EventsPage user={user} />;
    if (page === "scheduling") return <SchedulingPage user={user} />;
    if (page === "research") return <ResearchPage user={user} />;
    if (page === "curriculum") return <CurriculumPage user={user} />;
    if (page === "search") return <SearchPage />;
    if (page === "reports") return <ReportsPage />;
    return <Dashboard user={user} setPage={setPage} />;
  }

  if (!user) return <LoginPage onLogin={(u) => setUser(u)} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar page={page} setPage={setPage} user={user} onLogout={() => { setUser(null); setPage("dashboard"); }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: C.surface, borderBottom: "1px solid " + C.border, padding: "0 18px", height: 50, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{PAGE_TITLES[page] || "Dashboard"}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.textMuted }}>{new Date().toLocaleDateString("en-PH", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
            <Bdg label={user.role === "admin" ? "Registrar" : user.role === "faculty" ? "Faculty" : "Student"} color={user.role === "admin" ? C.gold : user.role === "faculty" ? C.purple : C.accent} />
          </div>
        </div>
        <main style={{ flex: 1, overflowY: "auto", padding: 20 }}>{renderPage()}</main>
      </div>
    </div>
  );
}
