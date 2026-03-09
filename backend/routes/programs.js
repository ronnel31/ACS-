const express = require("express");
const { body, validationResult } = require("express-validator");
const Program = require("../models/Program");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/programs
router.get("/", authenticate, async (req, res) => {
  try {
    const { department_id, is_active } = req.query;
    const where = {};
    if (department_id) where.department_id = parseInt(department_id);
    if (is_active !== undefined) where.is_active = parseInt(is_active);

    const programs = await Program.findAll({ where });
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/programs/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/programs
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("department_id").notEmpty().withMessage("Department ID is required"),
    body("code").trim().notEmpty().withMessage("Program code is required"),
    body("title").trim().notEmpty().withMessage("Program title is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const program = await Program.create(req.body);
      res.status(201).json(program);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Program code already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/programs/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Program.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Program not found" });
    const program = await Program.findByPk(req.params.id);
    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/programs/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Program.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Program not found" });
    res.json({ message: "Program deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
