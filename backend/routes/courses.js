const express = require("express");
const { body, validationResult } = require("express-validator");
const Course = require("../models/Course");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/courses
router.get("/", authenticate, async (req, res) => {
  try {
    const { is_active } = req.query;
    const where = {};
    if (is_active !== undefined) where.is_active = parseInt(is_active);

    const courses = await Course.findAll({ where });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/courses/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/courses
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("code").trim().notEmpty().withMessage("Course code is required"),
    body("title").trim().notEmpty().withMessage("Course title is required"),
    body("units").notEmpty().withMessage("Units is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const course = await Course.create(req.body);
      res.status(201).json(course);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Course code already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/courses/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Course not found" });
    const course = await Course.findByPk(req.params.id);
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/courses/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
