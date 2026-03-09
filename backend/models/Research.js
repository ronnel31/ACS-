const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Research = sequelize.define("Research", {
  id: { type: DataTypes.STRING(20), primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  abstract: { type: DataTypes.TEXT },
  authors: { type: DataTypes.JSON },
  area: { type: DataTypes.STRING(100) },
  keywords: { type: DataTypes.JSON },
  year: { type: DataTypes.STRING(10) },
  doi: { type: DataTypes.STRING(100) },
}, {
  tableName: "research",
  timestamps: true,
});

module.exports = Research;
