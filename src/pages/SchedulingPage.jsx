import React, { useState } from "react";
import { C } from "../constants/theme.js";
import { SCHEDULES_DATA } from "../constants/data/schedules.js";
import { FACULTY } from "../constants/data/faculty.js";
import { fmt } from "../utils/helpers.js";
import { Av, Bdg, Lbar, SHdr, Modal, Fl } from "../components/index.js";

export function SchedulingPage({ user }) {
  const [schedules, setSchedules] = useState(SCHEDULES_DATA);
  const [showAdd, setShowAdd] = useState(false);
  const [addErr, setAddErr] = useState("");
  const [ns, setNs] = useState({ courseCode: "", subject: "", faculty: "", section: "", day: "Monday", timeStart: "08:00", timeEnd: "10:00", room: "Lab 201", semester: "1st", year: "2024-2025" });
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const HOURS = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const dayColor = { Monday: C.accent, Tuesday: C.purple, Wednesday: C.green, Thursday: C.gold, Friday: C.red };

  function getFLoad(name) { return schedules.filter((s) => s.faculty === name).reduce((a, s) => a + (parseInt(s.timeEnd, 10) - parseInt(s.timeStart, 10)), 0); }

  function addSched() {
    const conflict = schedules.find((s) => (s.room === ns.room || s.faculty === ns.faculty) && s.day === ns.day && ns.timeStart >= s.timeStart && ns.timeStart < s.timeEnd);
    if (conflict) { setAddErr("Conflict: " + (conflict.room === ns.room ? "Room" : "Faculty") + " already in use on " + conflict.day + "."); return; }
    const hrs = parseInt(ns.timeEnd, 10) - parseInt(ns.timeStart, 10);
    if (getFLoad(ns.faculty) + hrs > 21) { setAddErr("Faculty load would exceed 21 hours."); return; }
    setSchedules((prev) => prev.concat([Object.assign({ id: "SCH-00" + (prev.length + 1), roomType: "Computer Laboratory" }, ns)]));
    setShowAdd(false); setAddErr("");
  }

  return (
    <div className="anim">
      <SHdr title="Class Scheduling" sub="Faculty workload and conflict detection" action={user.role === "admin" && <button className="bp sm" onClick={() => { setShowAdd(true); setAddErr(""); }}>+ Add Schedule</button>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 12, marginBottom: 18 }}>
        {FACULTY.map((f) => {
          const load = getFLoad(f.fullName);
          return (
            <div key={f.id} className="card">
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 9 }}><Av name={f.fullName} size={26} color={C.purple} /><div><div style={{ fontSize: 12, fontWeight: 600 }}>{f.fullName}</div><div style={{ fontSize: 10, color: C.textMuted }}>{f.position}</div></div></div>
              <Lbar cur={load} max={21} />
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>Remaining: <span style={{ color: 21 - load <= 3 ? C.red : C.green, fontWeight: 700 }}>{21 - load} hrs</span></div>
            </div>
          );
        })}
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Subject</th><th>Faculty</th><th>Section</th><th>Day</th><th>Time</th><th>Room</th><th>Semester</th></tr></thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td><div style={{ fontWeight: 600, fontSize: 13 }}>{s.subject}</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.textMuted }}>{s.courseCode}</div></td>
                <td style={{ fontSize: 12 }}>{s.faculty}</td>
                <td><Bdg label={s.section} color={C.accent} /></td>
                <td><span style={{ color: dayColor[s.day] || C.text, fontWeight: 600, fontSize: 12 }}>{s.day}</span></td>
                <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{fmt(s.timeStart)} - {fmt(s.timeEnd)}</td>
                <td><div style={{ fontSize: 12 }}>{s.room}</div><div style={{ fontSize: 10, color: C.textMuted }}>{s.roomType}</div></td>
                <td style={{ fontSize: 11, color: C.textMuted }}>{s.semester} Sem - {s.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Schedule">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
          {[["Course Code", "courseCode", ""], ["Subject Title", "subject", ""], ["Section", "section", "e.g. BSIT-3A"], ["Room", "room", "e.g. Lab 201"]].map((f) => (
            <div key={f[1]}><Fl>{f[0]}</Fl><input value={ns[f[1]] || ""} onChange={(e) => setNs(Object.assign({}, ns, { [f[1]]: e.target.value }))} placeholder={f[2]} /></div>
          ))}
          <div><Fl>Faculty</Fl><select value={ns.faculty} onChange={(e) => setNs(Object.assign({}, ns, { faculty: e.target.value }))}><option value="">Select</option>{FACULTY.map((f) => <option key={f.id} value={f.fullName}>{f.fullName}</option>)}</select></div>
          <div><Fl>Day</Fl><select value={ns.day} onChange={(e) => setNs(Object.assign({}, ns, { day: e.target.value }))}>{DAYS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
          <div><Fl>Time Start</Fl><select value={ns.timeStart} onChange={(e) => setNs(Object.assign({}, ns, { timeStart: e.target.value }))}>{HOURS.map((h) => <option key={h} value={h}>{h}</option>)}</select></div>
          <div><Fl>Time End</Fl><select value={ns.timeEnd} onChange={(e) => setNs(Object.assign({}, ns, { timeEnd: e.target.value }))}>{HOURS.map((h) => <option key={h} value={h}>{h}</option>)}</select></div>
        </div>
        {addErr && <div style={{ color: C.red, fontSize: 12, padding: "8px 12px", background: C.red + "15", borderRadius: 7, marginTop: 11, border: "1px solid " + C.red + "30" }}>{addErr}</div>}
        <div style={{ display: "flex", gap: 7, justifyContent: "flex-end", marginTop: 14 }}><button className="bo" onClick={() => setShowAdd(false)}>Cancel</button><button className="bp" onClick={addSched}>Add Schedule</button></div>
      </Modal>
    </div>
  );
}

export default SchedulingPage;
