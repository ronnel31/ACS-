const express = require("express");
const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const Faculty = require("../models/Faculty");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/faculty
router.get("/", authenticate, async (req, res) => {
  try {
    const { search, department, status } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { fullName: { [Op.like]: `%${search}%` } },
        { employeeNumber: { [Op.like]: `%${search}%` } },
      ];
    }
    if (department) where.department = department;
    if (status) where.facultyStatus = status;

    const faculty = await Faculty.findAll({ where });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/faculty/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const member = await Faculty.findByPk(req.params.id);
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
    body("employeeNumber").trim().notEmpty().withMessage("Employee number is required"),
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const member = await Faculty.create({ id: req.body.employeeNumber, ...req.body });
      res.status(201).json(member);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Employee number already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/faculty/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Faculty.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Faculty member not found" });
    const member = await Faculty.findByPk(req.params.id);
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/faculty/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Faculty.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Faculty member not found" });
    res.json({ message: "Faculty member deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
