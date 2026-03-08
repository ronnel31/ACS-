export const CURRICULUM_DATA = [
  { id: "CUR-001", program: "BS Information Technology", version: "BSIT Curriculum 2022", status: "Active", year: "2022", courses: [
    { code: "IT101", title: "Introduction to Computing", units: 3, yearLevel: 1, sem: 1, prereq: "None" },
    { code: "IT102", title: "Computer Programming 1", units: 3, yearLevel: 1, sem: 1, prereq: "None" },
    { code: "IT201", title: "Data Structures and Algorithms", units: 3, yearLevel: 2, sem: 1, prereq: "IT102" },
    { code: "IT301", title: "Web Development", units: 3, yearLevel: 3, sem: 1, prereq: "IT201" },
    { code: "IT401", title: "AI Fundamentals", units: 3, yearLevel: 4, sem: 1, prereq: "IT301" },
  ]},
  { id: "CUR-002", program: "BS Computer Science", version: "BSCS Curriculum 2024", status: "Active", year: "2024", courses: [
    { code: "CS101", title: "Introduction to Computer Science", units: 3, yearLevel: 1, sem: 1, prereq: "None" },
    { code: "CS201", title: "Object-Oriented Programming", units: 3, yearLevel: 2, sem: 1, prereq: "CS101" },
    { code: "CS301", title: "Software Engineering", units: 3, yearLevel: 3, sem: 1, prereq: "CS201" },
    { code: "CS401", title: "Cybersecurity", units: 3, yearLevel: 4, sem: 1, prereq: "CS301" },
  ]},
];
