const express = require("express");
const { body, validationResult } = require("express-validator");
const Curriculum = require("../models/Curriculum");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/curriculum
router.get("/", authenticate, async (req, res) => {
  try {
    const { program_id, is_active } = req.query;
    const where = {};
    if (program_id) where.program_id = parseInt(program_id);
    if (is_active !== undefined) where.is_active = parseInt(is_active);

    const curricula = await Curriculum.findAll({ where });
    res.json(curricula);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/curriculum/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const curriculum = await Curriculum.findByPk(req.params.id);
    if (!curriculum) return res.status(404).json({ message: "Curriculum not found" });
    res.json(curriculum);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/curriculum
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("program_id").notEmpty().withMessage("Program ID is required"),
    body("code").trim().notEmpty().withMessage("Curriculum code is required"),
    body("effectivity_ay").trim().notEmpty().withMessage("Effectivity academic year is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const curriculum = await Curriculum.create(req.body);
      res.status(201).json(curriculum);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Curriculum code already exists for this program" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/curriculum/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Curriculum.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Curriculum not found" });
    const curriculum = await Curriculum.findByPk(req.params.id);
    res.json(curriculum);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/curriculum/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Curriculum.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Curriculum not found" });
    res.json({ message: "Curriculum deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
