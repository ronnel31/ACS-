const express = require("express");
const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const Event = require("../models/Event");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/events
router.get("/", authenticate, async (req, res) => {
  try {
    const { search, type, academic_year } = req.query;
    const where = {};

    if (search) where.title = { [Op.like]: `%${search}%` };
    if (type) where.type = type;
    if (academic_year) where.academic_year = academic_year;

    const events = await Event.findAll({ where, order: [["start_at", "ASC"]] });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/events/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/events
router.post(
  "/",
  authenticate,
  authorize("admin", "faculty"),
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("start_at").notEmpty().withMessage("Start date/time is required"),
    body("end_at").notEmpty().withMessage("End date/time is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const event = await Event.create({ ...req.body, created_by: req.user.id });
      res.status(201).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/events/:id
router.put("/:id", authenticate, authorize("admin", "faculty"), async (req, res) => {
  try {
    const [updated] = await Event.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    const event = await Event.findByPk(req.params.id);
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/events/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
