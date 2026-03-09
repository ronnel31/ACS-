import React, { useState, useRef } from "react";
import { C } from "../constants/theme.js";
import { STUDENTS } from "../constants/data/students.js";
import { merge, initials } from "../utils/helpers.js";
import { Av, Bdg, Fl, Fv, SHdr } from "../components/index.js";

function StudentProfileView({ student, onEdit, onBack }) {
  const [tab, setTab] = useState(0);
  const TABS = ["Personal Info", "Family Background", "Educational Background", "Enrollment"];
  const G2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 };
  const G3 = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9 };
  const sc = student.status === "Regular" ? C.green : C.gold;
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
          <div style={{ width: 90, height: 90, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg," + C.accent + "," + C.teal + ")", flexShrink: 0 }}>
            <div style={{ width: 84, height: 84, borderRadius: "50%", overflow: "hidden", background: C.surfaceHi, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {student.photo ? <img src={student.photo} alt={student.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontWeight: 800, fontSize: 26, color: C.accent }}>{initials(student.fullName)}</span>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>Student Profile</div>
            <h1 style={{ fontSize: 21, fontWeight: 800, marginBottom: 3 }}>{student.fullName}</h1>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.accent, marginBottom: 9 }}>{student.studentNumber}</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Bdg label={student.status} color={sc} />
              <Bdg label={student.yearLevel} color={C.teal} />
              <Bdg label={student.section} color={C.accent} />
              <Bdg label={student.curriculum} color={C.gold} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 13, overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "1px solid " + C.border, overflowX: "auto" }}>
          {TABS.map((t, i) => <button key={t} className={"tb" + (tab === i ? " on" : "")} onClick={() => setTab(i)}>{t}</button>)}
        </div>
        <div style={{ padding: 20 }}>
          {tab === 0 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: C.accent, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Basic Information</div>
              <div style={G3}>
                <Fv label="Full Name" value={student.fullName} />
                <Fv label="Student Number" value={student.studentNumber} />
                <Fv label="Status" value={student.status} />
                <Fv label="Sex at Birth" value={student.sexAtBirth} />
                <Fv label="Civil Status" value={student.civilStatus} />
                <Fv label="Residency" value={student.residency} />
                <Fv label="Nationality" value={student.nationality} />
                <Fv label="Religion" value={student.religion} />
                <Fv label="Date of Birth" value={student.dateOfBirth} />
              </div>
              <div style={{ marginTop: 9, marginBottom: 14 }}><Fv label="Place of Birth" value={student.placeOfBirth} /></div>
              <div style={{ fontWeight: 700, fontSize: 11, color: C.teal, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Contact Information</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 9 }}>
                <Fv label="Present Address" value={student.presentAddress} />
                <Fv label="Permanent Address" value={student.permanentAddress} />
              </div>
              <div style={G2}>
                <Fv label="Primary Mobile" value={student.primaryMobile} />
                <Fv label="Alternate Mobile" value={student.alternateMobile} />
                <Fv label="Primary Email" value={student.primaryEmail} />
                <Fv label="Alternate Email" value={student.alternateEmail} />
              </div>
            </div>
          )}
          {tab === 1 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: C.accent, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Father</div>
              <div style={G2}>
                <Fv label="Name" value={student.fatherName} />
                <Fv label="Occupation" value={student.fatherOccupation} />
                <Fv label="Date of Birth" value={student.fatherDOB} />
              </div>
              <div style={{ height: 14 }} />
              <div style={{ fontWeight: 700, fontSize: 11, color: C.teal, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Mother</div>
              <div style={G2}>
                <Fv label="Name" value={student.motherName} />
                <Fv label="Occupation" value={student.motherOccupation} />
                <Fv label="Date of Birth" value={student.motherDOB} />
              </div>
              <div style={{ height: 14 }} />
              <div style={{ fontWeight: 700, fontSize: 11, color: C.gold, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Other Family Details</div>
              <div style={G2}>
                <Fv label="Number of Siblings" value={student.siblings} />
                <Fv label="Family Annual Income" value={student.familyIncome} />
                <Fv label="Guardian Name" value={student.guardianName} />
                <Fv label="Relation" value={student.guardianRelation} />
                <Fv label="Guardian Contact" value={student.guardianContact} />
              </div>
            </div>
          )}
          {tab === 2 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: C.accent, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Educational Background</div>
              <div style={G2}>
                <Fv label="Last School Attended" value={student.lastSchool} />
                <Fv label="Last Year Attended" value={student.lastYearAttended} />
                <Fv label="LRN" value={student.lrn} />
                <Fv label="Honors Received" value={student.honors} />
              </div>
            </div>
          )}
          {tab === 3 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: C.accent, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".8px" }}>Enrollment Details</div>
              <div style={G2}>
                <Fv label="College" value={student.college} />
                <Fv label="Program" value={student.program} />
                <Fv label="Curriculum" value={student.curriculum} />
                <Fv label="Year Level" value={student.yearLevel} />
                <Fv label="Section" value={student.section} />
              </div>
              <div style={{ marginTop: 14, background: "linear-gradient(135deg," + C.accent + "18," + C.teal + "10)", border: "1px solid " + C.accent + "33", borderRadius: 11, padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Currently Enrolled</div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginTop: 3 }}>{student.program}</div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{student.college}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.accent, fontWeight: 700 }}>2024-2025</div>
                  <div style={{ fontSize: 11, color: C.textSub }}>1st Semester</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StudentForm({ initial, onSave, onCancel }) {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initial || {});
  const [photo, setPhoto] = useState((initial && initial.photo) || null);
  const fileRef = useRef();
  const TABS = ["Personal Info", "Family Background", "Educational Background", "Enrollment"];
  const G2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };

  const set = (k, v) => setData((d) => merge(d, k, v));

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => { setPhoto(ev.target.result); set("photo", ev.target.result); };
    r.readAsDataURL(file);
  }

  function FInp(props) {
    return (
      <div style={{ gridColumn: props.wide ? "1 / -1" : undefined }}>
        <Fl>{props.label}</Fl>
        <input type={props.type || "text"} value={data[props.f] || ""} onChange={(e) => set(props.f, e.target.value)} placeholder={props.ph || ""} />
      </div>
    );
  }

  function FSel(props) {
    return (
      <div style={{ gridColumn: props.wide ? "1 / -1" : undefined }}>
        <Fl>{props.label}</Fl>
        <select value={data[props.f] || ""} onChange={(e) => set(props.f, e.target.value)}>
          <option value="">-- Select --</option>
          {props.opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }

  return (
    <div className="anim">
      <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: 18, marginBottom: 14, display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg," + C.accent + "," + C.teal + ")", flexShrink: 0 }}>
          <div onClick={() => fileRef.current.click()} style={{ width: 66, height: 66, borderRadius: "50%", overflow: "hidden", background: C.surfaceHi, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {photo ? <img src={photo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: C.textMuted, fontSize: 10 }}>Upload</span>}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 3 }}>{initial && initial.fullName ? "Edit Student" : "Add New Student"}</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
            {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ padding: "4px 11px", borderRadius: 20, cursor: "pointer", border: "1px solid " + (tab === i ? C.accent + "66" : C.border), background: tab === i ? C.accent + "15" : "transparent", color: tab === i ? C.accent : C.textMuted, fontSize: 11, fontFamily: "'Outfit',sans-serif", fontWeight: tab === i ? 600 : 400 }}>{t}</button>)}
          </div>
        </div>
      </div>
      <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 12, padding: 22 }}>
        {tab === 0 && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.accent }}>Basic Information</div>
            <div style={G2}>
              <FInp label="Full Name *" f="fullName" ph="e.g. Ana Marie Reyes" wide />
              <FInp label="Student Number *" f="studentNumber" ph="e.g. 2024-10001" />
              <FSel label="Status *" f="status" opts={["Regular", "Irregular"]} />
              <FSel label="Sex at Birth *" f="sexAtBirth" opts={["Male", "Female"]} />
              <FSel label="Civil Status" f="civilStatus" opts={["Single", "Married", "Widowed", "Separated"]} />
              <FSel label="Residency" f="residency" opts={["Local", "Abroad"]} />
              <FInp label="Nationality" f="nationality" ph="e.g. Filipino" />
              <FInp label="Religion" f="religion" ph="e.g. Roman Catholic" />
              <FInp label="Date of Birth *" f="dateOfBirth" type="date" />
              <FInp label="Place of Birth" f="placeOfBirth" ph="City, Province" />
            </div>
            <div style={{ height: 16 }} />
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.teal }}>Contact</div>
            <div style={G2}>
              <FInp label="Present Address" f="presentAddress" wide />
              <FInp label="Permanent Address" f="permanentAddress" wide />
              <FInp label="Primary Mobile *" f="primaryMobile" ph="09XX-XXX-XXXX" />
              <FInp label="Alternate Mobile" f="alternateMobile" ph="09XX-XXX-XXXX" />
              <FInp label="Primary Email *" f="primaryEmail" type="email" />
              <FInp label="Alternate Email" f="alternateEmail" type="email" />
            </div>
          </div>
        )}
        {tab === 1 && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.accent }}>Father</div>
            <div style={G2}>
              <FInp label="Full Name" f="fatherName" />
              <FInp label="Occupation" f="fatherOccupation" />
              <FInp label="Date of Birth" f="fatherDOB" type="date" />
              <FSel label="Sex at Birth" f="fatherSex" opts={["Male", "Female"]} />
            </div>
            <div style={{ height: 14 }} />
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.teal }}>Mother</div>
            <div style={G2}>
              <FInp label="Full Name" f="motherName" />
              <FInp label="Occupation" f="motherOccupation" />
              <FInp label="Date of Birth" f="motherDOB" type="date" />
              <FSel label="Sex at Birth" f="motherSex" opts={["Male", "Female"]} />
            </div>
            <div style={{ height: 14 }} />
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.gold }}>Other</div>
            <div style={G2}>
              <FInp label="Number of Siblings" f="siblings" type="number" />
              <FSel label="Family Annual Income" f="familyIncome" opts={["Below P100,000", "P100,000 - P249,999", "P250,000 - P349,999", "P350,000 - P499,999", "P500,000 - P749,999", "P750,000 and above"]} />
              <FInp label="Guardian Name" f="guardianName" />
              <FSel label="Relation to Guardian" f="guardianRelation" opts={["Father", "Mother", "Grandparent", "Sibling", "Aunt or Uncle", "Legal Guardian", "Other"]} />
              <FInp label="Guardian Contact" f="guardianContact" />
            </div>
          </div>
        )}
        {tab === 2 && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.accent }}>Educational Background</div>
            <div style={G2}>
              <FInp label="Last School Attended" f="lastSchool" wide />
              <FInp label="Last Year Attended" f="lastYearAttended" ph="e.g. 2020-2021" />
              <FInp label="LRN" f="lrn" ph="12-digit LRN" />
              <FInp label="Honors Received" f="honors" ph="e.g. With Honors" wide />
            </div>
          </div>
        )}
        {tab === 3 && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 13, color: C.accent }}>Enrollment Details</div>
            <div style={G2}>
              <FSel label="College" f="college" opts={["College of Computing Studies", "College of Engineering", "College of Business"]} wide />
              <FSel label="Program" f="program" opts={["Bachelor of Science in Information Technology", "Bachelor of Science in Computer Science"]} wide />
              <FSel label="Curriculum" f="curriculum" opts={["BSIT 2018", "BSIT 2022", "BSCS 2024"]} />
              <FSel label="Year Level" f="yearLevel" opts={["1st Year", "2nd Year", "3rd Year", "4th Year"]} />
              <FInp label="Section" f="section" ph="e.g. BSIT-3A" />
            </div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 14, borderTop: "1px solid " + C.border }}>
          <div>{tab > 0 && <button className="bo" onClick={() => setTab((t) => t - 1)}>Previous</button>}</div>
          <div style={{ display: "flex", gap: 7 }}>
            <button className="bo" onClick={onCancel}>Cancel</button>
            {tab < 3 ? <button className="bp" onClick={() => setTab((t) => t + 1)}>Next</button> : <button className="bp" onClick={() => { const nd = merge(data, "photo", photo); onSave(nd); }}>Save Profile</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentsPage({ user }) {
  const [students, setStudents] = useState(STUDENTS);
  const [search, setSearch] = useState("");
  const [fCourse, setFCourse] = useState("All");
  const [view, setView] = useState("table");
  const [sel, setSel] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const filtered = students.filter((s) => (fCourse === "All" || s.course === fCourse) && (s.fullName.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search) || s.section.toLowerCase().includes(search.toLowerCase())));

  if (view === "profile" && sel) return <StudentProfileView student={sel} onEdit={() => { setIsEdit(true); setView("form"); }} onBack={() => { setView("table"); setSel(null); }} />;
  if (view === "form") return (
    <StudentForm
      initial={isEdit ? sel : {}}
      onSave={(d) => {
        if (isEdit && sel) {
          setStudents((prev) => prev.map((s) => (s.id === sel.id ? Object.assign({}, s, d) : s)));
          setSel(Object.assign({}, sel, d));
          setView("profile");
        } else {
          setStudents((prev) => prev.concat([Object.assign({ id: "2024-0000" + (prev.length + 1), course: d.program && d.program.includes("Information") ? "BSIT" : "BSCS", year: 1, gpa: 0 }, d)]));
          setView("table");
        }
      }}
      onCancel={() => setView(isEdit ? "profile" : "table")}
    />
  );

  return (
    <div className="anim">
      <SHdr title="Student Profiles" sub={filtered.length + " of " + students.length + " students"} action={user.role === "admin" && <button className="bp sm" onClick={() => { setSel(null); setIsEdit(false); setView("form"); }}>+ Add Student</button>} />
      <div style={{ display: "flex", gap: 9, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px" }}><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, ID, section..." /></div>
        <select value={fCourse} onChange={(e) => setFCourse(e.target.value)} style={{ width: 110 }}>
          <option>All</option><option>BSIT</option><option>BSCS</option>
        </select>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Student</th><th>ID</th><th>Course</th><th>Year</th><th>Section</th><th>Status</th><th>GPA</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Av name={s.fullName} size={28} color={s.course === "BSIT" ? C.accent : C.purple} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{s.fullName}</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{s.primaryEmail}</div>
                    </div>
                  </div>
                </td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.textMuted }}>{s.id}</span></td>
                <td><Bdg label={s.course} color={s.course === "BSIT" ? C.accent : C.purple} /></td>
                <td>{s.year}</td>
                <td>{s.section}</td>
                <td><Bdg label={s.status} color={s.status === "Regular" ? C.green : C.gold} /></td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: s.gpa <= 1.5 ? C.accent : s.gpa <= 2 ? C.green : C.gold }}>{s.gpa}</span></td>
                <td><button className="bo sm" onClick={() => { setSel(s); setView("profile"); }}>View Profile</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.textMuted }}>No students found.</div>}
      </div>
    </div>
  );
}

export default StudentsPage;
