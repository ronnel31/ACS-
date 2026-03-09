const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Schedule = sequelize.define("Schedule", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  term_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  member_id: { type: DataTypes.STRING(20), allowNull: false, comment: "Faculty teaching this slot" },
  course_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  room_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  section: { type: DataTypes.STRING(10), allowNull: false },
  day_pattern: { type: DataTypes.STRING(10), allowNull: false, comment: "e.g. MWF, TTh, Sat" },
  time_start: { type: DataTypes.TIME, allowNull: false },
  time_end: { type: DataTypes.TIME, allowNull: false },
  lecture_type: {
    type: DataTypes.ENUM("regular", "major"),
    allowNull: false,
    defaultValue: "regular",
    comment: "regular=2hrs per meeting, major=3hrs per meeting",
  },
  class_size: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: null },
  exam_type: {
    type: DataTypes.ENUM("midterm", "final", "quiz", "special"),
    defaultValue: null,
    comment: "NULL = regular class slot",
  },
  exam_date: { type: DataTypes.DATEONLY, defaultValue: null },
  exam_notes: { type: DataTypes.TEXT, defaultValue: null },
  is_active: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "schedule",
  timestamps: false,
  comment: "Master schedule for classes AND exams. lecture_type enforces 2hr/3hr slot duration.",
});

module.exports = Schedule;
