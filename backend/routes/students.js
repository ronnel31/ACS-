const express = require("express");
const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Member = require("../models/Member");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/students
router.get("/", authenticate, async (req, res) => {
  try {
    const { search, program_id, year_level, student_status, section } = req.query;
    const where = { role: "student" };

    if (search) {
      where[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { id: { [Op.like]: `%${search}%` } },
      ];
    }
    if (program_id) where.program_id = parseInt(program_id);
    if (year_level) where.year_level = parseInt(year_level);
    if (student_status) where.student_status = student_status;
    if (section) where.section = section;

    const students = await Member.findAll({ where });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/students/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const student = await Member.findOne({ where: { id: req.params.id, role: "student" } });
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
    body("id").trim().notEmpty().withMessage("Student ID is required"),
    body("last_name").trim().notEmpty().withMessage("Last name is required"),
    body("first_name").trim().notEmpty().withMessage("First name is required"),
    body("birth_date").notEmpty().withMessage("Birth date is required"),
    body("sex").notEmpty().withMessage("Sex is required"),
    body("civil_status").notEmpty().withMessage("Civil status is required"),
    body("contact_no").trim().notEmpty().withMessage("Contact number is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("address_home").trim().notEmpty().withMessage("Home address is required"),
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password_hash").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password_hash, salt);
      const student = await Member.create({
        ...req.body,
        role: "student",
        password_hash: hashedPassword,
        created_by: req.user.id,
      });
      res.status(201).json(student);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Student ID, email, or username already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/students/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const student = await Member.findOne({ where: { id: req.params.id, role: "student" } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const updateData = { ...req.body };
    if (updateData.password_hash) {
      const salt = await bcrypt.genSalt(10);
      updateData.password_hash = await bcrypt.hash(updateData.password_hash, salt);
    }
    // Prevent role change
    delete updateData.role;

    await student.update(updateData);
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/students/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Member.destroy({ where: { id: req.params.id, role: "student" } });
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
