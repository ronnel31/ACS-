const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AcademicTerm = sequelize.define("AcademicTerm", {
  id: { type: DataTypes.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  academic_year: { type: DataTypes.STRING(9), allowNull: false, comment: "e.g. 2024-2025" },
  semester: { type: DataTypes.ENUM("1st", "2nd", "Summer"), allowNull: false },
  start_date: { type: DataTypes.DATEONLY, defaultValue: null },
  end_date: { type: DataTypes.DATEONLY, defaultValue: null },
  is_current: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
}, {
  tableName: "academic_term",
  timestamps: false,
  indexes: [{ unique: true, fields: ["academic_year", "semester"], name: "uq_term" }],
});

module.exports = AcademicTerm;
