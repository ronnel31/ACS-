const express = require("express");
const { body, validationResult } = require("express-validator");
const Department = require("../models/Department");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/departments
router.get("/", authenticate, async (req, res) => {
  try {
    const { is_active } = req.query;
    const where = {};
    if (is_active !== undefined) where.is_active = parseInt(is_active);

    const departments = await Department.findAll({ where });
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/departments/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const dept = await Department.findByPk(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json(dept);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/departments
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("code").trim().notEmpty().withMessage("Department code is required"),
    body("name").trim().notEmpty().withMessage("Department name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const dept = await Department.create(req.body);
      res.status(201).json(dept);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Department code already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/departments/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Department.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Department not found" });
    const dept = await Department.findByPk(req.params.id);
    res.json(dept);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/departments/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Department.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
