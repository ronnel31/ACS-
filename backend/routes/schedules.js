const express = require("express");
const { body, validationResult } = require("express-validator");
const Schedule = require("../models/Schedule");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/schedules
router.get("/", authenticate, async (req, res) => {
  try {
    const { faculty, section, semester, year } = req.query;
    const where = {};

    if (faculty) where.faculty = faculty;
    if (section) where.section = section;
    if (semester) where.semester = semester;
    if (year) where.year = year;

    const schedules = await Schedule.findAll({ where });
    res.json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/schedules/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/schedules
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("courseCode").trim().notEmpty().withMessage("Course code is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const schedule = await Schedule.create(req.body);
      res.status(201).json(schedule);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/schedules/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Schedule.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Schedule not found" });
    const schedule = await Schedule.findByPk(req.params.id);
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/schedules/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Schedule.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Schedule not found" });
    res.json({ message: "Schedule deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
