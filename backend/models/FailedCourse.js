const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FailedCourse = sequelize.define("FailedCourse", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  course_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  term_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  final_grade: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
  instructor: { type: DataTypes.STRING(100), defaultValue: null },
  retake_status: {
    type: DataTypes.ENUM("pending", "enrolled", "passed", "failed_again"),
    allowNull: false,
    defaultValue: "pending",
  },
  remarks: { type: DataTypes.TEXT, defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "failed_course",
  timestamps: false,
  indexes: [{ unique: true, fields: ["member_id", "course_id", "term_id"], name: "uq_failed" }],
});

module.exports = FailedCourse;
