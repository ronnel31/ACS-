import React, { useState, useRef } from "react";
import { C } from "../constants/theme.js";
import { FACULTY } from "../constants/data/faculty.js";
import { merge, initials } from "../utils/helpers.js";
import { Av, Bdg, Fl, Fv, Lbar, SHdr } from "../components/index.js";

function FacultyProfileView({ fac, onEdit, onBack }) {
  const [tab, setTab] = useState(0);
  const TABS = ["Basic Info", "Employment", "Qualifications", "Certifications", "Teaching", "Research", "Admin and Awards", "Industry"];
  const G2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 };
  const G3 = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9 };
  const sc = { "Full-Time": C.green, "Part-Time": C.gold, Contractual: C.red }[fac.facultyStatus] || C.green;
  const AC2 = { "Artificial Intelligence": C.accent, Cybersecurity: C.red, "Software Engineering": C.purple };
  return (
    <div className="anim">
      <div style={{ display: "flex", gap: 8, marginBottom: 15, flexWrap: "wrap" }}>
        <button className="bo sm" onClick={onBack}>Back</button>
        <div style={{ flex: 1 }} />
        <button className="bp sm" onClick={onEdit}>Edit Profile</button>
        <button className="bo sm">Export PDF</button>
      </div>
      <div style={{ background: "linear-gradient(135deg," + C.surface + "," + C.surfaceHi + ")", border: "1px solid " + C.border, borderRadius: 14, padding: "22px 24px", marginBottom: 15 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg," + C.purple + "," + C.accent + ")", flexShrink: 0 }}>
            <div style={{ width: 84, height: 84, borderRadius: "50%", overflow: "hidden", background: C.surfaceHi, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {fac.photo ? <img src={fac.photo} alt={fac.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontWeight: 800, fontSize: 26, color: C.purple }}>{initials(fac.fullName)}</span>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>Faculty Profile</div>
            <h1 style={{ fontSize: 21, fontWeight: 800, marginBottom: 3 }}>{fac.fullName}</h1>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.purple, marginBottom: 9 }}>{fac.employeeNumber}</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Bdg label={fac.facultyStatus} color={sc} />
              <Bdg label={fac.position} color={C.purple} />
              <Bdg label={fac.department} color={C.accent} />
              <Bdg label={fac.academicRank} color={C.gold} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid " + C.border }}>
          <Lbar cur={fac.currentLoad} max={fac.maxLoad} />
        </div>
      </div>
      <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 13, overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "1px solid " + C.border, overflowX: "auto" }}>
          {TABS.map((t, i) => <button key={t} className={"tb" + (tab === i ? " on" : "")} onClick={() => setTab(i)}>{t}</button>)}
        </div>
        <div style={{ padding: 20 }}>
          {tab === 0 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.purple, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Basic Information</div>
            <div style={G3}>
              <Fv label="Full Name" value={fac.fullName} />
              <Fv label="Employee ID" value={fac.employeeNumber} />
              <Fv label="Faculty Status" value={fac.facultyStatus} />
              <Fv label="Position" value={fac.position} />
              <Fv label="Sex at Birth" value={fac.sexAtBirth} />
              <Fv label="Civil Status" value={fac.civilStatus} />
              <Fv label="Nationality" value={fac.nationality} />
              <Fv label="Religion" value={fac.religion} />
              <Fv label="Date of Birth" value={fac.dateOfBirth} />
            </div>
            <div style={{ marginTop: 9, marginBottom: 13 }}><Fv label="Place of Birth" value={fac.placeOfBirth} /></div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.teal, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 9 }}>
              <Fv label="Present Address" value={fac.presentAddress} />
              <Fv label="Permanent Address" value={fac.permanentAddress} />
            </div>
            <div style={G2}>
              <Fv label="Primary Mobile" value={fac.primaryMobile} />
              <Fv label="Alternate Mobile" value={fac.alternateMobile} />
              <Fv label="Primary Email" value={fac.primaryEmail} />
              <Fv label="Alternate Email" value={fac.alternateEmail} />
            </div>
          </div>}
          {tab === 1 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.gold, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Employment</div>
            <div style={G2}>
              <Fv label="College" value={fac.college} />
              <Fv label="Department" value={fac.department} />
              <Fv label="Start Date" value={fac.employmentStartDate} />
              <Fv label="Employment Type" value={fac.employmentType} />
              <Fv label="Academic Rank" value={fac.academicRank} />
            </div>
          </div>}
          {tab === 2 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.accent, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Qualifications</div>
            {[["Bachelor's Degree", fac.bsDegree, fac.bsMajor, fac.bsUniversity, fac.bsYear], ["Master's Degree", fac.msDegree, fac.msMajor, fac.msUniversity, fac.msYear], ["Doctorate Degree", fac.phdDegree, fac.phdMajor, fac.phdUniversity, fac.phdYear]].map((d) => (
              <div key={d[0]} style={{ padding: 13, background: C.surfaceHi, borderRadius: 9, marginBottom: 9, border: "1px solid " + C.border }}>
                <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".8px", fontWeight: 700, marginBottom: 5 }}>{d[0]}</div>
                {d[1] ? <div><div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{d[1]}</div><div style={{ fontSize: 12, color: C.accent }}>Major: {d[2] || "N/A"}</div><div style={{ fontSize: 12, color: C.textSub }}>{d[3]} - {d[4]}</div></div> : <div style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>Not provided</div>}
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 9, textTransform: "uppercase", letterSpacing: ".8px" }}>Specializations</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{(fac.specialization || []).map((s) => <Bdg key={s} label={s} color={C.green} />)}</div>
          </div>}
          {tab === 3 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.gold, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Certifications</div>
            {fac.certifications && fac.certifications.length > 0 ? fac.certifications.map((c, i) => (
              <div key={i} style={{ padding: 13, background: C.surfaceHi, borderRadius: 9, marginBottom: 9, border: "1px solid " + C.gold + "33" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: C.accent }}>Issued by: {c.org}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>Earned: {c.dateEarned} | Expires: {c.expiration || "N/A"}</div>
              </div>
            )) : <div style={{ color: C.textMuted, textAlign: "center", padding: 30, fontStyle: "italic" }}>No certifications recorded.</div>}
          </div>}
          {tab === 4 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.accent, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Teaching</div>
            <div style={{ marginBottom: 13 }}><Lbar cur={fac.currentLoad} max={fac.maxLoad} /></div>
            <div style={G2}>
              <Fv label="Semester" value={fac.semester} />
              <Fv label="Academic Year" value={fac.academicYear} />
              <Fv label="Max Load" value={(fac.maxLoad || 21) + " hours"} />
              <Fv label="Current Load" value={fac.currentLoad + " hours"} />
            </div>
            <div style={{ marginTop: 13, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>Subjects</div>
            {fac.subjects.map((s, i) => <div key={i} style={{ padding: "8px 12px", background: C.surfaceHi, borderRadius: 7, marginBottom: 6, fontSize: 13, borderLeft: "3px solid " + C.accent }}>{s}</div>)}
            <div style={{ marginTop: 13, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>Sections</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{fac.sections.map((s) => <Bdg key={s} label={s} color={C.accent} />)}</div>
          </div>}
          {tab === 5 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.teal, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Research</div>
            {fac.research && fac.research.length > 0 ? fac.research.map((r, i) => {
              const col = AC2[r.area] || C.teal;
              return (
                <div key={i} style={{ padding: 13, background: C.surfaceHi, borderRadius: 9, marginBottom: 9, borderTop: "3px solid " + col }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 7 }}>{r.title}</div>
                  <div style={{ display: "flex", gap: 5, marginBottom: 7, flexWrap: "wrap" }}>
                    <Bdg label={r.area} color={col} />
                    <Bdg label={r.type} color={C.purple} />
                    <Bdg label={r.year} color={C.textSub} />
                  </div>
                  {r.coAuthors && <div style={{ fontSize: 12, color: C.textSub }}>Co-Authors: {r.coAuthors}</div>}
                  {r.doi && <div style={{ fontSize: 12, color: C.accent }}>DOI: {r.doi}</div>}
                </div>
              );
            }) : <div style={{ color: C.textMuted, textAlign: "center", padding: 30 }}>No research recorded.</div>}
          </div>}
          {tab === 6 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.purple, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Administrative Roles</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
              {fac.adminRoles && fac.adminRoles.length > 0 ? fac.adminRoles.map((r) => <Bdg key={r} label={r} color={C.purple} />) : <div style={{ color: C.textMuted, fontStyle: "italic", fontSize: 13 }}>No roles recorded.</div>}
            </div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.gold, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Awards</div>
            {fac.awards && fac.awards.length > 0 ? fac.awards.map((a, i) => (
              <div key={i} style={{ padding: 12, background: C.gold + "15", borderRadius: 9, marginBottom: 7, border: "1px solid " + C.gold + "33" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.gold }}>{a.title}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{a.org} - {a.year}</div>
              </div>
            )) : <div style={{ color: C.textMuted, textAlign: "center", padding: 24, fontStyle: "italic" }}>No awards recorded.</div>}
          </div>}
          {tab === 7 && <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: C.accent, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Industry Experience</div>
            {fac.experience && fac.experience.length > 0 ? fac.experience.map((e, i) => (
              <div key={i} style={{ padding: 13, background: C.surfaceHi, borderRadius: 9, marginBottom: 9 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{e.position}</div>
                <div style={{ fontSize: 13, color: C.accent }}>{e.company}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{e.years} years - {e.field}</div>
              </div>
            )) : <div style={{ color: C.textMuted, textAlign: "center", padding: 24, fontStyle: "italic" }}>No experience recorded.</div>}
            <div style={{ marginTop: 14, fontWeight: 700, fontSize: 11, color: C.teal, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Memberships</div>
            {fac.memberships && fac.memberships.length > 0 ? fac.memberships.map((m, i) => (
              <div key={i} style={{ padding: 12, background: C.surfaceHi, borderRadius: 9, marginBottom: 7, border: "1px solid " + C.teal + "33" }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{m.org}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{m.type} - Joined {m.yearJoined}</div>
              </div>
            )) : <div style={{ color: C.textMuted, textAlign: "center", padding: 24, fontStyle: "italic" }}>No memberships.</div>}
          </div>}
        </div>
      </div>
    </div>
  );
}

function FacultyForm({ initial, onSave, onCancel }) {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initial || {});
  const [photo, setPhoto] = useState((initial && initial.photo) || null);
  const fileRef = useRef();
  const TABS = ["Basic Info", "Employment", "Qualifications", "Teaching", "Roles and Skills"];
  const G2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const set = (k, v) => setData((d) => merge(d, k, v));
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => { setPhoto(ev.target.result); set("photo", ev.target.result); };
    r.readAsDataURL(file);
  };
  const FInp = (props) => (
    <div style={{ gridColumn: props.wide ? "1 / -1" : undefined }}>
      <Fl>{props.label}</Fl>
      <input type={props.type || "text"} value={data[props.f] || ""} onChange={(e) => set(props.f, e.target.value)} placeholder={props.ph || ""} />
    </div>
  );
  const FSel = (props) => (
    <div style={{ gridColumn: props.wide ? "1 / -1" : undefined }}>
      <Fl>{props.label}</Fl>
      <select value={data[props.f] || ""} onChange={(e) => set(props.f, e.target.value)}>
        <option value="">-- Select --</option>
        {props.opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  return (
    <div className="anim">
      <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: 18, marginBottom: 14, display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg," + C.purple + "," + C.accent + ")", flexShrink: 0 }}>
          <div onClick={() => fileRef.current.click()} style={{ width: 66, height: 66, borderRadius: "50%", overflow: "hidden", background: C.surfaceHi, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {photo ? <img src={photo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: C.textMuted, fontSize: 10 }}>Upload</span>}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 3 }}>{initial && initial.fullName ? "Edit Faculty" : "Add New Faculty"}</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
            {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ padding: "4px 11px", borderRadius: 20, cursor: "pointer", border: "1px solid " + (tab === i ? C.purple + "66" : C.border), background: tab === i ? C.purple + "15" : "transparent", color: tab === i ? C.purple : C.textMuted, fontSize: 11, fontFamily: "'Outfit',sans-serif", fontWeight: tab === i ? 600 : 400 }}>{t}</button>)}
          </div>
        </div>
      </div>
      <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: 22 }}>
        {tab === 0 && <div>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.purple }}>Basic Information</div>
          <div style={G2}>
            <FInp label="Full Name *" f="fullName" ph="e.g. Dr. Maria Santos" wide />
            <FInp label="Employee ID *" f="employeeNumber" ph="e.g. FAC-001" />
            <FSel label="Faculty Status *" f="facultyStatus" opts={["Full-Time", "Part-Time", "Contractual"]} />
            <FSel label="Position *" f="position" opts={["Dean", "Department Chair", "Program Head", "Professor", "Associate Professor", "Assistant Professor", "Instructor", "Lecturer"]} />
            <FSel label="Sex at Birth *" f="sexAtBirth" opts={["Male", "Female"]} />
            <FSel label="Civil Status" f="civilStatus" opts={["Single", "Married", "Widowed", "Separated"]} />
            <FInp label="Nationality" f="nationality" />
            <FInp label="Religion" f="religion" />
            <FInp label="Date of Birth *" f="dateOfBirth" type="date" />
            <FInp label="Place of Birth" f="placeOfBirth" />
          </div>
          <div style={{ height: 14 }} />
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.teal }}>Contact</div>
          <div style={G2}>
            <FInp label="Present Address" f="presentAddress" wide />
            <FInp label="Permanent Address" f="permanentAddress" wide />
            <FInp label="Primary Mobile *" f="primaryMobile" />
            <FInp label="Alternate Mobile" f="alternateMobile" />
            <FInp label="Primary Email *" f="primaryEmail" type="email" />
            <FInp label="Alternate Email" f="alternateEmail" type="email" />
          </div>
        </div>}
        {tab === 1 && <div>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.gold }}>Employment</div>
          <div style={G2}>
            <FSel label="College" f="college" opts={["College of Computing Studies", "College of Engineering", "College of Business"]} wide />
            <FSel label="Department" f="department" opts={["Information Technology", "Computer Science"]} />
            <FInp label="Employment Start Date" f="employmentStartDate" type="date" />
            <FSel label="Employment Type" f="employmentType" opts={["Permanent", "Probationary", "Contractual"]} />
            <FSel label="Academic Rank" f="academicRank" opts={["Instructor I", "Instructor II", "Instructor III", "Assistant Professor I", "Assistant Professor II", "Associate Professor I", "Associate Professor II", "Professor I", "Professor II"]} wide />
          </div>
        </div>}
        {tab === 2 && <div>
          {[["Bachelor's Degree", "bs"], ["Master's Degree", "ms"], ["Doctorate Degree", "phd"]].map((deg) => (
            <div key={deg[0]}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 11, color: deg[1] === "phd" ? C.gold : C.accent }}>{deg[0]}</div>
              <div style={G2}>
                <FInp label="Degree Title" f={deg[1] + "Degree"} />
                <FInp label="Major" f={deg[1] + "Major"} />
                <FInp label="University" f={deg[1] + "University"} />
                <FInp label="Year Graduated" f={deg[1] + "Year"} />
              </div>
              <div style={{ height: 13 }} />
            </div>
          ))}
        </div>}
        {tab === 3 && <div>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.accent }}>Teaching Load</div>
          <div style={G2}>
            <FSel label="Semester" f="semester" opts={["1st", "2nd", "Summer"]} />
            <FInp label="Academic Year" f="academicYear" ph="e.g. 2024-2025" />
            <FInp label="Max Teaching Load" f="maxLoad" type="number" ph="21" />
            <FInp label="Current Teaching Load" f="currentLoad" type="number" ph="0" />
          </div>
          <div style={{ height: 12 }} />
          <Fl>Subjects Handled (one per line)</Fl>
          <textarea rows={4} value={data.subjectsText || ""} onChange={(e) => set("subjectsText", e.target.value)} placeholder="IT401 - AI Fundamentals\nIT402 - Machine Learning" style={{ resize: "vertical" }} />
        </div>}
        {tab === 4 && <div>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 11, color: C.purple }}>Administrative Roles</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
            {["Dean", "Department Chair", "Program Coordinator", "Research Coordinator", "Thesis Adviser", "Thesis Panel Member"].map((role) => {
              const on = data.adminRoles && data.adminRoles.includes(role);
              return <button key={role} onClick={() => { const cur = data.adminRoles || []; set("adminRoles", on ? cur.filter((r) => r !== role) : cur.concat([role])); }} style={{ padding: "5px 12px", borderRadius: 20, cursor: "pointer", border: "1px solid " + (on ? C.purple + "66" : C.border), background: on ? C.purple + "15" : "transparent", color: on ? C.purple : C.textMuted, fontSize: 12, fontFamily: "'Outfit',sans-serif", fontWeight: on ? 600 : 400 }}>{role}</button>;
            })}
          </div>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 11, color: C.green }}>Specializations</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Artificial Intelligence", "Data Science", "Cybersecurity", "Networking", "Software Engineering", "Web Development", "Game Development", "Mobile Development"].map((sp) => {
              const on = data.specialization && data.specialization.includes(sp);
              return <button key={sp} onClick={() => { const cur = data.specialization || []; set("specialization", on ? cur.filter((s) => s !== sp) : cur.concat([sp])); }} style={{ padding: "5px 12px", borderRadius: 20, cursor: "pointer", border: "1px solid " + (on ? C.green + "66" : C.border), background: on ? C.green + "15" : "transparent", color: on ? C.green : C.textMuted, fontSize: 12, fontFamily: "'Outfit',sans-serif", fontWeight: on ? 600 : 400 }}>{sp}</button>;
            })}
          </div>
        </div>}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 14, borderTop: "1px solid " + C.border }}>
          <div>{tab > 0 && <button className="bo" onClick={() => setTab((t) => t - 1)}>Previous</button>}</div>
          <div style={{ display: "flex", gap: 7 }}>
            <button className="bo" onClick={onCancel}>Cancel</button>
            {tab < 4 ? <button className="bp" onClick={() => setTab((t) => t + 1)}>Next</button> : <button className="bp" onClick={() => { const nd = merge(data, "photo", photo); onSave(nd); }}>Save Profile</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FacultyPage({ user }) {
  const [facList, setFacList] = useState(FACULTY);
  const [search, setSearch] = useState("");
  const [fDept, setFDept] = useState("All");
  const [view, setView] = useState("list");
  const [sel, setSel] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const filtered = facList.filter((f) => (fDept === "All" || f.department === fDept) && (f.fullName.toLowerCase().includes(search.toLowerCase()) || f.position.toLowerCase().includes(search.toLowerCase())));

  if (view === "profile" && sel) return <FacultyProfileView fac={sel} onEdit={() => { setIsEdit(true); setView("form"); }} onBack={() => { setView("list"); setSel(null); }} />;
  if (view === "form") return (
    <FacultyForm
      initial={isEdit ? sel : {}}
      onSave={(d) => {
        if (isEdit && sel) {
          setFacList((prev) => prev.map((f) => (f.id === sel.id ? Object.assign({}, f, d) : f)));
          setSel(Object.assign({}, sel, d));
          setView("profile");
        } else {
          setFacList((prev) => prev.concat([Object.assign({ id: "FAC-00" + (prev.length + 1) }, d)]));
          setView("list");
        }
      }}
      onCancel={() => setView(isEdit ? "profile" : "list")}
    />
  );

  return (
    <div className="anim">
      <SHdr title="Faculty Profiles" sub={filtered.length + " of " + facList.length + " faculty"} action={user.role === "admin" && <button className="bp sm" onClick={() => { setSel(null); setIsEdit(false); setView("form"); }}>+ Add Faculty</button>} />
      <div style={{ display: "flex", gap: 9, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px" }}><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, position..." /></div>
        <select value={fDept} onChange={(e) => setFDept(e.target.value)} style={{ width: 200 }}>
          <option>All</option><option>Information Technology</option><option>Computer Science</option>
        </select>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Faculty</th><th>ID</th><th>Department</th><th>Position</th><th>Status</th><th>Rank</th><th>Load</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map((f) => {
              const sc = { "Full-Time": C.green, "Part-Time": C.gold, Contractual: C.red }[f.facultyStatus] || C.green;
              const lc = f.currentLoad >= 18 ? C.red : f.currentLoad >= 12 ? C.gold : C.green;
              return (
                <tr key={f.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Av name={f.fullName} size={28} color={C.purple} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{f.fullName}</div>
                        <div style={{ fontSize: 11, color: C.textMuted }}>{f.primaryEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.textMuted }}>{f.employeeNumber}</span></td>
                  <td><Bdg label={f.department} color={f.department === "Information Technology" ? C.accent : C.purple} /></td>
                  <td style={{ fontSize: 12 }}>{f.position}</td>
                  <td><Bdg label={f.facultyStatus} color={sc} /></td>
                  <td style={{ fontSize: 11, color: C.textSub }}>{f.academicRank}</td>
                  <td>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: lc }}>{f.currentLoad}/21</span>
                    <div style={{ width: 50, height: 4, background: C.border, borderRadius: 2, marginTop: 3 }}><div style={{ width: Math.min((f.currentLoad / 21) * 100, 100) + "%", height: "100%", background: lc, borderRadius: 2 }} /></div>
                  </td>
                  <td><button className="bo sm" onClick={() => { setSel(f); setView("profile"); }}>View Profile</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.textMuted }}>No faculty found.</div>}
      </div>
    </div>
  );
}

export default FacultyPage;
