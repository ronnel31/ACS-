const express = require("express");
const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const Student = require("../models/Student");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/students
router.get("/", authenticate, async (req, res) => {
  try {
    const { search, course, year, status } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { fullName: { [Op.like]: `%${search}%` } },
        { studentNumber: { [Op.like]: `%${search}%` } },
      ];
    }
    if (course) where.course = course;
    if (year) where.year = parseInt(year);
    if (status) where.status = status;

    const students = await Student.findAll({ where });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/students/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/students
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("studentNumber").trim().notEmpty().withMessage("Student number is required"),
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("course").trim().notEmpty().withMessage("Course is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const student = await Student.create({ id: req.body.studentNumber, ...req.body });
      res.status(201).json(student);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Student number already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/students/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Student not found" });
    const student = await Student.findByPk(req.params.id);
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/students/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
