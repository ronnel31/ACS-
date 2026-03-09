const express = require("express");
const { body, validationResult } = require("express-validator");
const Room = require("../models/Room");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET /api/rooms
router.get("/", authenticate, async (req, res) => {
  try {
    const { type, is_active } = req.query;
    const where = {};
    if (type) where.type = type;
    if (is_active !== undefined) where.is_active = parseInt(is_active);

    const rooms = await Room.findAll({ where });
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/rooms/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/rooms
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("code").trim().notEmpty().withMessage("Room code is required"),
    body("name").trim().notEmpty().withMessage("Room name is required"),
    body("type").notEmpty().withMessage("Room type is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const room = await Room.create(req.body);
      res.status(201).json(room);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Room code already exists" });
      }
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/rooms/:id
router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const [updated] = await Room.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Room not found" });
    const room = await Room.findByPk(req.params.id);
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/rooms/:id
router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  try {
    const deleted = await Room.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
