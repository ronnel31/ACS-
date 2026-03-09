const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Member = require("../models/Member");

const router = express.Router();

// POST /api/auth/login
router.post(
  "/login",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const member = await Member.findOne({ where: { username, is_active: 1 } });
      if (!member) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, member.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Update last login timestamp
      await member.update({ last_login_at: new Date() });

      const token = jwt.sign(
        {
          id: member.id,
          role: member.role,
          name: `${member.first_name} ${member.last_name}`,
        },
        process.env.JWT_SECRET || "acs_secret_key",
        { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
      );

      res.json({
        token,
        user: {
          id: member.id,
          username: member.username,
          role: member.role,
          name: `${member.first_name} ${member.last_name}`,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
