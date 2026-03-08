import React, { useState } from "react";
import { C } from "../constants/theme.js";
import { EVENTS_DATA } from "../constants/data/events.js";
import { DEPT_CLR, TYPE_CLR, MONTH_NAMES, DAY_LBLS, EV_TYPES } from "../constants/config.js";
import { merge } from "../utils/helpers.js";
import { fmt } from "../utils/helpers.js";
import { Bdg, Fv, Fl, Modal } from "../components/index.js";

export function EventsPage({ user }) {
  const [events, setEvents] = useState(EVENTS_DATA);
  const [viewMode, setViewMode] = useState("calendar");
  const [calView, setCalView] = useState("month");
  const [curDate, setCurDate] = useState(new Date(2026, 2, 1));
  const [fDept, setFDept] = useState("All");
  const [fType, setFType] = useState("All");
  const [fSem, setFSem] = useState("All");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [showPart, setShowPart] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addErr, setAddErr] = useState("");
  const [ne, setNe] = useState({ title: "", description: "", type: "Seminar", department: "Both", organizer: "", date: "", startTime: "08:00", endTime: "10:00", venue: "", mode: "Onsite", meetingLink: "", platform: "Zoom", capacity: 50, semester: "2nd" });

  const yr = curDate.getFullYear();
  const mo = curDate.getMonth();
  const totalDays = new Date(yr, mo + 1, 0).getDate();
  const firstDay = (() => { const d = new Date(yr, mo, 1).getDay(); return d === 0 ? 6 : d - 1; })();
  const today = new Date();

  const filtered = events.filter((e) => (fDept === "All" || e.department === fDept) && (fType === "All" || e.type === fType) && (fSem === "All" || e.semester === fSem) && (!search || e.title.toLowerCase().includes(search.toLowerCase()) || (e.organizer && e.organizer.toLowerCase().includes(search.toLowerCase()))));

  function evOnDay(day) {
    const ds = yr + "-" + String(mo + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
    return filtered.filter((e) => e.date === ds);
  }

  const setNEF = (k, v) => setNe((d) => merge(d, k, v));

  function saveEvent() {
    const conflict = events.find((e) => e.id !== ne.id && e.date === ne.date && e.venue === ne.venue && ne.startTime < e.endTime && ne.endTime > e.startTime);
    if (conflict) { setAddErr("Conflict: " + ne.venue + " already booked on " + ne.date + " for '" + conflict.title + "'."); return; }
    setEvents((prev) => prev.concat([Object.assign({}, ne, { id: "EVT-00" + (prev.length + 1), participants: 0, certificateIssued: false, participantList: [] })]));
    setShowAdd(false); setAddErr("");
  }

  return (
    <div className="anim">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15, flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 700 }}>Events and Academic Calendar</h2>
          <p style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>{filtered.length} event{filtered.length !== 1 ? "s" : ""} - A.Y. 2025-2026</p>
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          <div style={{ display: "flex", background: C.surfaceHi, borderRadius: 7, padding: 3, border: "1px solid " + C.border }}>
            {[["calendar", "Calendar"], ["list", "List"]].map((kv) => <button key={kv[0]} onClick={() => setViewMode(kv[0])} style={{ padding: "5px 12px", borderRadius: 5, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: viewMode === kv[0] ? 700 : 400, background: viewMode === kv[0] ? C.accent : "transparent", color: viewMode === kv[0] ? "#000" : C.textMuted }}>{kv[1]}</button>)}
          </div>
          {user.role === "admin" && <button className="bp sm" onClick={() => { setShowAdd(true); setAddErr(""); }}>+ Add Event</button>}
        </div>
      </div>

      <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 10, padding: "11px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 160px" }}><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events..." style={{ fontSize: 12 }} /></div>
          <select value={fDept} onChange={(e) => setFDept(e.target.value)} style={{ fontSize: 12, padding: "8px 10px", width: 145 }}><option value="All">All Departments</option><option value="IT">IT Only</option><option value="CS">CS Only</option><option value="Both">Both</option></select>
          <select value={fType} onChange={(e) => setFType(e.target.value)} style={{ fontSize: 12, padding: "8px 10px", width: 145 }}><option value="All">All Types</option>{EV_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select>
          <select value={fSem} onChange={(e) => setFSem(e.target.value)} style={{ fontSize: 12, padding: "8px 10px", width: 145 }}><option value="All">All Semesters</option><option value="1st">1st Semester</option><option value="2nd">2nd Semester</option><option value="Summer">Summer</option></select>
          {viewMode === "calendar" && (
            <div style={{ display: "flex", background: C.surfaceHi, borderRadius: 6, padding: 3, border: "1px solid " + C.border }}>
              {[["month", "Month"], ["week", "Week"]].map((kv) => <button key={kv[0]} onClick={() => setCalView(kv[0])} style={{ padding: "4px 10px", borderRadius: 4, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: calView === kv[0] ? 700 : 400, background: calView === kv[0] ? C.accent + "33" : "transparent", color: calView === kv[0] ? C.accent : C.textMuted }}>{kv[1]}</button>)}
            </div>
          )}
        </div>
      </div>

      {viewMode === "calendar" && (
        <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 13, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 18px", borderBottom: "1px solid " + C.border }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <button onClick={() => setCurDate((d) => { const nd = new Date(d); nd.setMonth(nd.getMonth() - 1); return nd; })} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid " + C.border, background: C.surfaceHi, color: C.textSub, cursor: "pointer", fontSize: 13 }}>&lt;</button>
              <h3 style={{ fontSize: 14, fontWeight: 800, minWidth: 140, textAlign: "center" }}>{MONTH_NAMES[mo]} {yr}</h3>
              <button onClick={() => setCurDate((d) => { const nd = new Date(d); nd.setMonth(nd.getMonth() + 1); return nd; })} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid " + C.border, background: C.surfaceHi, color: C.textSub, cursor: "pointer", fontSize: 13 }}>&gt;</button>
              <button onClick={() => setCurDate(new Date(2026, 2, 1))} style={{ padding: "4px 11px", borderRadius: 6, border: "1px solid " + C.border, background: "transparent", color: C.accent, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600 }}>Today</button>
            </div>
            <div style={{ display: "flex", gap: 11 }}>{[["IT", C.accent], ["CS", C.green], ["Both", C.purple]].map((kv) => <div key={kv[0]} style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: kv[1] }} /><span style={{ fontSize: 11, color: C.textMuted }}>{kv[0]}</span></div>)}</div>
          </div>
          {calView === "month" && (
            <div style={{ padding: 11 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 4 }}>{DAY_LBLS.map((d) => <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: C.textMuted, padding: "3px 0" }}>{d}</div>)}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
                {Array.from({ length: firstDay }, (_, i) => <div key={"x" + i} style={{ minHeight: 82 }} />)}
                {Array.from({ length: totalDays }, (_, i) => {
                  const day = i + 1;
                  const dayEvs = evOnDay(day);
                  const isTdy = today.getFullYear() === yr && today.getMonth() === mo && today.getDate() === day;
                  return (
                    <div key={day} style={{ minHeight: 82, background: isTdy ? C.accent + "0a" : C.bg, border: "1px solid " + (isTdy ? C.accent + "44" : C.border), borderRadius: 6, padding: "5px 6px", overflow: "hidden" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: isTdy ? 800 : 500, color: isTdy ? C.accent : C.textSub }}>{day}</span>
                        {dayEvs.length > 2 && <span style={{ fontSize: 9, color: C.textMuted }}>+{dayEvs.length - 2}</span>}
                      </div>
                      {dayEvs.slice(0, 2).map((ev) => { const col = DEPT_CLR[ev.department] || C.accent; return <div key={ev.id} onClick={() => setSel(ev)} style={{ background: col + "22", borderLeft: "3px solid " + col, borderRadius: 3, padding: "2px 5px", marginBottom: 2, cursor: "pointer", fontSize: 10, fontWeight: 600, color: col, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</div>; })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {calView === "week" && (
            <div style={{ padding: 11 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 5 }}>
                {Array.from({ length: 7 }, (_, i) => {
                  const d = new Date(2026, 2, 8 + i);
                  const ds = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
                  const dayEvs = filtered.filter((e) => e.date === ds);
                  return (
                    <div key={i} style={{ background: C.surfaceHi, border: "1px solid " + C.border, borderRadius: 8, padding: 9, minHeight: 100 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 6 }}>{DAY_LBLS[i]}<br /><span style={{ fontSize: 16, color: C.text }}>{d.getDate()}</span></div>
                      {dayEvs.map((ev) => { const col = DEPT_CLR[ev.department] || C.accent; return <div key={ev.id} onClick={() => setSel(ev)} style={{ background: col + "22", borderRadius: 5, padding: "4px 7px", marginBottom: 4, cursor: "pointer", fontSize: 10, fontWeight: 600, color: col }}>{ev.title}</div>; })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode === "list" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 12 }}>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 55, color: C.textMuted, gridColumn: "1/-1" }}>No events match your filters.</div>}
          {filtered.map((ev) => {
            const dCol = DEPT_CLR[ev.department] || C.accent;
            const tCol = TYPE_CLR[ev.type] || C.accent;
            return (
              <div key={ev.id} className="card ch" style={{ cursor: "pointer", borderTop: "3px solid " + dCol }} onClick={() => setSel(ev)}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}><Bdg label={ev.type} color={tCol} /><Bdg label={"Dept: " + ev.department} color={dCol} /></div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{ev.title}</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 9, lineHeight: 1.5 }}>{ev.description.slice(0, 80)}...</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 8, fontSize: 11, color: C.textMuted }}><div>{ev.date}</div><div>{fmt(ev.startTime)} - {fmt(ev.endTime)}</div><div>{ev.venue}</div><div>{ev.participants}/{ev.capacity} participants</div></div>
                <div style={{ display: "flex", gap: 5, borderTop: "1px solid " + C.border, paddingTop: 7 }}><Bdg label={ev.mode} color={ev.mode === "Online" ? C.accent : ev.mode === "Hybrid" ? C.teal : C.green} /><Bdg label={ev.semester + " Sem"} color={C.purple} />{ev.certificateIssued && <Bdg label="Cert" color={C.gold} />}</div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={!!sel && !showPart} onClose={() => setSel(null)} title={sel ? sel.title : ""} width={560}>
        {sel && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}><Bdg label={"Dept: " + sel.department} color={DEPT_CLR[sel.department] || C.accent} /><Bdg label={sel.type} color={TYPE_CLR[sel.type] || C.accent} /><Bdg label={sel.mode} color={sel.mode === "Onsite" ? C.green : C.accent} /></div>
            <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7, marginBottom: 14 }}>{sel.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}><Fv label="Organizer" value={sel.organizer} /><Fv label="Date" value={sel.date} /><Fv label="Start Time" value={fmt(sel.startTime)} /><Fv label="End Time" value={fmt(sel.endTime)} /><Fv label="Venue" value={sel.venue} /><Fv label="Capacity" value={String(sel.capacity)} /><Fv label="Semester" value={sel.semester + " Semester"} /><Fv label="Participants" value={sel.participants + "/" + sel.capacity} /></div>
            {sel.mode !== "Onsite" && sel.meetingLink && <div style={{ padding: 10, background: C.accent + "15", border: "1px solid " + C.accent + "33", borderRadius: 8, marginBottom: 12 }}><div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 3 }}>Online Link - {sel.platform}</div><div style={{ fontSize: 12, color: C.accent }}>{sel.meetingLink}</div></div>}
            <div style={{ display: "flex", gap: 7, justifyContent: "flex-end", paddingTop: 12, borderTop: "1px solid " + C.border }}><button className="bo sm" onClick={() => setShowPart(true)}>View Participants</button>{user.role === "admin" && <button className="bp sm">Edit Event</button>}</div>
          </div>
        )}
      </Modal>

      <Modal open={showPart && !!sel} onClose={() => setShowPart(false)} title={"Participants - " + (sel ? sel.title : "")} width={580}>
        {sel && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><div style={{ fontSize: 13, fontWeight: 700 }}>Participant List</div><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.accent }}>{sel.participantList.length} / {sel.capacity}</span></div>
            {sel.participantList.length > 0 ? <table><thead><tr><th>Student Name</th><th>Program</th><th>Year</th><th>Status</th></tr></thead><tbody>{sel.participantList.map((p, i) => { const sc = p.status === "Attended" ? C.green : C.gold; return <tr key={i}><td style={{ fontWeight: 600 }}>{p.name}</td><td><Bdg label={p.program} color={p.program === "BSIT" ? C.accent : C.purple} /></td><td>{p.year}</td><td><Bdg label={p.status} color={sc} /></td></tr>; })}</tbody></table> : <div style={{ textAlign: "center", padding: 30, color: C.textMuted, fontStyle: "italic" }}>No participants recorded yet.</div>}
          </div>
        )}
      </Modal>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Event" width={620}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
          <div style={{ gridColumn: "1/-1" }}><Fl>Event Title *</Fl><input value={ne.title} onChange={(e) => setNEF("title", e.target.value)} placeholder="e.g. HackITon 2026" /></div>
          <div style={{ gridColumn: "1/-1" }}><Fl>Description</Fl><textarea rows={3} value={ne.description} onChange={(e) => setNEF("description", e.target.value)} style={{ resize: "vertical" }} /></div>
          <div><Fl>Event Type *</Fl><select value={ne.type} onChange={(e) => setNEF("type", e.target.value)}>{EV_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
          <div><Fl>Department *</Fl><select value={ne.department} onChange={(e) => setNEF("department", e.target.value)}><option value="IT">IT</option><option value="CS">CS</option><option value="Both">Both</option></select></div>
          <div><Fl>Event Date *</Fl><input type="date" value={ne.date} onChange={(e) => setNEF("date", e.target.value)} /></div>
          <div><Fl>Organizer</Fl><input value={ne.organizer} onChange={(e) => setNEF("organizer", e.target.value)} /></div>
          <div><Fl>Start Time</Fl><input type="time" value={ne.startTime} onChange={(e) => setNEF("startTime", e.target.value)} /></div>
          <div><Fl>End Time</Fl><input type="time" value={ne.endTime} onChange={(e) => setNEF("endTime", e.target.value)} /></div>
          <div><Fl>Venue</Fl><input value={ne.venue} onChange={(e) => setNEF("venue", e.target.value)} /></div>
          <div><Fl>Capacity</Fl><input type="number" value={ne.capacity} onChange={(e) => setNEF("capacity", parseInt(e.target.value, 10) || 0)} /></div>
          <div><Fl>Event Mode</Fl><select value={ne.mode} onChange={(e) => setNEF("mode", e.target.value)}><option>Onsite</option><option>Online</option><option>Hybrid</option></select></div>
          <div><Fl>Semester</Fl><select value={ne.semester} onChange={(e) => setNEF("semester", e.target.value)}><option value="1st">1st Semester</option><option value="2nd">2nd Semester</option><option value="Summer">Summer Term</option></select></div>
          {ne.mode !== "Onsite" && <div style={{ gridColumn: "1/-1" }}><Fl>Meeting Link</Fl><input value={ne.meetingLink} onChange={(e) => setNEF("meetingLink", e.target.value)} placeholder="https://..." /></div>}
        </div>
        {addErr && <div style={{ color: C.red, fontSize: 12, padding: "8px 12px", background: C.red + "15", borderRadius: 7, marginTop: 12, border: "1px solid " + C.red + "30" }}>{addErr}</div>}
        <div style={{ display: "flex", gap: 7, justifyContent: "flex-end", marginTop: 15, paddingTop: 12, borderTop: "1px solid " + C.border }}><button className="bo" onClick={() => setShowAdd(false)}>Cancel</button><button className="bp" onClick={saveEvent}>Save Event</button></div>
      </Modal>
    </div>
  );
}

export default EventsPage;
