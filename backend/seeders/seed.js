require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");
const AcademicTerm = require("../models/AcademicTerm");
const Department = require("../models/Department");
const Program = require("../models/Program");
const Member = require("../models/Member");
const Room = require("../models/Room");
const Course = require("../models/Course");
const Curriculum = require("../models/Curriculum");
const CurriculumCourse = require("../models/CurriculumCourse");
const Schedule = require("../models/Schedule");
const Event = require("../models/Event");
const ResearchProject = require("../models/ResearchProject");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ force: true });
    console.log("✅ Tables created");

    // ─── Academic Terms ───────────────────────────────────────────────────
    await AcademicTerm.bulkCreate([
      { academic_year: "2023-2024", semester: "1st", start_date: "2023-08-14", end_date: "2023-12-15", is_current: 0 },
      { academic_year: "2023-2024", semester: "2nd", start_date: "2024-01-08", end_date: "2024-05-10", is_current: 0 },
      { academic_year: "2024-2025", semester: "1st", start_date: "2024-08-12", end_date: "2024-12-13", is_current: 0 },
      { academic_year: "2024-2025", semester: "2nd", start_date: "2025-01-06", end_date: "2025-05-09", is_current: 1 },
      { academic_year: "2024-2025", semester: "Summer", start_date: "2025-05-26", end_date: "2025-07-04", is_current: 0 },
    ]);
    console.log("✅ Academic terms seeded");

    // ─── Departments ──────────────────────────────────────────────────────
    await Department.bulkCreate([
      { code: "CCS", name: "College of Computer Studies", is_active: 1 },
      { code: "CAS", name: "College of Arts and Sciences", is_active: 1 },
      { code: "CEA", name: "College of Engineering and Architecture", is_active: 1 },
    ]);
    console.log("✅ Departments seeded");

    // ─── Programs ─────────────────────────────────────────────────────────
    await Program.bulkCreate([
      { department_id: 1, code: "BSCS", title: "Bachelor of Science in Computer Science", total_units: 165, is_active: 1 },
      { department_id: 1, code: "BSIT", title: "Bachelor of Science in Information Technology", total_units: 162, is_active: 1 },
      { department_id: 1, code: "BSIS", title: "Bachelor of Science in Information Systems", total_units: 162, is_active: 1 },
      { department_id: 1, code: "BSEMC", title: "BS Entertainment and Multimedia Computing", total_units: 163, is_active: 1 },
    ]);
    console.log("✅ Programs seeded");

    // ─── Members (admin, faculty, students) ───────────────────────────────
    const salt = await bcrypt.genSalt(10);

    await Member.bulkCreate([
      // Admin
      {
        id: "ADMIN-001",
        role: "admin",
        last_name: "Administrator",
        first_name: "System",
        birth_date: "1990-01-01",
        sex: "M",
        civil_status: "S",
        contact_no: "09000000000",
        email: "admin@ccs.edu.ph",
        address_home: "CCS Building",
        username: "ccs_admin",
        password_hash: await bcrypt.hash("admin123", salt),
        is_active: 1,
      },
      // Faculty
      {
        id: "FAC-2024-001",
        role: "faculty",
        last_name: "Santos",
        first_name: "Maria",
        birth_date: "1978-06-15",
        sex: "F",
        civil_status: "M",
        contact_no: "0917-111-2222",
        email: "m.santos@ccs.edu.ph",
        address_home: "123 Aguinaldo St., Imus, Cavite",
        username: "m.santos",
        password_hash: await bcrypt.hash("faculty123", salt),
        is_active: 1,
        department_id: 1,
        employee_no: "EMP-2010-001",
        employment_type: "full_time",
        is_full_time: 1,
        hired_at: "2010-06-01",
      },
      {
        id: "FAC-2024-002",
        role: "faculty",
        last_name: "Garcia",
        first_name: "Jose",
        birth_date: "1985-03-22",
        sex: "M",
        civil_status: "S",
        contact_no: "0918-222-3333",
        email: "j.garcia@ccs.edu.ph",
        address_home: "456 Rizal Ave., Bacoor, Cavite",
        username: "j.garcia",
        password_hash: await bcrypt.hash("faculty123", salt),
        is_active: 1,
        department_id: 1,
        employee_no: "EMP-2015-002",
        employment_type: "full_time",
        is_full_time: 1,
        hired_at: "2015-06-01",
      },
      // Students
      {
        id: "2024-CCS-0001",
        role: "student",
        last_name: "Reyes",
        first_name: "Ana Marie",
        birth_date: "2003-04-12",
        sex: "F",
        civil_status: "S",
        contact_no: "0917-123-4567",
        email: "ana.reyes@student.ccs.edu.ph",
        address_home: "Blk 4 Lot 12, Greenview Subd., Imus, Cavite",
        username: "ana.reyes",
        password_hash: await bcrypt.hash("student123", salt),
        is_active: 1,
        program_id: 2,
        year_level: 3,
        section: "BSIT-3A",
        student_status: "active",
        enrolled_at: "2021-08-16",
      },
      {
        id: "2024-CCS-0002",
        role: "student",
        last_name: "Cruz",
        first_name: "Ben",
        birth_date: "2002-09-05",
        sex: "M",
        civil_status: "S",
        contact_no: "0918-234-5678",
        email: "ben.cruz@student.ccs.edu.ph",
        address_home: "Imus, Cavite",
        username: "ben.cruz",
        password_hash: await bcrypt.hash("student123", salt),
        is_active: 1,
        program_id: 1,
        year_level: 3,
        section: "BSCS-3A",
        student_status: "active",
        enrolled_at: "2021-08-16",
      },
    ]);
    console.log("✅ Members seeded");

    // ─── Rooms ────────────────────────────────────────────────────────────
    await Room.bulkCreate([
      { code: "CCS-LEC1", name: "CCS Lecture Room 1", type: "lecture", capacity: 40, building: "CCS Building", floor_no: 1, has_projector: 1, has_ac: 1, is_active: 1 },
      { code: "CCS-LEC2", name: "CCS Lecture Room 2", type: "lecture", capacity: 40, building: "CCS Building", floor_no: 1, has_projector: 1, has_ac: 1, is_active: 1 },
      { code: "CCS-LAB1", name: "CCS Computer Lab 1", type: "laboratory", capacity: 35, building: "CCS Building", floor_no: 2, has_projector: 1, has_ac: 1, is_active: 1 },
      { code: "CCS-LAB2", name: "CCS Computer Lab 2", type: "laboratory", capacity: 35, building: "CCS Building", floor_no: 2, has_projector: 1, has_ac: 1, is_active: 1 },
      { code: "CCS-CONF", name: "CCS Conference Room", type: "conference", capacity: 20, building: "CCS Building", floor_no: 3, has_projector: 1, has_ac: 1, is_active: 1 },
      { code: "MAIN-AUD", name: "Main Auditorium", type: "auditorium", capacity: 500, building: "Main Building", floor_no: 1, has_projector: 1, has_ac: 1, is_active: 1 },
    ]);
    console.log("✅ Rooms seeded");

    // ─── Courses ──────────────────────────────────────────────────────────
    await Course.bulkCreate([
      { code: "CS 101", title: "Introduction to Computing", units: 3, lab_units: 0, is_active: 1 },
      { code: "CS 102", title: "Computer Programming 1", units: 3, lab_units: 0, is_active: 1 },
      { code: "CS 201", title: "Data Structures and Algorithms", units: 3, lab_units: 0, is_active: 1 },
      { code: "CS 301", title: "Operating Systems", units: 3, lab_units: 0, is_active: 1 },
      { code: "CS 302", title: "Database Management Systems", units: 3, lab_units: 0, is_active: 1 },
      { code: "CS 401", title: "Software Engineering", units: 3, lab_units: 0, is_active: 1 },
      { code: "IT 101", title: "Introduction to Information Technology", units: 3, lab_units: 0, is_active: 1 },
      { code: "IT 201", title: "Web Systems and Technologies", units: 3, lab_units: 0, is_active: 1 },
      { code: "IT 301", title: "Systems Integration and Architecture", units: 3, lab_units: 0, is_active: 1 },
      { code: "GE 001", title: "Understanding the Self", units: 3, lab_units: 0, is_active: 1 },
      { code: "GE 002", title: "Purposive Communication", units: 3, lab_units: 0, is_active: 1 },
      { code: "GE 003", title: "Mathematics in the Modern World", units: 3, lab_units: 0, is_active: 1 },
    ]);
    console.log("✅ Courses seeded");

    // ─── Curricula ────────────────────────────────────────────────────────
    await Curriculum.bulkCreate([
      { program_id: 1, code: "BSCS-2024", effectivity_ay: "2024-2025", description: "BS Computer Science curriculum 2024", is_active: 1, approved_by: "Dean, CCS" },
      { program_id: 2, code: "BSIT-2022", effectivity_ay: "2022-2023", description: "BS Information Technology curriculum 2022", is_active: 1, approved_by: "Dean, CCS" },
    ]);
    console.log("✅ Curricula seeded");

    // ─── Curriculum Courses ───────────────────────────────────────────────
    await CurriculumCourse.bulkCreate([
      // BSCS-2024 (curriculum_id: 1)
      { curriculum_id: 1, course_id: 1, year_level: 1, semester: "1st", is_elective: 0 },
      { curriculum_id: 1, course_id: 2, year_level: 1, semester: "1st", is_elective: 0 },
      { curriculum_id: 1, course_id: 3, year_level: 2, semester: "1st", is_elective: 0, prerequisite_id: 2 },
      { curriculum_id: 1, course_id: 4, year_level: 3, semester: "1st", is_elective: 0 },
      { curriculum_id: 1, course_id: 5, year_level: 3, semester: "2nd", is_elective: 0 },
      { curriculum_id: 1, course_id: 6, year_level: 4, semester: "1st", is_elective: 0, prerequisite_id: 3 },
      // BSIT-2022 (curriculum_id: 2)
      { curriculum_id: 2, course_id: 7, year_level: 1, semester: "1st", is_elective: 0 },
      { curriculum_id: 2, course_id: 8, year_level: 2, semester: "1st", is_elective: 0 },
      { curriculum_id: 2, course_id: 9, year_level: 3, semester: "1st", is_elective: 0 },
    ]);
    console.log("✅ Curriculum courses seeded");

    // ─── Schedules ────────────────────────────────────────────────────────
    await Schedule.bulkCreate([
      {
        term_id: 4, member_id: "FAC-2024-001", course_id: 3, room_id: 3,
        section: "BSIT-3A", day_pattern: "MWF", time_start: "08:00:00", time_end: "09:00:00",
        lecture_type: "regular", class_size: 35, is_active: 1,
      },
      {
        term_id: 4, member_id: "FAC-2024-002", course_id: 6, room_id: 1,
        section: "BSCS-3A", day_pattern: "TTh", time_start: "10:00:00", time_end: "11:30:00",
        lecture_type: "major", class_size: 40, is_active: 1,
      },
    ]);
    console.log("✅ Schedules seeded");

    // ─── Events ───────────────────────────────────────────────────────────
    await Event.bulkCreate([
      {
        title: "HackITon 2025",
        type: "competition",
        description: "Annual hackathon where teams compete to build innovative solutions within 24 hours.",
        organizer: "Programming Guild",
        venue: "ICT Building Auditorium",
        room_id: 6,
        start_at: "2025-03-28 08:00:00",
        end_at: "2025-03-28 18:00:00",
        academic_year: "2024-2025",
        is_school_wide: 1,
        is_open: 1,
        created_by: "ADMIN-001",
      },
      {
        title: "AI in Healthcare Seminar",
        type: "seminar",
        description: "A seminar on applications of Artificial Intelligence in the healthcare sector.",
        organizer: "AI Research Club",
        venue: "Computer Lab 1",
        room_id: 3,
        start_at: "2025-03-12 13:00:00",
        end_at: "2025-03-12 17:00:00",
        academic_year: "2024-2025",
        is_school_wide: 0,
        is_open: 1,
        created_by: "FAC-2024-001",
      },
    ]);
    console.log("✅ Events seeded");

    // ─── Research Projects ────────────────────────────────────────────────
    await ResearchProject.bulkCreate([
      {
        department_id: 1,
        title: "Deep Learning for Crop Disease Detection Using CNN",
        type: "faculty_research",
        abstract: "A CNN model for early detection of crop diseases using image classification on Philippine agricultural datasets.",
        keywords: "CNN, Deep Learning, Agriculture",
        status: "completed",
        start_date: "2022-06-01",
        end_date: "2023-05-31",
      },
      {
        department_id: 1,
        title: "Zero-Trust Security Model for Higher Education Institutions",
        type: "faculty_research",
        abstract: "A zero-trust architecture framework for securing academic information systems in higher education.",
        keywords: "Zero-Trust, Security, HEI",
        status: "published",
        start_date: "2023-06-01",
        end_date: "2024-03-31",
        pub_type: "journal",
        pub_title: "Zero-Trust Security Model for HEI",
        is_peer_reviewed: 1,
        published_at: "2024-05-15",
        doi: "10.5678/xyz",
      },
      {
        department_id: 1,
        title: "Microservices Architecture for Academic Management Systems",
        type: "capstone",
        abstract: "Analysis of microservices patterns applied to academic management systems for improved scalability.",
        keywords: "Microservices, Architecture",
        status: "ongoing",
        start_date: "2024-06-01",
      },
    ]);
    console.log("✅ Research projects seeded");

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
