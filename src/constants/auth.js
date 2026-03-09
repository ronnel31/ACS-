export const CREDS = [
  { role: "admin", u: "admin", p: "admin123", name: "Registrar Admin" },
  { role: "faculty", u: "faculty", p: "faculty123", name: "Dr. Maria Santos" },
  { role: "student", u: "student", p: "student123", name: "Ana Marie Reyes" },
];

export const ALLOWED = {
  admin: ["dashboard", "students", "faculty", "events", "scheduling", "research", "curriculum", "search", "reports"],
  faculty: ["dashboard", "faculty", "events", "scheduling", "research", "curriculum"],
  student: ["dashboard", "events", "scheduling", "research", "curriculum"],
};

export const NAV_ITEMS = [
  { id: "dashboard", lbl: "Dashboard" },
  { id: "students", lbl: "Students" },
  { id: "faculty", lbl: "Faculty" },
  { id: "events", lbl: "Events" },
  { id: "scheduling", lbl: "Scheduling" },
  { id: "research", lbl: "Research" },
  { id: "curriculum", lbl: "Curriculum" },
  { id: "search", lbl: "Search" },
  { id: "reports", lbl: "Reports" },
];
