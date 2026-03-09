const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define("Course", {
  id: { type: DataTypes.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(15), allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: false },
  units: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  lab_units: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 0 },
  description: { type: DataTypes.TEXT, defaultValue: null },
  is_active: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
}, {
  tableName: "course",
  timestamps: false,
  indexes: [{ unique: true, fields: ["code"], name: "uq_course_code" }],
  comment: "Master course list — shared by schedule, syllabus, curriculum",
});

module.exports = Course;
