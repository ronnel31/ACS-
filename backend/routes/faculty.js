const express = require("express");
const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Member = require("../models/Member");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/faculty
router.get("/", authenticate, async (req, res) => {
  try {
    const { search, department_id, employment_type } = req.query;
    const where = { role: "faculty" };

    if (search) {
      where[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { employee_no: { [Op.like]: `%${search}%` } },
      ];
    }
    if (department_id) where.department_id = parseInt(department_id);
    if (employment_type) where.employment_type = employment_type;

    const faculty = await Member.findAll({ where });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/faculty/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const member = await Member.findOne({ where: { id: req.params.id, role: "faculty" } });
    if (!member) return res.status(404).json({ message: "Faculty member not found" });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/faculty
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("id").trim().notEmpty().withMessage("Faculty ID is required"),
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
      const member = await Member.create({
        ...req.body,
        role: "faculty",
        password_hash: hashedPassword,
        created_by: req.user.id,
      });
      res.status(201).json(member);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Faculty ID, email, username, or employee number already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/faculty/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const member = await Member.findOne({ where: { id: req.params.id, role: "faculty" } });
    if (!member) return res.status(404).json({ message: "Faculty member not found" });

    const updateData = { ...req.body };
    if (updateData.password_hash) {
      const salt = await bcrypt.genSalt(10);
      updateData.password_hash = await bcrypt.hash(updateData.password_hash, salt);
    }
    // Prevent role change
    delete updateData.role;

    await member.update(updateData);
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/faculty/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Member.destroy({ where: { id: req.params.id, role: "faculty" } });
    if (!deleted) return res.status(404).json({ message: "Faculty member not found" });
    res.json({ message: "Faculty member deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
