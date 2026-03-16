require("dotenv").config();
const { Sequelize } = require("sequelize");

/**
 * Sequelize database connection instance.
 *
 * Why Sequelize?
 * An ORM (Object-Relational Mapper) lets the application work with plain
 * JavaScript objects instead of writing raw SQL.  Sequelize adds:
 * - Schema definition and automatic table creation/migration via `sync`.
 * - A rich query builder that prevents SQL-injection through parameterised
 *   queries by default.
 * - Relationship helpers (hasMany, belongsTo, etc.) that make cross-table
 *   queries readable and maintainable.
 *
 * Connection pooling is configured so the server can handle concurrent
 * requests efficiently without opening a new database connection for every
 * incoming HTTP request.  The pool keeps up to 10 connections alive and
 * removes idle connections after 10 seconds.
 *
 * All credentials are read from environment variables (never hard-coded)
 * so the same codebase can target local dev, staging, and production
 * databases without any code changes — only a different `.env` file.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || "ccs",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    // Log SQL queries only in development so production logs stay clean
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 10,     // Maximum number of concurrent connections in the pool
      min: 0,      // Allow the pool to shrink to zero when idle
      acquire: 30000, // Maximum time (ms) to wait for a connection before throwing
      idle: 10000,    // Time (ms) a connection can be idle before being released
    },
  }
);

module.exports = sequelize;
