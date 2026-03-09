require("dotenv").config();
const { Sequelize } = require("sequelize");
const path = require("path");

const useSQLite =
  process.env.DB_DIALECT === "sqlite" ||
  (!process.env.DB_PASSWORD && !process.env.DB_HOST && process.env.NODE_ENV !== "production");

let sequelize;

if (useSQLite) {
  const storagePath = process.env.SQLITE_PATH || path.join(__dirname, "../ccs_dev.sqlite");
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: storagePath,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "ccs",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
}

module.exports = sequelize;
