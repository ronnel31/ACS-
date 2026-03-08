import { useState, useRef } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap";

const C = {
  bg:"#070b14", surface:"#0d1424", surfaceHi:"#111d30",
  border:"#1a2840", borderHi:"#243650",
  accent:"#3b9eff", teal:"#00c9a7", gold:"#f4a522",
  purple:"#9b7ff4", green:"#22d07a", red:"#ff5e6c",
  text:"#e8f0fe", textSub:"#8899b4", textMuted:"#4a607a",
};

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#070b14;color:#e8f0fe;font-family:'Outfit',sans-serif;}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.anim{animation:fadeUp .25s ease both;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:#0d1424;}
::-webkit-scrollbar-thumb{background:#1a2840;border-radius:4px;}
input,select,textarea{
  background:#111d30;border:1px solid #1a2840;color:#e8f0fe;
  border-radius:8px;padding:8px 12px;font-family:'Outfit',sans-serif;
  font-size:13px;outline:none;transition:border .15s;width:100%;
}
input:focus,select:focus,textarea:focus{border-color:#3b9eff66;}
input::placeholder,textarea::placeholder{color:#4a607a;}
select option{background:#111d30;}
table{border-collapse:collapse;width:100%;}
th{font-size:11px;text-transform:uppercase;letter-spacing:.7px;color:#4a607a;
   padding:10px 14px;text-align:left;border-bottom:1px solid #1a2840;font-weight:700;}
td{padding:11px 14px;border-bottom:1px solid #1a284022;font-size:13px;vertical-align:middle;}
tr:hover td{background:#111d3055;}
tr:last-child td{border-bottom:none;}
.nbtn{width:100%;display:flex;align-items:center;padding:8px 11px;border-radius:8px;
  margin-bottom:2px;background:transparent;border:1px solid transparent;
  color:#8899b4;font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;text-align:left;}
.nbtn:hover{color:#e8f0fe;background:#ffffff08;}
.nbtn.on{background:#3b9eff20;border-color:#3b9eff33;color:#3b9eff;font-weight:600;}
.bp{background:linear-gradient(135deg,#3b9eff,#1a7ae8);color:#fff;border:none;
  border-radius:8px;padding:8px 18px;font-family:'Outfit',sans-serif;font-size:13px;
  font-weight:600;cursor:pointer;}
.bp:hover{opacity:.9;}
.bo{background:transparent;color:#8899b4;border:1px solid #1a2840;border-radius:8px;
  padding:8px 18px;font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;}
.bo:hover{border-color:#243650;color:#e8f0fe;}
.sm{padding:5px 12px !important;font-size:12px !important;}
.card{background:#0d1424;border:1px solid #1a2840;border-radius:12px;padding:18px;}
.ch{transition:border-color .15s,transform .15s;}
.ch:hover{border-color:#243650;transform:translateY(-1px);}
.tb{padding:8px 15px;border:none;background:transparent;color:#8899b4;
  font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;
  border-bottom:2px solid transparent;transition:all .15s;white-space:nowrap;}
.tb:hover{color:#e8f0fe;}
.tb.on{color:#3b9eff;border-bottom-color:#3b9eff;}
.fv{background:#111d30;border:1px solid #1a2840;border-radius:8px;padding:10px 13px;}
.bdg{display:inline-flex;align-items:center;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:600;}
.ov{position:fixed;inset:0;z-index:999;display:flex;align-items:center;
  justify-content:center;background:#000000bb;backdrop-filter:blur(4px);}
.modal{background:#0d1424;border:1px solid #1a2840;border-radius:14px;
  max-width:95vw;max-height:90vh;overflow-y:auto;animation:fadeUp .2s ease;}
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id:"2021-00001", fullName:"Ana Marie Reyes", studentNumber:"2021-00001", status:"Regular", course:"BSIT", year:3, section:"BSIT-3A", gpa:1.5, sexAtBirth:"Female", civilStatus:"Single", nationality:"Filipino", religion:"Roman Catholic", dateOfBirth:"2003-04-12", placeOfBirth:"Cavite City, Cavite", presentAddress:"Blk 4 Lot 12, Greenview Subd., Imus, Cavite", permanentAddress:"Blk 4 Lot 12, Greenview Subd., Imus, Cavite", primaryMobile:"0917-123-4567", alternateMobile:"0998-765-4321", primaryEmail:"ana.reyes@student.edu.ph", alternateEmail:"", fatherName:"Roberto P. Reyes", fatherOccupation:"Civil Engineer", fatherDOB:"1970-03-05", motherName:"Carmelita D. Reyes", motherOccupation:"Teacher", motherDOB:"1973-07-18", siblings:"2", familyIncome:"P350,000 - P499,999", guardianName:"Roberto P. Reyes", guardianRelation:"Father", guardianContact:"0917-111-2222", lastSchool:"Imus National High School", lastYearAttended:"2020-2021", lrn:"103456789012", honors:"With Honors", college:"College of Computing Studies", program:"Bachelor of Science in Information Technology", curriculum:"BSIT 2022", yearLevel:"3rd Year", residency:"Local", photo:null },
  { id:"2021-00002", fullName:"Ben Cruz", studentNumber:"2021-00002", status:"Regular", course:"BSCS", year:3, section:"BSCS-3A", gpa:1.75, sexAtBirth:"Male", civilStatus:"Single", nationality:"Filipino", religion:"Catholic", dateOfBirth:"2002-09-05", placeOfBirth:"Imus, Cavite", presentAddress:"Imus, Cavite", permanentAddress:"Imus, Cavite", primaryMobile:"0918-234-5678", alternateMobile:"", primaryEmail:"ben.cruz@student.edu.ph", alternateEmail:"", fatherName:"Pedro Cruz", fatherOccupation:"Engineer", fatherDOB:"1968-05-10", motherName:"Luz Cruz", motherOccupation:"Nurse", motherDOB:"1971-02-14", siblings:"1", familyIncome:"P500,000+", guardianName:"Pedro Cruz", guardianRelation:"Father", guardianContact:"0918-111-3333", lastSchool:"Bacoor National HS", lastYearAttended:"2019-2020", lrn:"203456789013", honors:"", college:"College of Computing Studies", program:"Bachelor of Science in Computer Science", curriculum:"BSCS 2024", yearLevel:"3rd Year", residency:"Local", photo:null },
  { id:"2022-00003", fullName:"Carla Tan", studentNumber:"2022-00003", status:"Regular", course:"BSIT", year:2, section:"BSIT-2B", gpa:1.25, sexAtBirth:"Female", civilStatus:"Single", nationality:"Filipino", religion:"Protestant", dateOfBirth:"2004-02-20", placeOfBirth:"Bacoor, Cavite", presentAddress:"Bacoor, Cavite", permanentAddress:"Bacoor, Cavite", primaryMobile:"0919-345-6789", alternateMobile:"", primaryEmail:"carla.tan@student.edu.ph", alternateEmail:"", fatherName:"Tony Tan", fatherOccupation:"Businessman", fatherDOB:"1972-08-22", motherName:"Rose Tan", motherOccupation:"Accountant", motherDOB:"1975-12-01", siblings:"3", familyIncome:"P250,000 - P349,999", guardianName:"Tony Tan", guardianRelation:"Father", guardianContact:"0919-111-4444", lastSchool:"Bacoor City NHS", lastYearAttended:"2021-2022", lrn:"303456789014", honors:"Valedictorian", college:"College of Computing Studies", program:"Bachelor of Science in Information Technology", curriculum:"BSIT 2022", yearLevel:"2nd Year", residency:"Local", photo:null },
  { id:"2020-00004", fullName:"Dan Molina", studentNumber:"2020-00004", status:"Irregular", course:"BSCS", year:4, section:"BSCS-4A", gpa:2.0, sexAtBirth:"Male", civilStatus:"Single", nationality:"Filipino", religion:"Catholic", dateOfBirth:"2001-11-30", placeOfBirth:"Dasmarinas, Cavite", presentAddress:"Dasmarinas, Cavite", permanentAddress:"Dasmarinas, Cavite", primaryMobile:"0920-456-7890", alternateMobile:"", primaryEmail:"dan.molina@student.edu.ph", alternateEmail:"", fatherName:"Raul Molina", fatherOccupation:"OFW", fatherDOB:"1965-06-18", motherName:"Gloria Molina", motherOccupation:"Housewife", motherDOB:"1969-09-25", siblings:"4", familyIncome:"P350,000 - P499,999", guardianName:"Gloria Molina", guardianRelation:"Mother", guardianContact:"0920-111-5555", lastSchool:"Dasmarinas NHS", lastYearAttended:"2018-2019", lrn:"403456789015", honors:"", college:"College of Computing Studies", program:"Bachelor of Science in Computer Science", curriculum:"BSCS 2024", yearLevel:"4th Year", residency:"Local", photo:null },
];

const FACULTY = [
  { id:"FAC-001", fullName:"Dr. Maria Santos", employeeNumber:"FAC-001", facultyStatus:"Full-Time", position:"Program Head", sexAtBirth:"Female", civilStatus:"Married", nationality:"Filipino", religion:"Roman Catholic", dateOfBirth:"1978-06-15", placeOfBirth:"Cavite City", presentAddress:"123 Aguinaldo St., Imus, Cavite", permanentAddress:"123 Aguinaldo St., Imus, Cavite", primaryMobile:"0917-111-2222", alternateMobile:"0998-333-4444", primaryEmail:"m.santos@cit.edu.ph", alternateEmail:"", college:"College of Computing Studies", department:"Information Technology", employmentStartDate:"2010-06-01", employmentType:"Permanent", academicRank:"Associate Professor II", bsDegree:"BS Computer Science", bsMajor:"Computer Science", bsUniversity:"CIT", bsYear:"2000", msDegree:"MS Information Technology", msMajor:"Information Technology", msUniversity:"De La Salle University", msYear:"2005", phdDegree:"PhD Computer Science", phdMajor:"Computer Science", phdUniversity:"De La Salle University", phdYear:"2012", specialization:["Artificial Intelligence","Data Science","Machine Learning"], certifications:[{name:"AWS Solutions Architect",org:"Amazon Web Services",dateEarned:"2022-03",expiration:"2025-03"},{name:"Cisco CCNA",org:"Cisco",dateEarned:"2021-08",expiration:"2024-08"}], subjects:["IT401 - AI Fundamentals","IT402 - Machine Learning","IT301 - Data Analytics"], sections:["BSIT-4A","BSIT-3A"], semester:"1st", academicYear:"2024-2025", maxLoad:21, currentLoad:18, research:[{title:"Deep Learning for Crop Disease Detection Using CNN",type:"Journal",area:"Artificial Intelligence",year:"2023",coAuthors:"Ana Marie Reyes",doi:"10.1234/abc"}], adminRoles:["Program Coordinator","Thesis Adviser","Research Coordinator"], awards:[{title:"Best Research Paper",org:"PSITE National Conference",year:"2023"}], experience:[{company:"TechLabs Philippines",position:"Senior Software Developer",years:"3",field:"Software Development"}], memberships:[{org:"Philippine Society of IT Educators (PSITE)",type:"Active Member",yearJoined:"2010"}], photo:null },
  { id:"FAC-002", fullName:"Prof. Jose Garcia", employeeNumber:"FAC-002", facultyStatus:"Full-Time", position:"Assistant Professor", sexAtBirth:"Male", civilStatus:"Single", nationality:"Filipino", religion:"Catholic", dateOfBirth:"1985-03-22", placeOfBirth:"Imus, Cavite", presentAddress:"456 Rizal Ave., Bacoor, Cavite", permanentAddress:"456 Rizal Ave., Bacoor, Cavite", primaryMobile:"0918-222-3333", alternateMobile:"", primaryEmail:"j.garcia@cit.edu.ph", alternateEmail:"", college:"College of Computing Studies", department:"Computer Science", employmentStartDate:"2015-06-01", employmentType:"Permanent", academicRank:"Instructor II", bsDegree:"BS Computer Science", bsMajor:"Computer Science", bsUniversity:"UPLB", bsYear:"2007", msDegree:"MS Computer Science", msMajor:"Software Engineering", msUniversity:"UPLB", msYear:"2012", phdDegree:"", phdMajor:"", phdUniversity:"", phdYear:"", specialization:["Software Engineering","Web Development"], certifications:[{name:"Microsoft Azure Developer",org:"Microsoft",dateEarned:"2023-01",expiration:"2026-01"}], subjects:["CS301 - Software Engineering","CS201 - OOP"], sections:["BSCS-3A","BSCS-2A"], semester:"1st", academicYear:"2024-2025", maxLoad:21, currentLoad:15, research:[{title:"Microservices Architecture for Academic Systems",type:"Conference",area:"Software Engineering",year:"2024",coAuthors:"Dan Molina",doi:""}], adminRoles:["Thesis Panel Member"], awards:[], experience:[{company:"Accenture Philippines",position:"Software Engineer",years:"5",field:"Enterprise Software"}], memberships:[{org:"Philippine Society of IT Educators (PSITE)",type:"Active Member",yearJoined:"2015"}], photo:null },
  { id:"FAC-003", fullName:"Dr. Lena Lim", employeeNumber:"FAC-003", facultyStatus:"Full-Time", position:"Associate Professor", sexAtBirth:"Female", civilStatus:"Married", nationality:"Filipino", religion:"Protestant", dateOfBirth:"1980-11-08", placeOfBirth:"Bacoor, Cavite", presentAddress:"789 Aguinaldo Hwy., Dasmarinas, Cavite", permanentAddress:"789 Aguinaldo Hwy., Dasmarinas, Cavite", primaryMobile:"0919-333-4444", alternateMobile:"0917-555-6666", primaryEmail:"l.lim@cit.edu.ph", alternateEmail:"", college:"College of Computing Studies", department:"Computer Science", employmentStartDate:"2008-06-01", employmentType:"Permanent", academicRank:"Associate Professor I", bsDegree:"BS Mathematics", bsMajor:"Applied Mathematics", bsUniversity:"University of the Philippines", bsYear:"2002", msDegree:"MS Computer Science", msMajor:"Cybersecurity", msUniversity:"Ateneo de Manila", msYear:"2007", phdDegree:"PhD Information Systems", phdMajor:"Information Systems Security", phdUniversity:"De La Salle University", phdYear:"2015", specialization:["Cybersecurity","Networking","Digital Forensics"], certifications:[{name:"CISSP",org:"ISC2",dateEarned:"2021-05",expiration:"2024-05"},{name:"CompTIA Security+",org:"CompTIA",dateEarned:"2020-03",expiration:"2023-03"}], subjects:["CS401 - Cybersecurity","CS302 - Computer Networks"], sections:["BSCS-4A","BSCS-3B"], semester:"1st", academicYear:"2024-2025", maxLoad:21, currentLoad:12, research:[{title:"Zero-Trust Security Model for Higher Education",type:"Journal",area:"Cybersecurity",year:"2024",coAuthors:"",doi:"10.5678/xyz"}], adminRoles:["Department Chair","Thesis Adviser","Thesis Panel Member"], awards:[{title:"Outstanding Faculty Award",org:"CIT College",year:"2023"}], experience:[{company:"PNB IT Security Division",position:"Security Analyst",years:"4",field:"Cybersecurity"}], memberships:[{org:"IEEE Computer Society",type:"Senior Member",yearJoined:"2016"}], photo:null },
];

const EVENTS_DATA = [
  { id:"EVT-001", title:"HackITon 2025", description:"Annual hackathon where teams compete to build innovative solutions within 24 hours. Open to all IT and CS students.", type:"Hackathon", department:"Both", organizer:"Programming Guild", date:"2026-03-28", startTime:"08:00", endTime:"18:00", venue:"ICT Building Auditorium", mode:"Onsite", meetingLink:"", platform:"", capacity:120, participants:120, certificateIssued:true, semester:"2nd", participantList:[{name:"Ana Marie Reyes",program:"BSIT",year:"3rd Year",status:"Attended"},{name:"Ben Cruz",program:"BSCS",year:"3rd Year",status:"Attended"}] },
  { id:"EVT-002", title:"AI in Healthcare Seminar", description:"A seminar on applications of Artificial Intelligence in the healthcare sector, featuring industry experts from leading hospitals and tech companies.", type:"Seminar", department:"IT", organizer:"AI Research Club", date:"2026-03-12", startTime:"13:00", endTime:"17:00", venue:"Computer Lab 1", mode:"Hybrid", meetingLink:"https://zoom.us/j/12345678", platform:"Zoom", capacity:80, participants:80, certificateIssued:true, semester:"2nd", participantList:[{name:"Ana Marie Reyes",program:"BSIT",year:"3rd Year",status:"Attended"},{name:"Dan Molina",program:"BSCS",year:"4th Year",status:"Attended"}] },
  { id:"EVT-003", title:"DevOps and Cloud Bootcamp", description:"Intensive 2-day hands-on workshop covering DevOps workflows, Docker, Kubernetes, and cloud deployment on AWS and Azure.", type:"Workshop", department:"Both", organizer:"IT Department", date:"2026-04-10", startTime:"08:00", endTime:"17:00", venue:"Computer Laboratory 3", mode:"Onsite", meetingLink:"", platform:"", capacity:45, participants:45, certificateIssued:true, semester:"2nd", participantList:[] },
  { id:"EVT-004", title:"Cybersecurity Awareness Week", description:"A series of talks and hands-on labs covering the latest cybersecurity threats, ethical hacking, and digital forensics techniques.", type:"Seminar", department:"CS", organizer:"Dr. Lena Lim", date:"2026-04-22", startTime:"09:00", endTime:"12:00", venue:"Lecture Hall B", mode:"Onsite", meetingLink:"", platform:"", capacity:100, participants:60, certificateIssued:false, semester:"2nd", participantList:[] },
  { id:"EVT-005", title:"Thesis Defense - BSIT 4th Year", description:"Final thesis defense for all BSIT 4th year students for the 2nd semester of Academic Year 2025-2026.", type:"Thesis Defense", department:"IT", organizer:"Registrar Office", date:"2026-05-15", startTime:"08:00", endTime:"17:00", venue:"Conference Room A", mode:"Onsite", meetingLink:"", platform:"", capacity:60, participants:40, certificateIssued:false, semester:"2nd", participantList:[] },
  { id:"EVT-006", title:"General Assembly - CCS", description:"Semestral general assembly of all College of Computing Studies students and faculty. Attendance is required.", type:"General Assembly", department:"Both", organizer:"College of Computing Studies", date:"2026-03-20", startTime:"14:00", endTime:"16:00", venue:"Campus Gymnasium", mode:"Onsite", meetingLink:"", platform:"", capacity:500, participants:420, certificateIssued:false, semester:"2nd", participantList:[] },
];

const SCHEDULES_DATA = [
  { id:"SCH-001", courseCode:"IT401", subject:"AI Fundamentals", faculty:"Dr. Maria Santos", section:"BSIT-4A", day:"Monday", timeStart:"08:00", timeEnd:"10:00", room:"Lab 201", roomType:"Computer Laboratory", semester:"1st", year:"2024-2025" },
  { id:"SCH-002", courseCode:"IT402", subject:"Machine Learning", faculty:"Dr. Maria Santos", section:"BSIT-3A", day:"Wednesday", timeStart:"10:00", timeEnd:"12:00", room:"Lab 201", roomType:"Computer Laboratory", semester:"1st", year:"2024-2025" },
  { id:"SCH-003", courseCode:"CS301", subject:"Software Engineering", faculty:"Prof. Jose Garcia", section:"BSCS-3A", day:"Tuesday", timeStart:"08:00", timeEnd:"10:00", room:"Room 105", roomType:"Lecture Room", semester:"1st", year:"2024-2025" },
  { id:"SCH-004", courseCode:"CS401", subject:"Cybersecurity", faculty:"Dr. Lena Lim", section:"BSCS-4A", day:"Thursday", timeStart:"13:00", timeEnd:"15:00", room:"Lab 301", roomType:"Networking Lab", semester:"1st", year:"2024-2025" },
];

const RESEARCH_DATA = [
  { id:"RES-001", title:"Deep Learning for Crop Disease Detection Using CNN", abstract:"A CNN model for early detection of crop diseases using image classification on Philippine agricultural datasets.", authors:["Dr. Maria Santos","Ana Marie Reyes"], area:"Artificial Intelligence", keywords:["CNN","Deep Learning","Agriculture"], year:"2023", doi:"10.1234/abc" },
  { id:"RES-002", title:"Zero-Trust Security Model for Higher Education Institutions", abstract:"A zero-trust architecture framework for securing academic information systems in higher education.", authors:["Dr. Lena Lim"], area:"Cybersecurity", keywords:["Zero-Trust","Security","HEI"], year:"2024", doi:"10.5678/xyz" },
  { id:"RES-003", title:"Microservices Architecture for Academic Management Systems", abstract:"Analysis of microservices patterns applied to academic management systems for improved scalability.", authors:["Prof. Jose Garcia","Dan Molina"], area:"Software Engineering", keywords:["Microservices","Architecture"], year:"2024", doi:"" },
];

const CURRICULUM_DATA = [
  { id:"CUR-001", program:"BS Information Technology", version:"BSIT Curriculum 2022", status:"Active", year:"2022", courses:[
    {code:"IT101",title:"Introduction to Computing",units:3,yearLevel:1,sem:1,prereq:"None"},
    {code:"IT102",title:"Computer Programming 1",units:3,yearLevel:1,sem:1,prereq:"None"},
    {code:"IT201",title:"Data Structures and Algorithms",units:3,yearLevel:2,sem:1,prereq:"IT102"},
    {code:"IT301",title:"Web Development",units:3,yearLevel:3,sem:1,prereq:"IT201"},
    {code:"IT401",title:"AI Fundamentals",units:3,yearLevel:4,sem:1,prereq:"IT301"},
  ]},
  { id:"CUR-002", program:"BS Computer Science", version:"BSCS Curriculum 2024", status:"Active", year:"2024", courses:[
    {code:"CS101",title:"Introduction to Computer Science",units:3,yearLevel:1,sem:1,prereq:"None"},
    {code:"CS201",title:"Object-Oriented Programming",units:3,yearLevel:2,sem:1,prereq:"CS101"},
    {code:"CS301",title:"Software Engineering",units:3,yearLevel:3,sem:1,prereq:"CS201"},
    {code:"CS401",title:"Cybersecurity",units:3,yearLevel:4,sem:1,prereq:"CS301"},
  ]},
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const CREDS = [
  {role:"admin",   u:"admin",   p:"admin123",   name:"Registrar Admin"},
  {role:"faculty", u:"faculty", p:"faculty123", name:"Dr. Maria Santos"},
  {role:"student", u:"student", p:"student123", name:"Ana Marie Reyes"},
];

const ALLOWED = {
  admin:  ["dashboard","students","faculty","events","scheduling","research","curriculum","search","reports"],
  faculty:["dashboard","faculty","events","scheduling","research","curriculum"],
  student:["dashboard","events","scheduling","research","curriculum"],
};

const NAV_ITEMS = [
  {id:"dashboard",  lbl:"Dashboard"},
  {id:"students",   lbl:"Students"},
  {id:"faculty",    lbl:"Faculty"},
  {id:"events",     lbl:"Events"},
  {id:"scheduling", lbl:"Scheduling"},
  {id:"research",   lbl:"Research"},
  {id:"curriculum", lbl:"Curriculum"},
  {id:"search",     lbl:"Search"},
  {id:"reports",    lbl:"Reports"},
];

const DEPT_CLR = {IT:C.accent, CS:C.green, Both:C.purple};
const TYPE_CLR = {Hackathon:C.accent, Seminar:C.purple, Workshop:C.green, "Career Fair":C.gold, "Thesis Defense":C.teal, "General Assembly":C.red};
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LBLS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const EV_TYPES = ["Seminar","Workshop","Hackathon","Thesis Defense","General Assembly","Career Fair","Others"];

function fmt(t) {
  if (!t) return "";
  var p = t.split(":");
  var h = parseInt(p[0]);
  return (h > 12 ? h - 12 : h === 0 ? 12 : h) + ":" + p[1] + " " + (h >= 12 ? "PM" : "AM");
}

function initials(name) {
  return (name || "??").trim().split(" ").map(function(n) { return n[0] || ""; }).join("").slice(0, 2).toUpperCase();
}

function merge(obj, key, val) {
  var n = {};
  Object.keys(obj).forEach(function(k) { n[k] = obj[k]; });
  n[key] = val;
  return n;
}

// ── SHARED UI ─────────────────────────────────────────────────────────────────
function Av({ name, photo, size, color }) {
  var sz = size || 36;
  var col = color || C.accent;
  return (
    <div style={{width:sz+4,height:sz+4,borderRadius:"50%",padding:2,background:"linear-gradient(135deg,"+col+","+col+"88)",flexShrink:0}}>
      <div style={{width:sz,height:sz,borderRadius:"50%",overflow:"hidden",background:C.surfaceHi,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {photo
          ? <img src={photo} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
          : <span style={{fontWeight:800,fontSize:sz*0.32,color:col}}>{initials(name)}</span>
        }
      </div>
    </div>
  );
}

function Bdg({ label, color }) {
  return <span className="bdg" style={{background:color+"20",color:color,border:"1px solid "+color+"44"}}>{label}</span>;
}

function Lbar({ cur, max }) {
  var m = max || 21;
  var pct = Math.min((cur / m) * 100, 100);
  var col = pct >= 90 ? C.red : pct >= 65 ? C.gold : C.green;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
        <span style={{color:C.textMuted}}>Teaching Load</span>
        <span style={{color:col,fontFamily:"'JetBrains Mono',monospace"}}>{cur}/{m} hrs</span>
      </div>
      <div style={{height:5,background:C.border,borderRadius:3}}>
        <div style={{width:pct+"%",height:"100%",background:col,borderRadius:3}} />
      </div>
    </div>
  );
}

function Fl({ children }) {
  return <label style={{display:"block",fontSize:10,color:C.textMuted,fontWeight:700,letterSpacing:".7px",textTransform:"uppercase",marginBottom:5}}>{children}</label>;
}

function Fv({ label, value }) {
  return (
    <div className="fv">
      <div style={{fontSize:9,color:C.textMuted,textTransform:"uppercase",letterSpacing:"1px",fontWeight:700,marginBottom:3}}>{label}</div>
      <div style={{fontSize:13,color:value ? C.text : C.textMuted}}>{value || "Not provided"}</div>
    </div>
  );
}

function SHdr({ title, sub, action }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:15,flexWrap:"wrap",gap:8}}>
      <div>
        <h2 style={{fontSize:17,fontWeight:700}}>{title}</h2>
        {sub && <p style={{color:C.textMuted,fontSize:12,marginTop:2}}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Modal({ open, onClose, title, children, width }) {
  if (!open) return null;
  return (
    <div className="ov" onClick={onClose}>
      <div className="modal" style={{width:width||560}} onClick={function(e){e.stopPropagation();}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 20px",borderBottom:"1px solid "+C.border}}>
          <h3 style={{fontSize:15,fontWeight:700}}>{title}</h3>
          <button onClick={onClose} style={{background:"transparent",border:"none",color:C.textMuted,fontSize:18,cursor:"pointer",lineHeight:1}}>x</button>
        </div>
        <div style={{padding:20}}>{children}</div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  var col = color || C.accent;
  return (
    <div className="card ch" style={{display:"flex",alignItems:"center",gap:14}}>
      <div style={{width:42,height:42,borderRadius:10,background:col+"22",border:"1px solid "+col+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:col,flexShrink:0}}>{String(value)[0]}</div>
      <div>
        <div style={{fontSize:22,fontWeight:800,color:col}}>{value}</div>
        <div style={{fontSize:11,color:C.textMuted,marginTop:1}}>{label}</div>
      </div>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, user, onLogout }) {
  var items = NAV_ITEMS.filter(function(n) { return ALLOWED[user.role].includes(n.id); });
  return (
    <div style={{width:200,background:C.surface,borderRight:"1px solid "+C.border,display:"flex",flexDirection:"column",height:"100vh",position:"sticky",top:0,flexShrink:0}}>
      <div style={{padding:"17px 14px 13px",borderBottom:"1px solid "+C.border}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,"+C.accent+",#1a7ae8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff"}}>A</div>
          <div>
            <div style={{fontWeight:800,fontSize:11,color:C.accent,letterSpacing:".5px"}}>IT and CS APS</div>
            <div style={{fontSize:10,color:C.textMuted}}>Academic Profiling</div>
          </div>
        </div>
      </div>
      <nav style={{flex:1,padding:"8px 8px",overflowY:"auto"}}>
        {items.map(function(item) {
          return (
            <button key={item.id} className={"nbtn"+(page===item.id?" on":"")} onClick={function(){setPage(item.id);}}>
              {item.lbl}
            </button>
          );
        })}
      </nav>
      <div style={{padding:"12px",borderTop:"1px solid "+C.border}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <Av name={user.name} size={26} color={user.role==="admin"?C.gold:user.role==="faculty"?C.purple:C.accent} />
          <div style={{overflow:"hidden"}}>
            <div style={{fontSize:11,fontWeight:600,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{user.name}</div>
            <div style={{fontSize:10,color:C.textMuted,textTransform:"capitalize"}}>{user.role}</div>
          </div>
        </div>
        <button className="bo sm" style={{width:"100%"}} onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  var [u, setU] = useState("");
  var [p, setP] = useState("");
  var [err, setErr] = useState("");

  function doLogin(uv, pv) {
    var un = uv !== undefined ? uv : u;
    var pw = pv !== undefined ? pv : p;
    var match = CREDS.find(function(c) { return c.u === un.trim() && c.p === pw; });
    if (match) { onLogin({name:match.name, role:match.role}); }
    else { setErr("Invalid credentials. Click a demo row to auto-login."); }
  }

  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:390,background:C.surface,border:"1px solid "+C.border,borderRadius:16,padding:34,animation:"fadeUp .4s ease"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:50,height:50,borderRadius:13,background:"linear-gradient(135deg,"+C.accent+",#1a7ae8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:"#fff",margin:"0 auto 11px"}}>A</div>
          <h1 style={{fontSize:19,fontWeight:800}}>IT and CS APS</h1>
          <p style={{color:C.textMuted,fontSize:12,marginTop:3}}>Academic Profiling and Records System</p>
        </div>
        <div style={{marginBottom:12}}>
          <Fl>Username</Fl>
          <input value={u} onChange={function(e){setU(e.target.value);}} placeholder="Enter username" />
        </div>
        <div style={{marginBottom:13}}>
          <Fl>Password</Fl>
          <input type="password" value={p} onChange={function(e){setP(e.target.value);}} placeholder="Enter password" onKeyDown={function(e){if(e.key==="Enter")doLogin();}} />
        </div>
        {err && <div style={{color:C.red,fontSize:12,marginBottom:12,padding:"8px 11px",background:C.red+"15",borderRadius:7,border:"1px solid "+C.red+"30"}}>{err}</div>}
        <button className="bp" style={{width:"100%",padding:"11px"}} onClick={function(){doLogin();}}>Sign In</button>
        <div style={{marginTop:15,padding:12,background:C.surfaceHi,borderRadius:9,border:"1px solid "+C.border}}>
          <div style={{fontSize:10,color:C.textMuted,fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:".7px"}}>Demo Accounts - Click to Login</div>
          {CREDS.map(function(c) {
            return (
              <div key={c.role} onClick={function(){setU(c.u);setP(c.p);setErr("");doLogin(c.u,c.p);}}
                style={{display:"flex",gap:8,fontSize:11,marginBottom:4,cursor:"pointer",padding:"3px 5px",borderRadius:5,transition:"background .1s"}}
                onMouseEnter={function(e){e.currentTarget.style.background="#ffffff08";}}
                onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
                <span style={{color:C.textMuted,width:50,textTransform:"capitalize"}}>{c.role}:</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",color:C.accent}}>{c.u} / {c.p}</span>
                <span style={{marginLeft:"auto",color:C.green,fontSize:10}}>click</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ user, setPage }) {
  return (
    <div className="anim">
      <div style={{background:"linear-gradient(135deg,"+C.accent+"22,"+C.purple+"18)",border:"1px solid "+C.border,borderRadius:13,padding:"18px 22px",marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:9}}>
          <div>
            <h1 style={{fontSize:17,fontWeight:800}}>Welcome, {user.name.split(" ")[0]}</h1>
            <p style={{color:C.textMuted,fontSize:12,marginTop:2}}>IT and CS Academic Profiling System - 1st Semester A.Y. 2024-2025</p>
          </div>
          {user.role==="admin" && (
            <div style={{display:"flex",gap:7}}>
              <button className="bp sm" onClick={function(){setPage("students");}}>Manage Students</button>
              <button className="bo sm" onClick={function(){setPage("reports");}}>Reports</button>
            </div>
          )}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12,marginBottom:18}}>
        <StatCard label="Total Students" value={STUDENTS.length} color={C.accent} />
        <StatCard label="Faculty Members" value={FACULTY.length} color={C.purple} />
        <StatCard label="Research Papers" value={RESEARCH_DATA.length} color={C.green} />
        <StatCard label="Events" value={EVENTS_DATA.length} color={C.gold} />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:15}}>
        <div className="card">
          <SHdr title="Recent Students" action={<button className="bo sm" onClick={function(){setPage("students");}}>View All</button>} />
          {STUDENTS.map(function(s) {
            return (
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid "+C.border+"33"}}>
                <Av name={s.fullName} size={28} color={s.course==="BSIT"?C.accent:C.purple} />
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600}}>{s.fullName}</div>
                  <div style={{fontSize:11,color:C.textMuted}}>{s.course} - {s.section}</div>
                </div>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:s.gpa<=1.5?C.accent:s.gpa<=2?C.green:C.gold}}>{s.gpa}</span>
              </div>
            );
          })}
        </div>
        <div className="card">
          <SHdr title="Faculty Teaching Load" action={<button className="bo sm" onClick={function(){setPage("faculty");}}>View All</button>} />
          {FACULTY.map(function(f) {
            return (
              <div key={f.id} style={{padding:"9px 0",borderBottom:"1px solid "+C.border+"33"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:7}}>
                  <Av name={f.fullName} size={24} color={C.purple} />
                  <div style={{fontSize:12,fontWeight:600}}>{f.fullName}</div>
                </div>
                <Lbar cur={f.currentLoad} max={f.maxLoad} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── STUDENT PROFILE VIEW ──────────────────────────────────────────────────────
function StudentProfileView({ student, onEdit, onBack }) {
  var [tab, setTab] = useState(0);
  var TABS = ["Personal Info","Family Background","Educational Background","Enrollment"];
  var G2 = {display:"grid",gridTemplateColumns:"1fr 1fr",gap:9};
  var G3 = {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9};
  var sc = student.status==="Regular" ? C.green : C.gold;
  return (
    <div className="anim">
      <div style={{display:"flex",gap:8,marginBottom:15,flexWrap:"wrap"}}>
        <button className="bo sm" onClick={onBack}>Back</button>
        <div style={{flex:1}} />
        <button className="bp sm" onClick={onEdit}>Edit Profile</button>
        <button className="bo sm">Export PDF</button>
      </div>
      <div style={{background:"linear-gradient(135deg,"+C.surface+","+C.surfaceHi+")",border:"1px solid "+C.border,borderRadius:14,padding:"22px 24px",marginBottom:15}}>
        <div style={{display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{width:90,height:90,borderRadius:"50%",padding:3,background:"linear-gradient(135deg,"+C.accent+","+C.teal+")",flexShrink:0}}>
            <div style={{width:84,height:84,borderRadius:"50%",overflow:"hidden",background:C.surfaceHi,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {student.photo ? <img src={student.photo} alt={student.fullName} style={{width:"100%",height:"100%",objectFit:"cover"}} /> : <span style={{fontWeight:800,fontSize:26,color:C.accent}}>{initials(student.fullName)}</span>}
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:9,color:C.textMuted,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:3}}>Student Profile</div>
            <h1 style={{fontSize:21,fontWeight:800,marginBottom:3}}>{student.fullName}</h1>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.accent,marginBottom:9}}>{student.studentNumber}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              <Bdg label={student.status} color={sc} />
              <Bdg label={student.yearLevel} color={C.teal} />
              <Bdg label={student.section} color={C.accent} />
              <Bdg label={student.curriculum} color={C.gold} />
            </div>
          </div>
        </div>
      </div>
      <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:13,overflow:"hidden"}}>
        <div style={{display:"flex",borderBottom:"1px solid "+C.border,overflowX:"auto"}}>
          {TABS.map(function(t,i){return <button key={t} className={"tb"+(tab===i?" on":"")} onClick={function(){setTab(i);}}>{t}</button>;})}
        </div>
        <div style={{padding:20}}>
          {tab===0 && (
            <div>
              <div style={{fontWeight:700,fontSize:11,color:C.accent,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Basic Information</div>
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
              <div style={{marginTop:9,marginBottom:14}}><Fv label="Place of Birth" value={student.placeOfBirth} /></div>
              <div style={{fontWeight:700,fontSize:11,color:C.teal,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Contact Information</div>
              <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:9}}>
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
          {tab===1 && (
            <div>
              <div style={{fontWeight:700,fontSize:11,color:C.accent,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Father</div>
              <div style={G2}>
                <Fv label="Name" value={student.fatherName} />
                <Fv label="Occupation" value={student.fatherOccupation} />
                <Fv label="Date of Birth" value={student.fatherDOB} />
              </div>
              <div style={{height:14}} />
              <div style={{fontWeight:700,fontSize:11,color:C.teal,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Mother</div>
              <div style={G2}>
                <Fv label="Name" value={student.motherName} />
                <Fv label="Occupation" value={student.motherOccupation} />
                <Fv label="Date of Birth" value={student.motherDOB} />
              </div>
              <div style={{height:14}} />
              <div style={{fontWeight:700,fontSize:11,color:C.gold,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Other Family Details</div>
              <div style={G2}>
                <Fv label="Number of Siblings" value={student.siblings} />
                <Fv label="Family Annual Income" value={student.familyIncome} />
                <Fv label="Guardian Name" value={student.guardianName} />
                <Fv label="Relation" value={student.guardianRelation} />
                <Fv label="Guardian Contact" value={student.guardianContact} />
              </div>
            </div>
          )}
          {tab===2 && (
            <div>
              <div style={{fontWeight:700,fontSize:11,color:C.accent,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Educational Background</div>
              <div style={G2}>
                <Fv label="Last School Attended" value={student.lastSchool} />
                <Fv label="Last Year Attended" value={student.lastYearAttended} />
                <Fv label="LRN" value={student.lrn} />
                <Fv label="Honors Received" value={student.honors} />
              </div>
            </div>
          )}
          {tab===3 && (
            <div>
              <div style={{fontWeight:700,fontSize:11,color:C.accent,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Enrollment Details</div>
              <div style={G2}>
                <Fv label="College" value={student.college} />
                <Fv label="Program" value={student.program} />
                <Fv label="Curriculum" value={student.curriculum} />
                <Fv label="Year Level" value={student.yearLevel} />
                <Fv label="Section" value={student.section} />
              </div>
              <div style={{marginTop:14,background:"linear-gradient(135deg,"+C.accent+"18,"+C.teal+"10)",border:"1px solid "+C.accent+"33",borderRadius:11,padding:16,display:"flex",gap:14,alignItems:"center"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:C.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>Currently Enrolled</div>
                  <div style={{fontSize:15,fontWeight:800,marginTop:3}}>{student.program}</div>
                  <div style={{fontSize:12,color:C.textSub}}>{student.college}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:C.accent,fontWeight:700}}>2024-2025</div>
                  <div style={{fontSize:11,color:C.textSub}}>1st Semester</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── STUDENT FORM ──────────────────────────────────────────────────────────────
function StudentForm({ initial, onSave, onCancel }) {
  var [tab, setTab] = useState(0);
  var [data, setData] = useState(initial || {});
  var [photo, setPhoto] = useState((initial && initial.photo) || null);
  var fileRef = useRef();
  var TABS = ["Personal Info","Family Background","Educational Background","Enrollment"];
  var G2 = {display:"grid",gridTemplateColumns:"1fr 1fr",gap:12};

  function set(k, v) { setData(function(d){return merge(d,k,v);}); }

  function handlePhoto(e) {
    var file = e.target.files[0]; if (!file) return;
    var r = new FileReader();
    r.onload = function(ev){setPhoto(ev.target.result);set("photo",ev.target.result);};
    r.readAsDataURL(file);
  }

  function FInp(props) {
    return (
      <div style={{gridColumn:props.wide?"1 / -1":undefined}}>
        <Fl>{props.label}</Fl>
        <input type={props.type||"text"} value={data[props.f]||""} onChange={function(e){set(props.f,e.target.value);}} placeholder={props.ph||""} />
      </div>
    );
  }

  function FSel(props) {
    return (
      <div style={{gridColumn:props.wide?"1 / -1":undefined}}>
        <Fl>{props.label}</Fl>
        <select value={data[props.f]||""} onChange={function(e){set(props.f,e.target.value);}}>
          <option value="">-- Select --</option>
          {props.opts.map(function(o){return <option key={o} value={o}>{o}</option>;})}
        </select>
      </div>
    );
  }

  return (
    <div className="anim">
      <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:12,padding:18,marginBottom:14,display:"flex",gap:14,alignItems:"flex-start",flexWrap:"wrap"}}>
        <div style={{width:72,height:72,borderRadius:"50%",padding:3,background:"linear-gradient(135deg,"+C.accent+","+C.teal+")",flexShrink:0}}>
          <div onClick={function(){fileRef.current.click();}} style={{width:66,height:66,borderRadius:"50%",overflow:"hidden",background:C.surfaceHi,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            {photo ? <img src={photo} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover"}} /> : <span style={{color:C.textMuted,fontSize:10}}>Upload</span>}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto} />
        <div style={{flex:1}}>
          <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:"1px",fontWeight:700,marginBottom:3}}>{initial&&initial.fullName?"Edit Student":"Add New Student"}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:8}}>
            {TABS.map(function(t,i){return <button key={t} onClick={function(){setTab(i);}} style={{padding:"4px 11px",borderRadius:20,cursor:"pointer",border:"1px solid "+(tab===i?C.accent+"66":C.border),background:tab===i?C.accent+"15":"transparent",color:tab===i?C.accent:C.textMuted,fontSize:11,fontFamily:"'Outfit',sans-serif",fontWeight:tab===i?600:400}}>{t}</button>;})}
          </div>
        </div>
      </div>
      <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:12,padding:22}}>
        {tab===0 && (
          <div>
            <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.accent}}>Basic Information</div>
            <div style={G2}>
              <FInp label="Full Name *" f="fullName" ph="e.g. Ana Marie Reyes" wide />
              <FInp label="Student Number *" f="studentNumber" ph="e.g. 2024-10001" />
              <FSel label="Status *" f="status" opts={["Regular","Irregular"]} />
              <FSel label="Sex at Birth *" f="sexAtBirth" opts={["Male","Female"]} />
              <FSel label="Civil Status" f="civilStatus" opts={["Single","Married","Widowed","Separated"]} />
              <FSel label="Residency" f="residency" opts={["Local","Abroad"]} />
              <FInp label="Nationality" f="nationality" ph="e.g. Filipino" />
              <FInp label="Religion" f="religion" ph="e.g. Roman Catholic" />
              <FInp label="Date of Birth *" f="dateOfBirth" type="date" />
              <FInp label="Place of Birth" f="placeOfBirth" ph="City, Province" />
            </div>
            <div style={{height:16}} />
            <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.teal}}>Contact</div>
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
        {tab===1 && (
          <div>
            <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.accent}}>Father</div>
            <div style={G2}>
              <FInp label="Full Name" f="fatherName" />
              <FInp label="Occupation" f="fatherOccupation" />
              <FInp label="Date of Birth" f="fatherDOB" type="date" />
              <FSel label="Sex at Birth" f="fatherSex" opts={["Male","Female"]} />
            </div>
            <div style={{height:14}} />
            <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.teal}}>Mother</div>
            <div style={G2}>
              <FInp label="Full Name" f="motherName" />
              <FInp label="Occupation" f="motherOccupation" />
              <FInp label="Date of Birth" f="motherDOB" type="date" />
              <FSel label="Sex at Birth" f="motherSex" opts={["Male","Female"]} />
            </div>
            <div style={{height:14}} />
            <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.gold}}>Other</div>
            <div style={G2}>
              <FInp label="Number of Siblings" f="siblings" type="number" />
              <FSel label="Family Annual Income" f="familyIncome" opts={["Below P100,000","P100,000 - P249,999","P250,000 - P349,999","P350,000 - P499,999","P500,000 - P749,999","P750,000 and above"]} />
              <FInp label="Guardian Name" f="guardianName" />
              <FSel label="Relation to Guardian" f="guardianRelation" opts={["Father","Mother","Grandparent","Sibling","Aunt or Uncle","Legal Guardian","Other"]} />
              <FInp label="Guardian Contact" f="guardianContact" />
            </div>
          </div>
        )}
        {tab===2 && (
          <div>
            <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.accent}}>Educational Background</div>
            <div style={G2}>
              <FInp label="Last School Attended" f="lastSchool" wide />
              <FInp label="Last Year Attended" f="lastYearAttended" ph="e.g. 2020-2021" />
              <FInp label="LRN" f="lrn" ph="12-digit LRN" />
              <FInp label="Honors Received" f="honors" ph="e.g. With Honors" wide />
            </div>
          </div>
        )}
        {tab===3 && (
          <div>
            <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.accent}}>Enrollment Details</div>
            <div style={G2}>
              <FSel label="College" f="college" opts={["College of Computing Studies","College of Engineering","College of Business"]} wide />
              <FSel label="Program" f="program" opts={["Bachelor of Science in Information Technology","Bachelor of Science in Computer Science"]} wide />
              <FSel label="Curriculum" f="curriculum" opts={["BSIT 2018","BSIT 2022","BSCS 2024"]} />
              <FSel label="Year Level" f="yearLevel" opts={["1st Year","2nd Year","3rd Year","4th Year"]} />
              <FInp label="Section" f="section" ph="e.g. BSIT-3A" />
            </div>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:20,paddingTop:14,borderTop:"1px solid "+C.border}}>
          <div>{tab>0 && <button className="bo" onClick={function(){setTab(function(t){return t-1;});}}>Previous</button>}</div>
          <div style={{display:"flex",gap:7}}>
            <button className="bo" onClick={onCancel}>Cancel</button>
            {tab<3
              ? <button className="bp" onClick={function(){setTab(function(t){return t+1;});}}>Next</button>
              : <button className="bp" onClick={function(){var nd=merge(data,"photo",photo);onSave(nd);}}>Save Profile</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STUDENTS PAGE ─────────────────────────────────────────────────────────────
function StudentsPage({ user }) {
  var [students, setStudents] = useState(STUDENTS);
  var [search, setSearch] = useState("");
  var [fCourse, setFCourse] = useState("All");
  var [view, setView] = useState("table");
  var [sel, setSel] = useState(null);
  var [isEdit, setIsEdit] = useState(false);

  var filtered = students.filter(function(s) {
    return (fCourse==="All"||s.course===fCourse) &&
      (s.fullName.toLowerCase().includes(search.toLowerCase())||s.id.includes(search)||s.section.toLowerCase().includes(search.toLowerCase()));
  });

  if (view==="profile"&&sel) return <StudentProfileView student={sel} onEdit={function(){setIsEdit(true);setView("form");}} onBack={function(){setView("table");setSel(null);}} />;
  if (view==="form") return (
    <StudentForm initial={isEdit?sel:{}} onSave={function(d){
      if(isEdit&&sel){setStudents(function(prev){return prev.map(function(s){return s.id===sel.id?Object.assign({},s,d):s;});});setSel(Object.assign({},sel,d));setView("profile");}
      else{setStudents(function(prev){return prev.concat([Object.assign({id:"2024-0000"+(prev.length+1),course:d.program&&d.program.includes("Information")?"BSIT":"BSCS",year:1,gpa:0},d)]);});setView("table");}
    }} onCancel={function(){setView(isEdit?"profile":"table");}} />
  );

  return (
    <div className="anim">
      <SHdr title="Student Profiles" sub={filtered.length+" of "+students.length+" students"} action={user.role==="admin"&&<button className="bp sm" onClick={function(){setSel(null);setIsEdit(false);setView("form");}}>+ Add Student</button>} />
      <div style={{display:"flex",gap:9,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 200px"}}><input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search by name, ID, section..." /></div>
        <select value={fCourse} onChange={function(e){setFCourse(e.target.value);}} style={{width:110}}>
          <option>All</option><option>BSIT</option><option>BSCS</option>
        </select>
      </div>
      <div className="card" style={{padding:0}}>
        <table>
          <thead><tr><th>Student</th><th>ID</th><th>Course</th><th>Year</th><th>Section</th><th>Status</th><th>GPA</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(function(s) {
              return (
                <tr key={s.id}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <Av name={s.fullName} size={28} color={s.course==="BSIT"?C.accent:C.purple} />
                      <div>
                        <div style={{fontWeight:600,fontSize:13}}>{s.fullName}</div>
                        <div style={{fontSize:11,color:C.textMuted}}>{s.primaryEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.textMuted}}>{s.id}</span></td>
                  <td><Bdg label={s.course} color={s.course==="BSIT"?C.accent:C.purple} /></td>
                  <td>{s.year}</td>
                  <td>{s.section}</td>
                  <td><Bdg label={s.status} color={s.status==="Regular"?C.green:C.gold} /></td>
                  <td><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:s.gpa<=1.5?C.accent:s.gpa<=2?C.green:C.gold}}>{s.gpa}</span></td>
                  <td><button className="bo sm" onClick={function(){setSel(s);setView("profile");}}>View Profile</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:C.textMuted}}>No students found.</div>}
      </div>
    </div>
  );
}

// ── FACULTY PROFILE VIEW ──────────────────────────────────────────────────────
function FacultyProfileView({ fac, onEdit, onBack }) {
  var [tab, setTab] = useState(0);
  var TABS = ["Basic Info","Employment","Qualifications","Certifications","Teaching","Research","Admin and Awards","Industry"];
  var G2 = {display:"grid",gridTemplateColumns:"1fr 1fr",gap:9};
  var G3 = {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9};
  var sc = {"Full-Time":C.green,"Part-Time":C.gold,Contractual:C.red}[fac.facultyStatus]||C.green;
  return (
    <div className="anim">
      <div style={{display:"flex",gap:8,marginBottom:15,flexWrap:"wrap"}}>
        <button className="bo sm" onClick={onBack}>Back</button>
        <div style={{flex:1}} />
        <button className="bp sm" onClick={onEdit}>Edit Profile</button>
        <button className="bo sm">Export PDF</button>
      </div>
      <div style={{background:"linear-gradient(135deg,"+C.surface+","+C.surfaceHi+")",border:"1px solid "+C.border,borderRadius:14,padding:"22px 24px",marginBottom:15}}>
        <div style={{display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{width:90,height:90,borderRadius:"50%",padding:3,background:"linear-gradient(135deg,"+C.purple+","+C.accent+")",flexShrink:0}}>
            <div style={{width:84,height:84,borderRadius:"50%",overflow:"hidden",background:C.surfaceHi,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {fac.photo?<img src={fac.photo} alt={fac.fullName} style={{width:"100%",height:"100%",objectFit:"cover"}} />:<span style={{fontWeight:800,fontSize:26,color:C.purple}}>{initials(fac.fullName)}</span>}
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:9,color:C.textMuted,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:3}}>Faculty Profile</div>
            <h1 style={{fontSize:21,fontWeight:800,marginBottom:3}}>{fac.fullName}</h1>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.purple,marginBottom:9}}>{fac.employeeNumber}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              <Bdg label={fac.facultyStatus} color={sc} />
              <Bdg label={fac.position} color={C.purple} />
              <Bdg label={fac.department} color={C.accent} />
              <Bdg label={fac.academicRank} color={C.gold} />
            </div>
          </div>
        </div>
        <div style={{marginTop:14,paddingTop:12,borderTop:"1px solid "+C.border}}>
          <Lbar cur={fac.currentLoad} max={fac.maxLoad} />
        </div>
      </div>
      <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:13,overflow:"hidden"}}>
        <div style={{display:"flex",borderBottom:"1px solid "+C.border,overflowX:"auto"}}>
          {TABS.map(function(t,i){return <button key={t} className={"tb"+(tab===i?" on":"")} onClick={function(){setTab(i);}}>{t}</button>;})}
        </div>
        <div style={{padding:20}}>
          {tab===0&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.purple,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Basic Information</div>
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
            <div style={{marginTop:9,marginBottom:13}}><Fv label="Place of Birth" value={fac.placeOfBirth} /></div>
            <div style={{fontWeight:700,fontSize:11,color:C.teal,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Contact</div>
            <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:9}}>
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
          {tab===1&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.gold,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Employment</div>
            <div style={G2}>
              <Fv label="College" value={fac.college} />
              <Fv label="Department" value={fac.department} />
              <Fv label="Start Date" value={fac.employmentStartDate} />
              <Fv label="Employment Type" value={fac.employmentType} />
              <Fv label="Academic Rank" value={fac.academicRank} />
            </div>
          </div>}
          {tab===2&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.accent,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Qualifications</div>
            {[["Bachelor's Degree",fac.bsDegree,fac.bsMajor,fac.bsUniversity,fac.bsYear],["Master's Degree",fac.msDegree,fac.msMajor,fac.msUniversity,fac.msYear],["Doctorate Degree",fac.phdDegree,fac.phdMajor,fac.phdUniversity,fac.phdYear]].map(function(d){return(
              <div key={d[0]} style={{padding:13,background:C.surfaceHi,borderRadius:9,marginBottom:9,border:"1px solid "+C.border}}>
                <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:".8px",fontWeight:700,marginBottom:5}}>{d[0]}</div>
                {d[1]?<div><div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{d[1]}</div><div style={{fontSize:12,color:C.accent}}>Major: {d[2]||"N/A"}</div><div style={{fontSize:12,color:C.textSub}}>{d[3]} - {d[4]}</div></div>:<div style={{fontSize:12,color:C.textMuted,fontStyle:"italic"}}>Not provided</div>}
              </div>
            );})}
            <div style={{marginTop:12,fontSize:11,fontWeight:700,color:C.green,marginBottom:9,textTransform:"uppercase",letterSpacing:".8px"}}>Specializations</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {(fac.specialization||[]).map(function(s){return <Bdg key={s} label={s} color={C.green} />;} )}
            </div>
          </div>}
          {tab===3&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.gold,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Certifications</div>
            {fac.certifications&&fac.certifications.length>0?fac.certifications.map(function(c,i){return(
              <div key={i} style={{padding:13,background:C.surfaceHi,borderRadius:9,marginBottom:9,border:"1px solid "+C.gold+"33"}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{c.name}</div>
                <div style={{fontSize:12,color:C.accent}}>Issued by: {c.org}</div>
                <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>Earned: {c.dateEarned} | Expires: {c.expiration||"N/A"}</div>
              </div>
            );}):<div style={{color:C.textMuted,textAlign:"center",padding:30,fontStyle:"italic"}}>No certifications recorded.</div>}
          </div>}
          {tab===4&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.accent,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Teaching</div>
            <div style={{marginBottom:13}}><Lbar cur={fac.currentLoad} max={fac.maxLoad} /></div>
            <div style={G2}>
              <Fv label="Semester" value={fac.semester} />
              <Fv label="Academic Year" value={fac.academicYear} />
              <Fv label="Max Load" value={(fac.maxLoad||21)+" hours"} />
              <Fv label="Current Load" value={fac.currentLoad+" hours"} />
            </div>
            <div style={{marginTop:13,fontSize:11,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:".8px",marginBottom:8}}>Subjects</div>
            {fac.subjects.map(function(s,i){return <div key={i} style={{padding:"8px 12px",background:C.surfaceHi,borderRadius:7,marginBottom:6,fontSize:13,borderLeft:"3px solid "+C.accent}}>{s}</div>;})}
            <div style={{marginTop:13,fontSize:11,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:".8px",marginBottom:8}}>Sections</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {fac.sections.map(function(s){return <Bdg key={s} label={s} color={C.accent} />;} )}
            </div>
          </div>}
          {tab===5&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.teal,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Research</div>
            {fac.research&&fac.research.length>0?fac.research.map(function(r,i){
              var AC2 = {"Artificial Intelligence":C.accent,Cybersecurity:C.red,"Software Engineering":C.purple};
              var col=AC2[r.area]||C.teal;
              return(
                <div key={i} style={{padding:13,background:C.surfaceHi,borderRadius:9,marginBottom:9,borderTop:"3px solid "+col}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:7}}>{r.title}</div>
                  <div style={{display:"flex",gap:5,marginBottom:7,flexWrap:"wrap"}}>
                    <Bdg label={r.area} color={col} />
                    <Bdg label={r.type} color={C.purple} />
                    <Bdg label={r.year} color={C.textSub} />
                  </div>
                  {r.coAuthors&&<div style={{fontSize:12,color:C.textSub}}>Co-Authors: {r.coAuthors}</div>}
                  {r.doi&&<div style={{fontSize:12,color:C.accent}}>DOI: {r.doi}</div>}
                </div>
              );}):<div style={{color:C.textMuted,textAlign:"center",padding:30}}>No research recorded.</div>}
          </div>}
          {tab===6&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.purple,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Administrative Roles</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              {fac.adminRoles&&fac.adminRoles.length>0?fac.adminRoles.map(function(r){return <Bdg key={r} label={r} color={C.purple} />;}):<div style={{color:C.textMuted,fontStyle:"italic",fontSize:13}}>No roles recorded.</div>}
            </div>
            <div style={{fontWeight:700,fontSize:11,color:C.gold,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Awards</div>
            {fac.awards&&fac.awards.length>0?fac.awards.map(function(a,i){return(
              <div key={i} style={{padding:12,background:C.gold+"15",borderRadius:9,marginBottom:7,border:"1px solid "+C.gold+"33"}}>
                <div style={{fontWeight:700,fontSize:13,color:C.gold}}>{a.title}</div>
                <div style={{fontSize:11,color:C.textMuted}}>{a.org} - {a.year}</div>
              </div>
            );}):<div style={{color:C.textMuted,textAlign:"center",padding:24,fontStyle:"italic"}}>No awards recorded.</div>}
          </div>}
          {tab===7&&<div>
            <div style={{fontWeight:700,fontSize:11,color:C.accent,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Industry Experience</div>
            {fac.experience&&fac.experience.length>0?fac.experience.map(function(e,i){return(
              <div key={i} style={{padding:13,background:C.surfaceHi,borderRadius:9,marginBottom:9}}>
                <div style={{fontWeight:700,fontSize:14}}>{e.position}</div>
                <div style={{fontSize:13,color:C.accent}}>{e.company}</div>
                <div style={{fontSize:11,color:C.textMuted}}>{e.years} years - {e.field}</div>
              </div>
            );}):<div style={{color:C.textMuted,textAlign:"center",padding:24,fontStyle:"italic"}}>No experience recorded.</div>}
            <div style={{marginTop:14,fontWeight:700,fontSize:11,color:C.teal,marginBottom:11,textTransform:"uppercase",letterSpacing:".8px"}}>Memberships</div>
            {fac.memberships&&fac.memberships.length>0?fac.memberships.map(function(m,i){return(
              <div key={i} style={{padding:12,background:C.surfaceHi,borderRadius:9,marginBottom:7,border:"1px solid "+C.teal+"33"}}>
                <div style={{fontWeight:600,fontSize:13}}>{m.org}</div>
                <div style={{fontSize:11,color:C.textMuted}}>{m.type} - Joined {m.yearJoined}</div>
              </div>
            );}):<div style={{color:C.textMuted,textAlign:"center",padding:24,fontStyle:"italic"}}>No memberships.</div>}
          </div>}
        </div>
      </div>
    </div>
  );
}

// ── FACULTY FORM ──────────────────────────────────────────────────────────────
function FacultyForm({ initial, onSave, onCancel }) {
  var [tab, setTab] = useState(0);
  var [data, setData] = useState(initial || {});
  var [photo, setPhoto] = useState((initial && initial.photo) || null);
  var fileRef = useRef();
  var TABS = ["Basic Info","Employment","Qualifications","Teaching","Roles and Skills"];
  var G2 = {display:"grid",gridTemplateColumns:"1fr 1fr",gap:12};

  function set(k, v) { setData(function(d){return merge(d,k,v);}); }
  function handlePhoto(e) {
    var file=e.target.files[0]; if(!file) return;
    var r=new FileReader();
    r.onload=function(ev){setPhoto(ev.target.result);set("photo",ev.target.result);};
    r.readAsDataURL(file);
  }

  function FInp(props) {
    return (
      <div style={{gridColumn:props.wide?"1 / -1":undefined}}>
        <Fl>{props.label}</Fl>
        <input type={props.type||"text"} value={data[props.f]||""} onChange={function(e){set(props.f,e.target.value);}} placeholder={props.ph||""} />
      </div>
    );
  }

  function FSel(props) {
    return (
      <div style={{gridColumn:props.wide?"1 / -1":undefined}}>
        <Fl>{props.label}</Fl>
        <select value={data[props.f]||""} onChange={function(e){set(props.f,e.target.value);}}>
          <option value="">-- Select --</option>
          {props.opts.map(function(o){return <option key={o} value={o}>{o}</option>;})}
        </select>
      </div>
    );
  }

  return (
    <div className="anim">
      <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:12,padding:18,marginBottom:14,display:"flex",gap:14,alignItems:"flex-start",flexWrap:"wrap"}}>
        <div style={{width:72,height:72,borderRadius:"50%",padding:3,background:"linear-gradient(135deg,"+C.purple+","+C.accent+")",flexShrink:0}}>
          <div onClick={function(){fileRef.current.click();}} style={{width:66,height:66,borderRadius:"50%",overflow:"hidden",background:C.surfaceHi,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            {photo?<img src={photo} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover"}} />:<span style={{color:C.textMuted,fontSize:10}}>Upload</span>}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto} />
        <div style={{flex:1}}>
          <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:"1px",fontWeight:700,marginBottom:3}}>{initial&&initial.fullName?"Edit Faculty":"Add New Faculty"}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:8}}>
            {TABS.map(function(t,i){return <button key={t} onClick={function(){setTab(i);}} style={{padding:"4px 11px",borderRadius:20,cursor:"pointer",border:"1px solid "+(tab===i?C.purple+"66":C.border),background:tab===i?C.purple+"15":"transparent",color:tab===i?C.purple:C.textMuted,fontSize:11,fontFamily:"'Outfit',sans-serif",fontWeight:tab===i?600:400}}>{t}</button>;})}
          </div>
        </div>
      </div>
      <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:12,padding:22}}>
        {tab===0&&<div>
          <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.purple}}>Basic Information</div>
          <div style={G2}>
            <FInp label="Full Name *" f="fullName" ph="e.g. Dr. Maria Santos" wide />
            <FInp label="Employee ID *" f="employeeNumber" ph="e.g. FAC-001" />
            <FSel label="Faculty Status *" f="facultyStatus" opts={["Full-Time","Part-Time","Contractual"]} />
            <FSel label="Position *" f="position" opts={["Dean","Department Chair","Program Head","Professor","Associate Professor","Assistant Professor","Instructor","Lecturer"]} />
            <FSel label="Sex at Birth *" f="sexAtBirth" opts={["Male","Female"]} />
            <FSel label="Civil Status" f="civilStatus" opts={["Single","Married","Widowed","Separated"]} />
            <FInp label="Nationality" f="nationality" />
            <FInp label="Religion" f="religion" />
            <FInp label="Date of Birth *" f="dateOfBirth" type="date" />
            <FInp label="Place of Birth" f="placeOfBirth" />
          </div>
          <div style={{height:14}} />
          <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.teal}}>Contact</div>
          <div style={G2}>
            <FInp label="Present Address" f="presentAddress" wide />
            <FInp label="Permanent Address" f="permanentAddress" wide />
            <FInp label="Primary Mobile *" f="primaryMobile" />
            <FInp label="Alternate Mobile" f="alternateMobile" />
            <FInp label="Primary Email *" f="primaryEmail" type="email" />
            <FInp label="Alternate Email" f="alternateEmail" type="email" />
          </div>
        </div>}
        {tab===1&&<div>
          <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.gold}}>Employment</div>
          <div style={G2}>
            <FSel label="College" f="college" opts={["College of Computing Studies","College of Engineering","College of Business"]} wide />
            <FSel label="Department" f="department" opts={["Information Technology","Computer Science"]} />
            <FInp label="Employment Start Date" f="employmentStartDate" type="date" />
            <FSel label="Employment Type" f="employmentType" opts={["Permanent","Probationary","Contractual"]} />
            <FSel label="Academic Rank" f="academicRank" opts={["Instructor I","Instructor II","Instructor III","Assistant Professor I","Assistant Professor II","Associate Professor I","Associate Professor II","Professor I","Professor II"]} wide />
          </div>
        </div>}
        {tab===2&&<div>
          {[["Bachelor's Degree","bs"],["Master's Degree","ms"],["Doctorate Degree","phd"]].map(function(deg){return(
            <div key={deg[0]}>
              <div style={{fontWeight:700,fontSize:12,marginBottom:11,color:deg[1]==="phd"?C.gold:C.accent}}>{deg[0]}</div>
              <div style={G2}>
                <FInp label="Degree Title" f={deg[1]+"Degree"} />
                <FInp label="Major" f={deg[1]+"Major"} />
                <FInp label="University" f={deg[1]+"University"} />
                <FInp label="Year Graduated" f={deg[1]+"Year"} />
              </div>
              <div style={{height:13}} />
            </div>
          );})}
        </div>}
        {tab===3&&<div>
          <div style={{fontWeight:700,fontSize:12,marginBottom:13,color:C.accent}}>Teaching Load</div>
          <div style={G2}>
            <FSel label="Semester" f="semester" opts={["1st","2nd","Summer"]} />
            <FInp label="Academic Year" f="academicYear" ph="e.g. 2024-2025" />
            <FInp label="Max Teaching Load" f="maxLoad" type="number" ph="21" />
            <FInp label="Current Teaching Load" f="currentLoad" type="number" ph="0" />
          </div>
          <div style={{height:12}} />
          <Fl>Subjects Handled (one per line)</Fl>
          <textarea rows={4} value={data.subjectsText||""} onChange={function(e){set("subjectsText",e.target.value);}} placeholder={"IT401 - AI Fundamentals\nIT402 - Machine Learning"} style={{resize:"vertical"}} />
        </div>}
        {tab===4&&<div>
          <div style={{fontWeight:700,fontSize:12,marginBottom:11,color:C.purple}}>Administrative Roles</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
            {["Dean","Department Chair","Program Coordinator","Research Coordinator","Thesis Adviser","Thesis Panel Member"].map(function(role){
              var on=data.adminRoles&&data.adminRoles.includes(role);
              return <button key={role} onClick={function(){var cur=data.adminRoles||[];set("adminRoles",on?cur.filter(function(r){return r!==role;}):cur.concat([role]));}} style={{padding:"5px 12px",borderRadius:20,cursor:"pointer",border:"1px solid "+(on?C.purple+"66":C.border),background:on?C.purple+"15":"transparent",color:on?C.purple:C.textMuted,fontSize:12,fontFamily:"'Outfit',sans-serif",fontWeight:on?600:400}}>{role}</button>;
            })}
          </div>
          <div style={{fontWeight:700,fontSize:12,marginBottom:11,color:C.green}}>Specializations</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {["Artificial Intelligence","Data Science","Cybersecurity","Networking","Software Engineering","Web Development","Game Development","Mobile Development"].map(function(sp){
              var on=data.specialization&&data.specialization.includes(sp);
              return <button key={sp} onClick={function(){var cur=data.specialization||[];set("specialization",on?cur.filter(function(s){return s!==sp;}):cur.concat([sp]));}} style={{padding:"5px 12px",borderRadius:20,cursor:"pointer",border:"1px solid "+(on?C.green+"66":C.border),background:on?C.green+"15":"transparent",color:on?C.green:C.textMuted,fontSize:12,fontFamily:"'Outfit',sans-serif",fontWeight:on?600:400}}>{sp}</button>;
            })}
          </div>
        </div>}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:20,paddingTop:14,borderTop:"1px solid "+C.border}}>
          <div>{tab>0&&<button className="bo" onClick={function(){setTab(function(t){return t-1;});}}>Previous</button>}</div>
          <div style={{display:"flex",gap:7}}>
            <button className="bo" onClick={onCancel}>Cancel</button>
            {tab<4?<button className="bp" onClick={function(){setTab(function(t){return t+1;});}}>Next</button>:<button className="bp" onClick={function(){var nd=merge(data,"photo",photo);onSave(nd);}}>Save Profile</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FACULTY PAGE ──────────────────────────────────────────────────────────────
function FacultyPage({ user }) {
  var [facList, setFacList] = useState(FACULTY);
  var [search, setSearch] = useState("");
  var [fDept, setFDept] = useState("All");
  var [view, setView] = useState("list");
  var [sel, setSel] = useState(null);
  var [isEdit, setIsEdit] = useState(false);

  var filtered = facList.filter(function(f) {
    return (fDept==="All"||f.department===fDept) &&
      (f.fullName.toLowerCase().includes(search.toLowerCase())||f.position.toLowerCase().includes(search.toLowerCase()));
  });

  if (view==="profile"&&sel) return <FacultyProfileView fac={sel} onEdit={function(){setIsEdit(true);setView("form");}} onBack={function(){setView("list");setSel(null);}} />;
  if (view==="form") return (
    <FacultyForm initial={isEdit?sel:{}} onSave={function(d){
      if(isEdit&&sel){setFacList(function(prev){return prev.map(function(f){return f.id===sel.id?Object.assign({},f,d):f;});});setSel(Object.assign({},sel,d));setView("profile");}
      else{setFacList(function(prev){return prev.concat([Object.assign({id:"FAC-00"+(prev.length+1)},d)]);});setView("list");}
    }} onCancel={function(){setView(isEdit?"profile":"list");}} />
  );

  return (
    <div className="anim">
      <SHdr title="Faculty Profiles" sub={filtered.length+" of "+facList.length+" faculty"} action={user.role==="admin"&&<button className="bp sm" onClick={function(){setSel(null);setIsEdit(false);setView("form");}}>+ Add Faculty</button>} />
      <div style={{display:"flex",gap:9,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 200px"}}><input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search by name, position..." /></div>
        <select value={fDept} onChange={function(e){setFDept(e.target.value);}} style={{width:200}}>
          <option>All</option><option>Information Technology</option><option>Computer Science</option>
        </select>
      </div>
      <div className="card" style={{padding:0}}>
        <table>
          <thead><tr><th>Faculty</th><th>ID</th><th>Department</th><th>Position</th><th>Status</th><th>Rank</th><th>Load</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(function(f) {
              var sc={"Full-Time":C.green,"Part-Time":C.gold,Contractual:C.red}[f.facultyStatus]||C.green;
              var lc=f.currentLoad>=18?C.red:f.currentLoad>=12?C.gold:C.green;
              return (
                <tr key={f.id}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <Av name={f.fullName} size={28} color={C.purple} />
                      <div>
                        <div style={{fontWeight:600,fontSize:13}}>{f.fullName}</div>
                        <div style={{fontSize:11,color:C.textMuted}}>{f.primaryEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.textMuted}}>{f.employeeNumber}</span></td>
                  <td><Bdg label={f.department} color={f.department==="Information Technology"?C.accent:C.purple} /></td>
                  <td style={{fontSize:12}}>{f.position}</td>
                  <td><Bdg label={f.facultyStatus} color={sc} /></td>
                  <td style={{fontSize:11,color:C.textSub}}>{f.academicRank}</td>
                  <td>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,color:lc}}>{f.currentLoad}/21</span>
                    <div style={{width:50,height:4,background:C.border,borderRadius:2,marginTop:3}}><div style={{width:Math.min((f.currentLoad/21)*100,100)+"%",height:"100%",background:lc,borderRadius:2}} /></div>
                  </td>
                  <td><button className="bo sm" onClick={function(){setSel(f);setView("profile");}}>View Profile</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:C.textMuted}}>No faculty found.</div>}
      </div>
    </div>
  );
}

// ── EVENTS PAGE ───────────────────────────────────────────────────────────────
function EventsPage({ user }) {
  var [events, setEvents] = useState(EVENTS_DATA);
  var [viewMode, setViewMode] = useState("calendar");
  var [calView, setCalView] = useState("month");
  var [curDate, setCurDate] = useState(new Date(2026, 2, 1));
  var [fDept, setFDept] = useState("All");
  var [fType, setFType] = useState("All");
  var [fSem, setFSem] = useState("All");
  var [search, setSearch] = useState("");
  var [sel, setSel] = useState(null);
  var [showPart, setShowPart] = useState(false);
  var [showAdd, setShowAdd] = useState(false);
  var [addErr, setAddErr] = useState("");
  var [ne, setNe] = useState({title:"",description:"",type:"Seminar",department:"Both",organizer:"",date:"",startTime:"08:00",endTime:"10:00",venue:"",mode:"Onsite",meetingLink:"",platform:"Zoom",capacity:50,semester:"2nd"});

  var yr = curDate.getFullYear();
  var mo = curDate.getMonth();
  var totalDays = new Date(yr, mo+1, 0).getDate();
  var firstDay = (function(){var d=new Date(yr,mo,1).getDay();return d===0?6:d-1;})();
  var today = new Date();

  var filtered = events.filter(function(e) {
    return (fDept==="All"||e.department===fDept) && (fType==="All"||e.type===fType) &&
      (fSem==="All"||e.semester===fSem) &&
      (!search||e.title.toLowerCase().includes(search.toLowerCase())||e.organizer.toLowerCase().includes(search.toLowerCase()));
  });

  function evOnDay(day) {
    var ds = yr+"-"+String(mo+1).padStart(2,"0")+"-"+String(day).padStart(2,"0");
    return filtered.filter(function(e){return e.date===ds;});
  }

  function setNEF(k,v){setNe(function(d){return merge(d,k,v);});}

  function saveEvent() {
    var conflict = events.find(function(e){return e.id!==ne.id&&e.date===ne.date&&e.venue===ne.venue&&ne.startTime<e.endTime&&ne.endTime>e.startTime;});
    if (conflict){setAddErr("Conflict: "+ne.venue+" already booked on "+ne.date+" for '"+conflict.title+"'.");return;}
    setEvents(function(prev){return prev.concat([Object.assign({},ne,{id:"EVT-00"+(prev.length+1),participants:0,certificateIssued:false,participantList:[]})]);});
    setShowAdd(false);setAddErr("");
  }

  return (
    <div className="anim">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:15,flexWrap:"wrap",gap:8}}>
        <div>
          <h2 style={{fontSize:17,fontWeight:700}}>Events and Academic Calendar</h2>
          <p style={{color:C.textMuted,fontSize:12,marginTop:2}}>{filtered.length} event{filtered.length!==1?"s":""} - A.Y. 2025-2026</p>
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          <div style={{display:"flex",background:C.surfaceHi,borderRadius:7,padding:3,border:"1px solid "+C.border}}>
            {[["calendar","Calendar"],["list","List"]].map(function(kv){
              return <button key={kv[0]} onClick={function(){setViewMode(kv[0]);}} style={{padding:"5px 12px",borderRadius:5,border:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:viewMode===kv[0]?700:400,background:viewMode===kv[0]?C.accent:"transparent",color:viewMode===kv[0]?"#000":C.textMuted}}>{kv[1]}</button>;
            })}
          </div>
          {user.role==="admin"&&<button className="bp sm" onClick={function(){setShowAdd(true);setAddErr("");}}>+ Add Event</button>}
        </div>
      </div>

      <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:10,padding:"11px 14px",marginBottom:14}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:"1 1 160px"}}><input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search events..." style={{fontSize:12}} /></div>
          <select value={fDept} onChange={function(e){setFDept(e.target.value);}} style={{fontSize:12,padding:"8px 10px",width:145}}>
            <option value="All">All Departments</option>
            <option value="IT">IT Only</option><option value="CS">CS Only</option><option value="Both">Both</option>
          </select>
          <select value={fType} onChange={function(e){setFType(e.target.value);}} style={{fontSize:12,padding:"8px 10px",width:145}}>
            <option value="All">All Types</option>
            {EV_TYPES.map(function(t){return <option key={t} value={t}>{t}</option>;})}
          </select>
          <select value={fSem} onChange={function(e){setFSem(e.target.value);}} style={{fontSize:12,padding:"8px 10px",width:145}}>
            <option value="All">All Semesters</option>
            <option value="1st">1st Semester</option><option value="2nd">2nd Semester</option><option value="Summer">Summer</option>
          </select>
          {viewMode==="calendar"&&(
            <div style={{display:"flex",background:C.surfaceHi,borderRadius:6,padding:3,border:"1px solid "+C.border}}>
              {[["month","Month"],["week","Week"]].map(function(kv){
                return <button key={kv[0]} onClick={function(){setCalView(kv[0]);}} style={{padding:"4px 10px",borderRadius:4,border:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:calView===kv[0]?700:400,background:calView===kv[0]?C.accent+"33":"transparent",color:calView===kv[0]?C.accent:C.textMuted}}>{kv[1]}</button>;
              })}
            </div>
          )}
        </div>
      </div>

      {viewMode==="calendar"&&(
        <div style={{background:C.surface,border:"1px solid "+C.border,borderRadius:13,overflow:"hidden"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 18px",borderBottom:"1px solid "+C.border}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <button onClick={function(){setCurDate(function(d){var nd=new Date(d);nd.setMonth(nd.getMonth()-1);return nd;});}} style={{width:28,height:28,borderRadius:6,border:"1px solid "+C.border,background:C.surfaceHi,color:C.textSub,cursor:"pointer",fontSize:13}}>&lt;</button>
              <h3 style={{fontSize:14,fontWeight:800,minWidth:140,textAlign:"center"}}>{MONTH_NAMES[mo]} {yr}</h3>
              <button onClick={function(){setCurDate(function(d){var nd=new Date(d);nd.setMonth(nd.getMonth()+1);return nd;});}} style={{width:28,height:28,borderRadius:6,border:"1px solid "+C.border,background:C.surfaceHi,color:C.textSub,cursor:"pointer",fontSize:13}}>&gt;</button>
              <button onClick={function(){setCurDate(new Date(2026,2,1));}} style={{padding:"4px 11px",borderRadius:6,border:"1px solid "+C.border,background:"transparent",color:C.accent,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:600}}>Today</button>
            </div>
            <div style={{display:"flex",gap:11}}>
              {[["IT",C.accent],["CS",C.green],["Both",C.purple]].map(function(kv){return(
                <div key={kv[0]} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:kv[1]}} /><span style={{fontSize:11,color:C.textMuted}}>{kv[0]}</span></div>
              );})}
            </div>
          </div>
          {calView==="month"&&(
            <div style={{padding:11}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:4}}>
                {DAY_LBLS.map(function(d){return <div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:C.textMuted,padding:"3px 0"}}>{d}</div>;})}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
                {Array.from({length:firstDay},function(_,i){return <div key={"x"+i} style={{minHeight:82}} />;} )}
                {Array.from({length:totalDays},function(_,i){
                  var day=i+1;
                  var dayEvs=evOnDay(day);
                  var isTdy=today.getFullYear()===yr&&today.getMonth()===mo&&today.getDate()===day;
                  return (
                    <div key={day} style={{minHeight:82,background:isTdy?C.accent+"0a":C.bg,border:"1px solid "+(isTdy?C.accent+"44":C.border),borderRadius:6,padding:"5px 6px",overflow:"hidden"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{fontSize:11,fontWeight:isTdy?800:500,color:isTdy?C.accent:C.textSub}}>{day}</span>
                        {dayEvs.length>2&&<span style={{fontSize:9,color:C.textMuted}}>+{dayEvs.length-2}</span>}
                      </div>
                      {dayEvs.slice(0,2).map(function(ev){
                        var col=DEPT_CLR[ev.department]||C.accent;
                        return <div key={ev.id} onClick={function(){setSel(ev);}} style={{background:col+"22",borderLeft:"3px solid "+col,borderRadius:3,padding:"2px 5px",marginBottom:2,cursor:"pointer",fontSize:10,fontWeight:600,color:col,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ev.title}</div>;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {calView==="week"&&(
            <div style={{padding:11}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:5}}>
                {Array.from({length:7},function(_,i){
                  var d=new Date(2026,2,8+i);
                  var ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
                  var dayEvs=filtered.filter(function(e){return e.date===ds;});
                  return (
                    <div key={i} style={{background:C.surfaceHi,border:"1px solid "+C.border,borderRadius:8,padding:9,minHeight:100}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.textMuted,marginBottom:6}}>{DAY_LBLS[i]}<br/><span style={{fontSize:16,color:C.text}}>{d.getDate()}</span></div>
                      {dayEvs.map(function(ev){
                        var col=DEPT_CLR[ev.department]||C.accent;
                        return <div key={ev.id} onClick={function(){setSel(ev);}} style={{background:col+"22",borderRadius:5,padding:"4px 7px",marginBottom:4,cursor:"pointer",fontSize:10,fontWeight:600,color:col}}>{ev.title}</div>;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode==="list"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:12}}>
          {filtered.length===0&&<div style={{textAlign:"center",padding:55,color:C.textMuted,gridColumn:"1/-1"}}>No events match your filters.</div>}
          {filtered.map(function(ev){
            var dCol=DEPT_CLR[ev.department]||C.accent;
            var tCol=TYPE_CLR[ev.type]||C.accent;
            return (
              <div key={ev.id} className="card ch" style={{cursor:"pointer",borderTop:"3px solid "+dCol}} onClick={function(){setSel(ev);}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                  <Bdg label={ev.type} color={tCol} />
                  <Bdg label={"Dept: "+ev.department} color={dCol} />
                </div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:5}}>{ev.title}</div>
                <div style={{fontSize:12,color:C.textMuted,marginBottom:9,lineHeight:1.5}}>{ev.description.slice(0,80)}...</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:8,fontSize:11,color:C.textMuted}}>
                  <div>{ev.date}</div>
                  <div>{fmt(ev.startTime)} - {fmt(ev.endTime)}</div>
                  <div>{ev.venue}</div>
                  <div>{ev.participants}/{ev.capacity} participants</div>
                </div>
                <div style={{display:"flex",gap:5,borderTop:"1px solid "+C.border,paddingTop:7}}>
                  <Bdg label={ev.mode} color={ev.mode==="Online"?C.accent:ev.mode==="Hybrid"?C.teal:C.green} />
                  <Bdg label={ev.semester+" Sem"} color={C.purple} />
                  {ev.certificateIssued&&<Bdg label="Cert" color={C.gold} />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={!!sel&&!showPart} onClose={function(){setSel(null);}} title={sel?sel.title:""} width={560}>
        {sel&&(
          <div>
            <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
              <Bdg label={"Dept: "+sel.department} color={DEPT_CLR[sel.department]||C.accent} />
              <Bdg label={sel.type} color={TYPE_CLR[sel.type]||C.accent} />
              <Bdg label={sel.mode} color={sel.mode==="Onsite"?C.green:C.accent} />
            </div>
            <p style={{fontSize:13,color:C.textSub,lineHeight:1.7,marginBottom:14}}>{sel.description}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              <Fv label="Organizer" value={sel.organizer} />
              <Fv label="Date" value={sel.date} />
              <Fv label="Start Time" value={fmt(sel.startTime)} />
              <Fv label="End Time" value={fmt(sel.endTime)} />
              <Fv label="Venue" value={sel.venue} />
              <Fv label="Capacity" value={String(sel.capacity)} />
              <Fv label="Semester" value={sel.semester+" Semester"} />
              <Fv label="Participants" value={sel.participants+"/"+sel.capacity} />
            </div>
            {sel.mode!=="Onsite"&&sel.meetingLink&&(
              <div style={{padding:10,background:C.accent+"15",border:"1px solid "+C.accent+"33",borderRadius:8,marginBottom:12}}>
                <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:"1px",fontWeight:700,marginBottom:3}}>Online Link - {sel.platform}</div>
                <div style={{fontSize:12,color:C.accent}}>{sel.meetingLink}</div>
              </div>
            )}
            <div style={{display:"flex",gap:7,justifyContent:"flex-end",paddingTop:12,borderTop:"1px solid "+C.border}}>
              <button className="bo sm" onClick={function(){setShowPart(true);}}>View Participants</button>
              {user.role==="admin"&&<button className="bp sm">Edit Event</button>}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={showPart&&!!sel} onClose={function(){setShowPart(false);}} title={"Participants - "+(sel?sel.title:"")} width={580}>
        {sel&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:700}}>Participant List</div>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:C.accent}}>{sel.participantList.length} / {sel.capacity}</span>
            </div>
            {sel.participantList.length>0
              ?<table>
                <thead><tr><th>Student Name</th><th>Program</th><th>Year</th><th>Status</th></tr></thead>
                <tbody>{sel.participantList.map(function(p,i){
                  var sc=p.status==="Attended"?C.green:C.gold;
                  return <tr key={i}><td style={{fontWeight:600}}>{p.name}</td><td><Bdg label={p.program} color={p.program==="BSIT"?C.accent:C.purple} /></td><td>{p.year}</td><td><Bdg label={p.status} color={sc} /></td></tr>;
                })}</tbody>
              </table>
              :<div style={{textAlign:"center",padding:30,color:C.textMuted,fontStyle:"italic"}}>No participants recorded yet.</div>
            }
          </div>
        )}
      </Modal>

      <Modal open={showAdd} onClose={function(){setShowAdd(false);}} title="Add New Event" width={620}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
          <div style={{gridColumn:"1/-1"}}><Fl>Event Title *</Fl><input value={ne.title} onChange={function(e){setNEF("title",e.target.value);}} placeholder="e.g. HackITon 2026" /></div>
          <div style={{gridColumn:"1/-1"}}><Fl>Description</Fl><textarea rows={3} value={ne.description} onChange={function(e){setNEF("description",e.target.value);}} style={{resize:"vertical"}} /></div>
          <div>
            <Fl>Event Type *</Fl>
            <select value={ne.type} onChange={function(e){setNEF("type",e.target.value);}}>
              {EV_TYPES.map(function(t){return <option key={t}>{t}</option>;})}
            </select>
          </div>
          <div>
            <Fl>Department *</Fl>
            <select value={ne.department} onChange={function(e){setNEF("department",e.target.value);}}>
              <option value="IT">Information Technology</option>
              <option value="CS">Computer Science</option>
              <option value="Both">Both Departments</option>
            </select>
          </div>
          <div><Fl>Event Date *</Fl><input type="date" value={ne.date} onChange={function(e){setNEF("date",e.target.value);}} /></div>
          <div><Fl>Organizer</Fl><input value={ne.organizer} onChange={function(e){setNEF("organizer",e.target.value);}} /></div>
          <div><Fl>Start Time</Fl><input type="time" value={ne.startTime} onChange={function(e){setNEF("startTime",e.target.value);}} /></div>
          <div><Fl>End Time</Fl><input type="time" value={ne.endTime} onChange={function(e){setNEF("endTime",e.target.value);}} /></div>
          <div><Fl>Venue</Fl><input value={ne.venue} onChange={function(e){setNEF("venue",e.target.value);}} /></div>
          <div><Fl>Capacity</Fl><input type="number" value={ne.capacity} onChange={function(e){setNEF("capacity",parseInt(e.target.value)||0);}} /></div>
          <div>
            <Fl>Event Mode</Fl>
            <select value={ne.mode} onChange={function(e){setNEF("mode",e.target.value);}}>
              <option>Onsite</option><option>Online</option><option>Hybrid</option>
            </select>
          </div>
          <div>
            <Fl>Semester</Fl>
            <select value={ne.semester} onChange={function(e){setNEF("semester",e.target.value);}}>
              <option value="1st">1st Semester</option><option value="2nd">2nd Semester</option><option value="Summer">Summer Term</option>
            </select>
          </div>
          {ne.mode!=="Onsite"&&(
            <div style={{gridColumn:"1/-1"}}><Fl>Meeting Link</Fl><input value={ne.meetingLink} onChange={function(e){setNEF("meetingLink",e.target.value);}} placeholder="https://..." /></div>
          )}
        </div>
        {addErr&&<div style={{color:C.red,fontSize:12,padding:"8px 12px",background:C.red+"15",borderRadius:7,marginTop:12,border:"1px solid "+C.red+"30"}}>{addErr}</div>}
        <div style={{display:"flex",gap:7,justifyContent:"flex-end",marginTop:15,paddingTop:12,borderTop:"1px solid "+C.border}}>
          <button className="bo" onClick={function(){setShowAdd(false);}}>Cancel</button>
          <button className="bp" onClick={saveEvent}>Save Event</button>
        </div>
      </Modal>
    </div>
  );
}

// ── SCHEDULING PAGE ───────────────────────────────────────────────────────────
function SchedulingPage({ user }) {
  var [schedules, setSchedules] = useState(SCHEDULES_DATA);
  var [showAdd, setShowAdd] = useState(false);
  var [addErr, setAddErr] = useState("");
  var [ns, setNs] = useState({courseCode:"",subject:"",faculty:"",section:"",day:"Monday",timeStart:"08:00",timeEnd:"10:00",room:"Lab 201",semester:"1st",year:"2024-2025"});
  var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  var HOURS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
  var dayColor = {Monday:C.accent,Tuesday:C.purple,Wednesday:C.green,Thursday:C.gold,Friday:C.red};

  function getFLoad(name){return schedules.filter(function(s){return s.faculty===name;}).reduce(function(a,s){return a+(parseInt(s.timeEnd)-parseInt(s.timeStart));},0);}

  function addSched(){
    var conflict=schedules.find(function(s){return(s.room===ns.room||s.faculty===ns.faculty)&&s.day===ns.day&&ns.timeStart>=s.timeStart&&ns.timeStart<s.timeEnd;});
    if(conflict){setAddErr("Conflict: "+(conflict.room===ns.room?"Room":"Faculty")+" already in use on "+conflict.day+".");return;}
    var hrs=parseInt(ns.timeEnd)-parseInt(ns.timeStart);
    if(getFLoad(ns.faculty)+hrs>21){setAddErr("Faculty load would exceed 21 hours.");return;}
    setSchedules(function(prev){return prev.concat([Object.assign({id:"SCH-00"+(prev.length+1),roomType:"Computer Laboratory"},ns)]);});
    setShowAdd(false);setAddErr("");
  }

  return (
    <div className="anim">
      <SHdr title="Class Scheduling" sub="Faculty workload and conflict detection" action={user.role==="admin"&&<button className="bp sm" onClick={function(){setShowAdd(true);setAddErr("");}}>+ Add Schedule</button>} />
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:12,marginBottom:18}}>
        {FACULTY.map(function(f){
          var load=getFLoad(f.fullName);
          return(
            <div key={f.id} className="card">
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:9}}>
                <Av name={f.fullName} size={26} color={C.purple} />
                <div><div style={{fontSize:12,fontWeight:600}}>{f.fullName}</div><div style={{fontSize:10,color:C.textMuted}}>{f.position}</div></div>
              </div>
              <Lbar cur={load} max={21} />
              <div style={{fontSize:10,color:C.textMuted,marginTop:4}}>Remaining: <span style={{color:21-load<=3?C.red:C.green,fontWeight:700}}>{21-load} hrs</span></div>
            </div>
          );
        })}
      </div>
      <div className="card" style={{padding:0}}>
        <table>
          <thead><tr><th>Subject</th><th>Faculty</th><th>Section</th><th>Day</th><th>Time</th><th>Room</th><th>Semester</th></tr></thead>
          <tbody>
            {schedules.map(function(s){return(
              <tr key={s.id}>
                <td><div style={{fontWeight:600,fontSize:13}}>{s.subject}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:C.textMuted}}>{s.courseCode}</div></td>
                <td style={{fontSize:12}}>{s.faculty}</td>
                <td><Bdg label={s.section} color={C.accent} /></td>
                <td><span style={{color:dayColor[s.day]||C.text,fontWeight:600,fontSize:12}}>{s.day}</span></td>
                <td style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>{fmt(s.timeStart)} - {fmt(s.timeEnd)}</td>
                <td><div style={{fontSize:12}}>{s.room}</div><div style={{fontSize:10,color:C.textMuted}}>{s.roomType}</div></td>
                <td style={{fontSize:11,color:C.textMuted}}>{s.semester} Sem - {s.year}</td>
              </tr>
            );})}
          </tbody>
        </table>
      </div>
      <Modal open={showAdd} onClose={function(){setShowAdd(false);}} title="Add Schedule">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
          {[["Course Code","courseCode",""],["Subject Title","subject",""],["Section","section","e.g. BSIT-3A"],["Room","room","e.g. Lab 201"]].map(function(f){return(
            <div key={f[1]}><Fl>{f[0]}</Fl><input value={ns[f[1]]||""} onChange={function(e){setNs(Object.assign({},ns,{[f[1]]:e.target.value}));}} placeholder={f[2]} /></div>
          );})}
          <div><Fl>Faculty</Fl><select value={ns.faculty} onChange={function(e){setNs(Object.assign({},ns,{faculty:e.target.value}));}}><option value="">Select</option>{FACULTY.map(function(f){return <option key={f.id}>{f.fullName}</option>;})}</select></div>
          <div><Fl>Day</Fl><select value={ns.day} onChange={function(e){setNs(Object.assign({},ns,{day:e.target.value}));}}>{DAYS.map(function(d){return <option key={d}>{d}</option>;})}</select></div>
          <div><Fl>Time Start</Fl><select value={ns.timeStart} onChange={function(e){setNs(Object.assign({},ns,{timeStart:e.target.value}));}}>{HOURS.map(function(h){return <option key={h}>{h}</option>;})}</select></div>
          <div><Fl>Time End</Fl><select value={ns.timeEnd} onChange={function(e){setNs(Object.assign({},ns,{timeEnd:e.target.value}));}}>{HOURS.map(function(h){return <option key={h}>{h}</option>;})}</select></div>
        </div>
        {addErr&&<div style={{color:C.red,fontSize:12,padding:"8px 12px",background:C.red+"15",borderRadius:7,marginTop:11,border:"1px solid "+C.red+"30"}}>{addErr}</div>}
        <div style={{display:"flex",gap:7,justifyContent:"flex-end",marginTop:14}}>
          <button className="bo" onClick={function(){setShowAdd(false);}}>Cancel</button>
          <button className="bp" onClick={addSched}>Add Schedule</button>
        </div>
      </Modal>
    </div>
  );
}

// ── RESEARCH PAGE ─────────────────────────────────────────────────────────────
function ResearchPage({ user }) {
  var [search, setSearch] = useState("");
  var [sel, setSel] = useState(null);
  var AC = {"Artificial Intelligence":C.accent,Cybersecurity:C.red,"Software Engineering":C.purple};
  var filtered = RESEARCH_DATA.filter(function(r){return r.title.toLowerCase().includes(search.toLowerCase())||r.authors.join(" ").toLowerCase().includes(search.toLowerCase());});
  return (
    <div className="anim">
      <SHdr title="Research Repository" sub="IT and CS research publications" action={user.role!=="student"&&<button className="bp sm">+ Upload Research</button>} />
      <div style={{marginBottom:14}}><input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search by title, author, keyword..." /></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:12}}>
        {filtered.map(function(r){
          var col=AC[r.area]||C.accent;
          return(
            <div key={r.id} className="card ch" style={{cursor:"pointer",borderTop:"2px solid "+col}} onClick={function(){setSel(r);}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                <Bdg label={r.area} color={col} />
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.textMuted}}>{r.year}</span>
              </div>
              <div style={{fontWeight:700,fontSize:14,lineHeight:1.4,marginBottom:7}}>{r.title}</div>
              <div style={{fontSize:12,color:C.textMuted,marginBottom:9,lineHeight:1.5}}>{r.abstract.slice(0,80)}...</div>
              <div style={{borderTop:"1px solid "+C.border,paddingTop:7}}>
                <div style={{fontSize:11,color:C.textMuted,marginBottom:5}}>{r.authors.join(", ")}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{r.keywords.slice(0,3).map(function(k){return <Bdg key={k} label={k} color={col} />;})}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={!!sel} onClose={function(){setSel(null);}} title="Research Details">
        {sel&&(
          <div>
            <Bdg label={sel.area} color={AC[sel.area]||C.accent} />
            <h3 style={{fontSize:15,fontWeight:700,margin:"11px 0 8px",lineHeight:1.4}}>{sel.title}</h3>
            <div style={{fontSize:12,color:C.textMuted,marginBottom:12}}>{sel.authors.join(", ")} - {sel.year}</div>
            <div style={{padding:12,background:C.surfaceHi,borderRadius:8,marginBottom:12}}>
              <div style={{fontSize:9,color:C.textMuted,textTransform:"uppercase",letterSpacing:"1px",fontWeight:700,marginBottom:5}}>Abstract</div>
              <p style={{fontSize:13,lineHeight:1.7}}>{sel.abstract}</p>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{sel.keywords.map(function(k){return <Bdg key={k} label={k} color={AC[sel.area]||C.accent} />;})}</div>
            {sel.doi&&<div style={{fontSize:12,color:C.accent,marginTop:10}}>DOI: {sel.doi}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
}

// ── CURRICULUM PAGE ───────────────────────────────────────────────────────────
function CurriculumPage({ user }) {
  var [sel, setSel] = useState(CURRICULUM_DATA[0]);
  return (
    <div className="anim">
      <SHdr title="Curriculum Management" sub="Academic curriculum versions" action={user.role==="admin"&&<button className="bp sm">+ New Curriculum</button>} />
      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:14}}>
        <div>
          {CURRICULUM_DATA.map(function(c){return(
            <div key={c.id} onClick={function(){setSel(c);}} style={{padding:"11px 13px",borderRadius:9,marginBottom:6,cursor:"pointer",border:"1px solid "+(sel&&sel.id===c.id?C.accent+"66":C.border),background:sel&&sel.id===c.id?C.accent+"15":C.surface}}>
              <div style={{fontWeight:600,fontSize:13,marginBottom:3}}>{c.version}</div>
              <div style={{fontSize:11,color:C.textMuted,marginBottom:6}}>{c.program}</div>
              <Bdg label={c.status} color={c.status==="Active"?C.green:C.textMuted} />
            </div>
          );})}
        </div>
        <div className="card">
          {sel&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:7}}>
                <div>
                  <div style={{fontSize:15,fontWeight:700}}>{sel.version}</div>
                  <div style={{fontSize:12,color:C.textMuted}}>{sel.program} - {sel.year}</div>
                </div>
                <Bdg label={sel.status} color={sel.status==="Active"?C.green:C.textMuted} />
              </div>
              <table>
                <thead><tr><th>Code</th><th>Subject Title</th><th>Units</th><th>Year</th><th>Sem</th><th>Prerequisite</th></tr></thead>
                <tbody>{sel.courses.map(function(c){return(
                  <tr key={c.code}>
                    <td><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.accent}}>{c.code}</span></td>
                    <td style={{fontWeight:500}}>{c.title}</td>
                    <td style={{textAlign:"center"}}><Bdg label={String(c.units)} color={C.accent} /></td>
                    <td style={{textAlign:"center",fontSize:12}}>Year {c.yearLevel}</td>
                    <td style={{textAlign:"center",fontSize:12}}>{c.sem===1?"1st":"2nd"}</td>
                    <td style={{fontSize:11,color:C.textMuted}}>{c.prereq}</td>
                  </tr>
                );})}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SEARCH PAGE ───────────────────────────────────────────────────────────────
function SearchPage() {
  var [query, setQuery] = useState("");
  var [cat, setCat] = useState("All");
  var results = query.length>=2 ? [
    ...STUDENTS.filter(function(s){return s.fullName.toLowerCase().includes(query.toLowerCase());}).map(function(s){return {type:"Student",title:s.fullName,sub:s.course+" - "+s.section,col:C.accent};}),
    ...FACULTY.filter(function(f){return f.fullName.toLowerCase().includes(query.toLowerCase());}).map(function(f){return {type:"Faculty",title:f.fullName,sub:f.position,col:C.purple};}),
    ...RESEARCH_DATA.filter(function(r){return r.title.toLowerCase().includes(query.toLowerCase());}).map(function(r){return {type:"Research",title:r.title,sub:r.authors.join(", "),col:C.green};}),
    ...EVENTS_DATA.filter(function(e){return e.title.toLowerCase().includes(query.toLowerCase());}).map(function(e){return {type:"Event",title:e.title,sub:e.type+" - "+e.date,col:C.gold};}),
  ].filter(function(r){return cat==="All"||r.type===cat;}) : [];

  return (
    <div className="anim">
      <SHdr title="Global Search" sub="Search across students, faculty, research and events" />
      <div style={{maxWidth:540,margin:"0 auto 22px"}}>
        <input value={query} onChange={function(e){setQuery(e.target.value);}} placeholder="Search everything..." style={{fontSize:15,height:46}} />
        <div style={{display:"flex",gap:5,justifyContent:"center",marginTop:10}}>
          {["All","Student","Faculty","Research","Event"].map(function(c){return(
            <button key={c} onClick={function(){setCat(c);}} style={{padding:"4px 13px",borderRadius:20,border:"1px solid "+(cat===c?C.accent+"88":C.border),background:cat===c?C.accent+"15":"transparent",color:cat===c?C.accent:C.textMuted,fontSize:12,fontFamily:"'Outfit',sans-serif",fontWeight:cat===c?600:400,cursor:"pointer"}}>{c}</button>
          );})}
        </div>
      </div>
      {query.length>=2
        ?<div>
          <div style={{fontSize:12,color:C.textMuted,marginBottom:11}}>{results.length} result{results.length!==1?"s":""} for "{query}"</div>
          {results.map(function(r,i){return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 15px",background:C.surface,border:"1px solid "+C.border,borderRadius:10,marginBottom:6}}>
              <div style={{width:30,height:30,borderRadius:8,background:r.col+"20",border:"1px solid "+r.col+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:r.col,flexShrink:0}}>{r.type[0]}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{r.title}</div><div style={{fontSize:11,color:C.textMuted}}>{r.sub}</div></div>
              <Bdg label={r.type} color={r.col} />
            </div>
          );})}
          {results.length===0&&<div style={{textAlign:"center",padding:45,color:C.textMuted}}>No results for "{query}"</div>}
        </div>
        :<div style={{textAlign:"center",padding:"45px 20px",color:C.textMuted}}>
          <div style={{fontSize:32,marginBottom:11,color:C.border}}>?</div>
          <div style={{fontSize:15,fontWeight:600,color:C.textSub,marginBottom:6}}>Search the System</div>
          <div style={{fontSize:13}}>Type at least 2 characters to search students, faculty, research and events.</div>
        </div>
      }
    </div>
  );
}

// ── REPORTS PAGE ──────────────────────────────────────────────────────────────
function ReportsPage() {
  var bsit = STUDENTS.filter(function(s){return s.course==="BSIT";}).length;
  var bscs = STUDENTS.filter(function(s){return s.course==="BSCS";}).length;
  var avg = (STUDENTS.reduce(function(a,s){return a+s.gpa;},0)/STUDENTS.length).toFixed(2);
  return (
    <div className="anim">
      <SHdr title="Reports and Analytics" sub="Academic data overview" action={<button className="bo sm">Export PDF</button>} />
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:11,marginBottom:18}}>
        <StatCard label="Total Students" value={STUDENTS.length} color={C.accent} />
        <StatCard label="Faculty" value={FACULTY.length} color={C.purple} />
        <StatCard label="Avg GPA" value={avg} color={C.green} />
        <StatCard label="Research" value={RESEARCH_DATA.length} color={C.teal} />
        <StatCard label="Events" value={EVENTS_DATA.length} color={C.gold} />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="card">
          <SHdr title="Enrollment by Course" />
          {[["BSIT",bsit,C.accent],["BSCS",bscs,C.purple]].map(function(kv){return(
            <div key={kv[0]} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:13}}><span>{kv[0]}</span><span style={{color:kv[2],fontFamily:"'JetBrains Mono',monospace"}}>{kv[1]} students</span></div>
              <div style={{height:7,background:C.border,borderRadius:4}}><div style={{width:((kv[1]/STUDENTS.length)*100)+"%",height:"100%",background:kv[2],borderRadius:4}} /></div>
            </div>
          );})}
        </div>
        <div className="card">
          <SHdr title="Faculty Teaching Load" />
          {FACULTY.map(function(f){return(<div key={f.id} style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:600,marginBottom:4}}>{f.fullName}</div><Lbar cur={f.currentLoad} max={f.maxLoad} /></div>);})}
        </div>
        <div className="card">
          <SHdr title="Research by Area" />
          {[...new Set(RESEARCH_DATA.map(function(r){return r.area;}))].map(function(area){
            var col={"Artificial Intelligence":C.accent,Cybersecurity:C.red,"Software Engineering":C.purple}[area]||C.accent;
            var cnt=RESEARCH_DATA.filter(function(r){return r.area===area;}).length;
            return(<div key={area} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:12}}><span>{area}</span><span style={{color:col}}>{cnt}</span></div><div style={{height:7,background:C.border,borderRadius:4}}><div style={{width:((cnt/RESEARCH_DATA.length)*100)+"%",height:"100%",background:col,borderRadius:4}} /></div></div>);
          })}
        </div>
        <div className="card">
          <SHdr title="Students by Year Level" />
          {[1,2,3,4].map(function(y){
            var cnt=STUDENTS.filter(function(s){return s.year===y;}).length;
            return(<div key={y} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:13}}><span>Year {y}</span><span style={{color:C.green}}>{cnt}</span></div><div style={{height:7,background:C.border,borderRadius:4}}><div style={{width:cnt>0?((cnt/STUDENTS.length)*100)+"%":"0%",height:"100%",background:C.green,borderRadius:4}} /></div></div>);
          })}
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
const PAGE_TITLES = {dashboard:"Dashboard",students:"Student Profiles",faculty:"Faculty Profiles",events:"Events and Calendar",scheduling:"Class Scheduling",research:"Research Repository",curriculum:"Curriculum",search:"Search",reports:"Reports"};

export default function App() {
  var [user, setUser] = useState(null);
  var [page, setPage] = useState("dashboard");

  function renderPage() {
    if (page==="dashboard")   return <Dashboard user={user} setPage={setPage} />;
    if (page==="students")    return <StudentsPage user={user} />;
    if (page==="faculty")     return <FacultyPage user={user} />;
    if (page==="events")      return <EventsPage user={user} />;
    if (page==="scheduling")  return <SchedulingPage user={user} />;
    if (page==="research")    return <ResearchPage user={user} />;
    if (page==="curriculum")  return <CurriculumPage user={user} />;
    if (page==="search")      return <SearchPage />;
    if (page==="reports")     return <ReportsPage />;
    return <Dashboard user={user} setPage={setPage} />;
  }

  if (!user) return (
    <>
      <link rel="stylesheet" href={FONT_URL} />
      <style>{CSS}</style>
      <LoginPage onLogin={function(u){setUser(u);}} />
    </>
  );

  return (
    <>
      <link rel="stylesheet" href={FONT_URL} />
      <style>{CSS}</style>
      <div style={{display:"flex",minHeight:"100vh",background:C.bg}}>
        <Sidebar page={page} setPage={setPage} user={user} onLogout={function(){setUser(null);setPage("dashboard");}} />
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{background:C.surface,borderBottom:"1px solid "+C.border,padding:"0 18px",height:50,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
            <div style={{fontSize:14,fontWeight:700}}>{PAGE_TITLES[page]||"Dashboard"}</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:C.textMuted}}>{new Date().toLocaleDateString("en-PH",{weekday:"short",month:"short",day:"numeric",year:"numeric"})}</span>
              <Bdg label={user.role==="admin"?"Registrar":user.role==="faculty"?"Faculty":"Student"} color={user.role==="admin"?C.gold:user.role==="faculty"?C.purple:C.accent} />
            </div>
          </div>
          <main style={{flex:1,overflowY:"auto",padding:20}}>
            {renderPage()}
          </main>
        </div>
      </div>
    </>
  );
}
