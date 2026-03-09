const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StudentSchedule = sequelize.define("StudentSchedule", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false, comment: "Student" },
  term_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  schedule_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: null,
    comment: "NULL = term enrollment summary row; non-null = specific class link",
  },
  // enrollment summary cols (populated on the NULL-schedule_id row per term)
  is_regular: { type: DataTypes.TINYINT(1), defaultValue: null },
  units_enrolled: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: null },
  units_standard: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: null },
  irreg_reason: { type: DataTypes.TEXT, defaultValue: null },
  assessed_by: { type: DataTypes.STRING(20), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "student_schedule",
  timestamps: false,
  comment: "Merged student_schedule + student_enrollment. schedule_id NULL = term summary row.",
});

module.exports = StudentSchedule;
