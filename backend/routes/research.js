const express = require("express");
const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const Research = require("../models/Research");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/research
router.get("/", authenticate, async (req, res) => {
  try {
    const { search, area, year } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { abstract: { [Op.like]: `%${search}%` } },
      ];
    }
    if (area) where.area = area;
    if (year) where.year = year;

    const research = await Research.findAll({ where, order: [["year", "DESC"]] });
    res.json(research);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/research/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const item = await Research.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Research not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/research
router.post(
  "/",
  authenticate,
  authorize("admin", "faculty"),
  [body("title").trim().notEmpty().withMessage("Title is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const item = await Research.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/research/:id
router.put("/:id", authenticate, authorize("admin", "faculty"), async (req, res) => {
  try {
    const [updated] = await Research.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Research not found" });
    const item = await Research.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/research/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Research.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Research not found" });
    res.json({ message: "Research deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
