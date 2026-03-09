const express = require("express");
const { body, validationResult } = require("express-validator");
const AcademicTerm = require("../models/AcademicTerm");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/academic-terms
router.get("/", authenticate, async (req, res) => {
  try {
    const { is_current } = req.query;
    const where = {};
    if (is_current !== undefined) where.is_current = parseInt(is_current);

    const terms = await AcademicTerm.findAll({ where, order: [["academic_year", "DESC"], ["semester", "ASC"]] });
    res.json(terms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/academic-terms/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const term = await AcademicTerm.findByPk(req.params.id);
    if (!term) return res.status(404).json({ message: "Academic term not found" });
    res.json(term);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/academic-terms
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("academic_year").trim().notEmpty().withMessage("Academic year is required"),
    body("semester").notEmpty().withMessage("Semester is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const term = await AcademicTerm.create(req.body);
      res.status(201).json(term);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Academic term already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/academic-terms/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await AcademicTerm.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Academic term not found" });
    const term = await AcademicTerm.findByPk(req.params.id);
    res.json(term);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/academic-terms/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await AcademicTerm.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Academic term not found" });
    res.json({ message: "Academic term deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
