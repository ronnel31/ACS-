const express = require("express");
const { body, validationResult } = require("express-validator");
const Schedule = require("../models/Schedule");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/schedules
router.get("/", authenticate, async (req, res) => {
  try {
    const { term_id, member_id, section, course_id, room_id } = req.query;
    const where = {};

    if (term_id) where.term_id = parseInt(term_id);
    if (member_id) where.member_id = member_id;
    if (section) where.section = section;
    if (course_id) where.course_id = parseInt(course_id);
    if (room_id) where.room_id = parseInt(room_id);

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
    body("term_id").notEmpty().withMessage("Term ID is required"),
    body("member_id").trim().notEmpty().withMessage("Faculty member ID is required"),
    body("course_id").notEmpty().withMessage("Course ID is required"),
    body("room_id").notEmpty().withMessage("Room ID is required"),
    body("section").trim().notEmpty().withMessage("Section is required"),
    body("day_pattern").trim().notEmpty().withMessage("Day pattern is required"),
    body("time_start").notEmpty().withMessage("Start time is required"),
    body("time_end").notEmpty().withMessage("End time is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const schedule = await Schedule.create(req.body);
      res.status(201).json(schedule);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Schedule conflict: room or faculty already booked for this time slot" });
      }
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
