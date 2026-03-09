require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");
const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Event = require("../models/Event");
const Schedule = require("../models/Schedule");
const Research = require("../models/Research");
const Curriculum = require("../models/Curriculum");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ force: true });
    console.log("✅ Tables created");

    // ─── Users ────────────────────────────────────────────────────────────
    const salt = await bcrypt.genSalt(10);
    await User.bulkCreate([
      { username: "admin", password: await bcrypt.hash("admin123", salt), role: "admin", name: "Registrar Admin" },
      { username: "faculty", password: await bcrypt.hash("faculty123", salt), role: "faculty", name: "Dr. Maria Santos" },
      { username: "student", password: await bcrypt.hash("student123", salt), role: "student", name: "Ana Marie Reyes" },
    ]);
    console.log("✅ Users seeded");

    // ─── Students ─────────────────────────────────────────────────────────
    await Student.bulkCreate([
      { id: "2021-00001", studentNumber: "2021-00001", fullName: "Ana Marie Reyes", status: "Regular", course: "BSIT", year: 3, section: "BSIT-3A", gpa: 1.5, sexAtBirth: "Female", civilStatus: "Single", nationality: "Filipino", religion: "Roman Catholic", dateOfBirth: "2003-04-12", placeOfBirth: "Cavite City, Cavite", presentAddress: "Blk 4 Lot 12, Greenview Subd., Imus, Cavite", permanentAddress: "Blk 4 Lot 12, Greenview Subd., Imus, Cavite", primaryMobile: "0917-123-4567", alternateMobile: "0998-765-4321", primaryEmail: "ana.reyes@student.edu.ph", alternateEmail: "", fatherName: "Roberto P. Reyes", fatherOccupation: "Civil Engineer", fatherDOB: "1970-03-05", motherName: "Carmelita D. Reyes", motherOccupation: "Teacher", motherDOB: "1973-07-18", siblings: "2", familyIncome: "P350,000 - P499,999", guardianName: "Roberto P. Reyes", guardianRelation: "Father", guardianContact: "0917-111-2222", lastSchool: "Imus National High School", lastYearAttended: "2020-2021", lrn: "103456789012", honors: "With Honors", college: "College of Computing Studies", program: "Bachelor of Science in Information Technology", curriculum: "BSIT 2022", yearLevel: "3rd Year", residency: "Local" },
      { id: "2021-00002", studentNumber: "2021-00002", fullName: "Ben Cruz", status: "Regular", course: "BSCS", year: 3, section: "BSCS-3A", gpa: 1.75, sexAtBirth: "Male", civilStatus: "Single", nationality: "Filipino", religion: "Catholic", dateOfBirth: "2002-09-05", placeOfBirth: "Imus, Cavite", presentAddress: "Imus, Cavite", permanentAddress: "Imus, Cavite", primaryMobile: "0918-234-5678", alternateMobile: "", primaryEmail: "ben.cruz@student.edu.ph", alternateEmail: "", fatherName: "Pedro Cruz", fatherOccupation: "Engineer", fatherDOB: "1968-05-10", motherName: "Luz Cruz", motherOccupation: "Nurse", motherDOB: "1971-02-14", siblings: "1", familyIncome: "P500,000+", guardianName: "Pedro Cruz", guardianRelation: "Father", guardianContact: "0918-111-3333", lastSchool: "Bacoor National HS", lastYearAttended: "2019-2020", lrn: "203456789013", honors: "", college: "College of Computing Studies", program: "Bachelor of Science in Computer Science", curriculum: "BSCS 2024", yearLevel: "3rd Year", residency: "Local" },
      { id: "2022-00003", studentNumber: "2022-00003", fullName: "Carla Tan", status: "Regular", course: "BSIT", year: 2, section: "BSIT-2B", gpa: 1.25, sexAtBirth: "Female", civilStatus: "Single", nationality: "Filipino", religion: "Protestant", dateOfBirth: "2004-02-20", placeOfBirth: "Bacoor, Cavite", presentAddress: "Bacoor, Cavite", permanentAddress: "Bacoor, Cavite", primaryMobile: "0919-345-6789", alternateMobile: "", primaryEmail: "carla.tan@student.edu.ph", alternateEmail: "", fatherName: "Tony Tan", fatherOccupation: "Businessman", fatherDOB: "1972-08-22", motherName: "Rose Tan", motherOccupation: "Accountant", motherDOB: "1975-12-01", siblings: "3", familyIncome: "P250,000 - P349,999", guardianName: "Tony Tan", guardianRelation: "Father", guardianContact: "0919-111-4444", lastSchool: "Bacoor City NHS", lastYearAttended: "2021-2022", lrn: "303456789014", honors: "Valedictorian", college: "College of Computing Studies", program: "Bachelor of Science in Information Technology", curriculum: "BSIT 2022", yearLevel: "2nd Year", residency: "Local" },
      { id: "2020-00004", studentNumber: "2020-00004", fullName: "Dan Molina", status: "Irregular", course: "BSCS", year: 4, section: "BSCS-4A", gpa: 2.0, sexAtBirth: "Male", civilStatus: "Single", nationality: "Filipino", religion: "Catholic", dateOfBirth: "2001-11-30", placeOfBirth: "Dasmarinas, Cavite", presentAddress: "Dasmarinas, Cavite", permanentAddress: "Dasmarinas, Cavite", primaryMobile: "0920-456-7890", alternateMobile: "", primaryEmail: "dan.molina@student.edu.ph", alternateEmail: "", fatherName: "Raul Molina", fatherOccupation: "OFW", fatherDOB: "1965-06-18", motherName: "Gloria Molina", motherOccupation: "Housewife", motherDOB: "1969-09-25", siblings: "4", familyIncome: "P350,000 - P499,999", guardianName: "Gloria Molina", guardianRelation: "Mother", guardianContact: "0920-111-5555", lastSchool: "Dasmarinas NHS", lastYearAttended: "2018-2019", lrn: "403456789015", honors: "", college: "College of Computing Studies", program: "Bachelor of Science in Computer Science", curriculum: "BSCS 2024", yearLevel: "4th Year", residency: "Local" },
    ]);
    console.log("✅ Students seeded");

    // ─── Faculty ──────────────────────────────────────────────────────────
    await Faculty.bulkCreate([
      { id: "FAC-001", employeeNumber: "FAC-001", fullName: "Dr. Maria Santos", facultyStatus: "Full-Time", position: "Program Head", sexAtBirth: "Female", civilStatus: "Married", nationality: "Filipino", religion: "Roman Catholic", dateOfBirth: "1978-06-15", placeOfBirth: "Cavite City", presentAddress: "123 Aguinaldo St., Imus, Cavite", permanentAddress: "123 Aguinaldo St., Imus, Cavite", primaryMobile: "0917-111-2222", alternateMobile: "0998-333-4444", primaryEmail: "m.santos@cit.edu.ph", alternateEmail: "", college: "College of Computing Studies", department: "Information Technology", employmentStartDate: "2010-06-01", employmentType: "Permanent", academicRank: "Associate Professor II", bsDegree: "BS Computer Science", bsMajor: "Computer Science", bsUniversity: "CIT", bsYear: "2000", msDegree: "MS Information Technology", msMajor: "Information Technology", msUniversity: "De La Salle University", msYear: "2005", phdDegree: "PhD Computer Science", phdMajor: "Computer Science", phdUniversity: "De La Salle University", phdYear: "2012", specialization: ["Artificial Intelligence", "Data Science", "Machine Learning"], certifications: [{ name: "AWS Solutions Architect", org: "Amazon Web Services", dateEarned: "2022-03", expiration: "2025-03" }], subjects: ["IT401 - AI Fundamentals", "IT402 - Machine Learning", "IT301 - Data Analytics"], sections: ["BSIT-4A", "BSIT-3A"], semester: "1st", academicYear: "2024-2025", maxLoad: 21, currentLoad: 18, research: [], adminRoles: ["Program Coordinator", "Thesis Adviser"], awards: [], experience: [], memberships: [] },
      { id: "FAC-002", employeeNumber: "FAC-002", fullName: "Prof. Jose Garcia", facultyStatus: "Full-Time", position: "Assistant Professor", sexAtBirth: "Male", civilStatus: "Single", nationality: "Filipino", religion: "Catholic", dateOfBirth: "1985-03-22", placeOfBirth: "Imus, Cavite", presentAddress: "456 Rizal Ave., Bacoor, Cavite", permanentAddress: "456 Rizal Ave., Bacoor, Cavite", primaryMobile: "0918-222-3333", alternateMobile: "", primaryEmail: "j.garcia@cit.edu.ph", alternateEmail: "", college: "College of Computing Studies", department: "Computer Science", employmentStartDate: "2015-06-01", employmentType: "Permanent", academicRank: "Instructor II", bsDegree: "BS Computer Science", bsMajor: "Computer Science", bsUniversity: "UPLB", bsYear: "2007", msDegree: "MS Computer Science", msMajor: "Software Engineering", msUniversity: "UPLB", msYear: "2012", phdDegree: "", phdMajor: "", phdUniversity: "", phdYear: "", specialization: ["Software Engineering", "Web Development"], certifications: [], subjects: ["CS301 - Software Engineering", "CS201 - OOP"], sections: ["BSCS-3A", "BSCS-2A"], semester: "1st", academicYear: "2024-2025", maxLoad: 21, currentLoad: 15, research: [], adminRoles: [], awards: [], experience: [], memberships: [] },
      { id: "FAC-003", employeeNumber: "FAC-003", fullName: "Dr. Lena Lim", facultyStatus: "Full-Time", position: "Associate Professor", sexAtBirth: "Female", civilStatus: "Married", nationality: "Filipino", religion: "Protestant", dateOfBirth: "1980-11-08", placeOfBirth: "Bacoor, Cavite", presentAddress: "789 Aguinaldo Hwy., Dasmarinas, Cavite", permanentAddress: "789 Aguinaldo Hwy., Dasmarinas, Cavite", primaryMobile: "0919-333-4444", alternateMobile: "0917-555-6666", primaryEmail: "l.lim@cit.edu.ph", alternateEmail: "", college: "College of Computing Studies", department: "Computer Science", employmentStartDate: "2008-06-01", employmentType: "Permanent", academicRank: "Associate Professor I", bsDegree: "BS Mathematics", bsMajor: "Applied Mathematics", bsUniversity: "University of the Philippines", bsYear: "2002", msDegree: "MS Computer Science", msMajor: "Cybersecurity", msUniversity: "Ateneo de Manila", msYear: "2007", phdDegree: "PhD Information Systems", phdMajor: "Information Systems Security", phdUniversity: "De La Salle University", phdYear: "2015", specialization: ["Cybersecurity", "Networking", "Digital Forensics"], certifications: [], subjects: ["CS401 - Cybersecurity", "CS302 - Computer Networks"], sections: ["BSCS-4A", "BSCS-3B"], semester: "1st", academicYear: "2024-2025", maxLoad: 21, currentLoad: 12, research: [], adminRoles: ["Department Chair"], awards: [], experience: [], memberships: [] },
    ]);
    console.log("✅ Faculty seeded");

    // ─── Events ───────────────────────────────────────────────────────────
    await Event.bulkCreate([
      { id: "EVT-001", title: "HackITon 2025", description: "Annual hackathon where teams compete to build innovative solutions within 24 hours.", type: "Hackathon", department: "Both", organizer: "Programming Guild", date: "2026-03-28", startTime: "08:00", endTime: "18:00", venue: "ICT Building Auditorium", mode: "Onsite", meetingLink: "", platform: "", capacity: 120, participants: 120, certificateIssued: true, semester: "2nd", participantList: [] },
      { id: "EVT-002", title: "AI in Healthcare Seminar", description: "A seminar on applications of Artificial Intelligence in the healthcare sector.", type: "Seminar", department: "IT", organizer: "AI Research Club", date: "2026-03-12", startTime: "13:00", endTime: "17:00", venue: "Computer Lab 1", mode: "Hybrid", meetingLink: "https://zoom.us/j/12345678", platform: "Zoom", capacity: 80, participants: 80, certificateIssued: true, semester: "2nd", participantList: [] },
      { id: "EVT-003", title: "DevOps and Cloud Bootcamp", description: "Intensive 2-day hands-on workshop covering DevOps workflows, Docker, Kubernetes, and cloud deployment.", type: "Workshop", department: "Both", organizer: "IT Department", date: "2026-04-10", startTime: "08:00", endTime: "17:00", venue: "Computer Laboratory 3", mode: "Onsite", meetingLink: "", platform: "", capacity: 45, participants: 45, certificateIssued: true, semester: "2nd", participantList: [] },
    ]);
    console.log("✅ Events seeded");

    // ─── Schedules ────────────────────────────────────────────────────────
    await Schedule.bulkCreate([
      { id: "SCH-001", courseCode: "IT401", subject: "AI Fundamentals", faculty: "Dr. Maria Santos", section: "BSIT-4A", day: "Monday", timeStart: "08:00", timeEnd: "10:00", room: "Lab 201", roomType: "Computer Laboratory", semester: "1st", year: "2024-2025" },
      { id: "SCH-002", courseCode: "IT402", subject: "Machine Learning", faculty: "Dr. Maria Santos", section: "BSIT-3A", day: "Wednesday", timeStart: "10:00", timeEnd: "12:00", room: "Lab 201", roomType: "Computer Laboratory", semester: "1st", year: "2024-2025" },
      { id: "SCH-003", courseCode: "CS301", subject: "Software Engineering", faculty: "Prof. Jose Garcia", section: "BSCS-3A", day: "Tuesday", timeStart: "08:00", timeEnd: "10:00", room: "Room 105", roomType: "Lecture Room", semester: "1st", year: "2024-2025" },
      { id: "SCH-004", courseCode: "CS401", subject: "Cybersecurity", faculty: "Dr. Lena Lim", section: "BSCS-4A", day: "Thursday", timeStart: "13:00", timeEnd: "15:00", room: "Lab 301", roomType: "Networking Lab", semester: "1st", year: "2024-2025" },
    ]);
    console.log("✅ Schedules seeded");

    // ─── Research ─────────────────────────────────────────────────────────
    await Research.bulkCreate([
      { id: "RES-001", title: "Deep Learning for Crop Disease Detection Using CNN", abstract: "A CNN model for early detection of crop diseases using image classification on Philippine agricultural datasets.", authors: ["Dr. Maria Santos", "Ana Marie Reyes"], area: "Artificial Intelligence", keywords: ["CNN", "Deep Learning", "Agriculture"], year: "2023", doi: "10.1234/abc" },
      { id: "RES-002", title: "Zero-Trust Security Model for Higher Education Institutions", abstract: "A zero-trust architecture framework for securing academic information systems in higher education.", authors: ["Dr. Lena Lim"], area: "Cybersecurity", keywords: ["Zero-Trust", "Security", "HEI"], year: "2024", doi: "10.5678/xyz" },
      { id: "RES-003", title: "Microservices Architecture for Academic Management Systems", abstract: "Analysis of microservices patterns applied to academic management systems for improved scalability.", authors: ["Prof. Jose Garcia", "Dan Molina"], area: "Software Engineering", keywords: ["Microservices", "Architecture"], year: "2024", doi: "" },
    ]);
    console.log("✅ Research seeded");

    // ─── Curriculum ───────────────────────────────────────────────────────
    await Curriculum.bulkCreate([
      { id: "CUR-001", program: "BS Information Technology", version: "BSIT Curriculum 2022", status: "Active", year: "2022", courses: [{ code: "IT101", title: "Introduction to Computing", units: 3, yearLevel: 1, sem: 1, prereq: "None" }, { code: "IT102", title: "Computer Programming 1", units: 3, yearLevel: 1, sem: 1, prereq: "None" }, { code: "IT201", title: "Data Structures and Algorithms", units: 3, yearLevel: 2, sem: 1, prereq: "IT102" }, { code: "IT301", title: "Web Development", units: 3, yearLevel: 3, sem: 1, prereq: "IT201" }, { code: "IT401", title: "AI Fundamentals", units: 3, yearLevel: 4, sem: 1, prereq: "IT301" }] },
      { id: "CUR-002", program: "BS Computer Science", version: "BSCS Curriculum 2024", status: "Active", year: "2024", courses: [{ code: "CS101", title: "Introduction to Computer Science", units: 3, yearLevel: 1, sem: 1, prereq: "None" }, { code: "CS201", title: "Object-Oriented Programming", units: 3, yearLevel: 2, sem: 1, prereq: "CS101" }, { code: "CS301", title: "Software Engineering", units: 3, yearLevel: 3, sem: 1, prereq: "CS201" }, { code: "CS401", title: "Cybersecurity", units: 3, yearLevel: 4, sem: 1, prereq: "CS301" }] },
    ]);
    console.log("✅ Curriculum seeded");

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
