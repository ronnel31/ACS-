require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const sequelize = require("./config/database");

// Route imports
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const facultyRoutes = require("./routes/faculty");
const eventRoutes = require("./routes/events");
const scheduleRoutes = require("./routes/schedules");
const researchRoutes = require("./routes/research");
const curriculumRoutes = require("./routes/curriculum");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Rate Limiters ────────────────────────────────────────────────────────────
// Strict limit on authentication to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

// General limit for all other API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/students", apiLimiter, studentRoutes);
app.use("/api/faculty", apiLimiter, facultyRoutes);
app.use("/api/events", apiLimiter, eventRoutes);
app.use("/api/schedules", apiLimiter, scheduleRoutes);
app.use("/api/research", apiLimiter, researchRoutes);
app.use("/api/curriculum", apiLimiter, curriculumRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ACS Backend is running" });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Database Sync & Start ────────────────────────────────────────────────────
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL database connected");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 ACS Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to database:", err.message);
    process.exit(1);
  });
