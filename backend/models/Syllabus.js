const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Syllabus = sequelize.define("Syllabus", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  course_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  member_id: { type: DataTypes.STRING(20), allowNull: false, comment: "Faculty author" },
  term_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: null },
  objectives: { type: DataTypes.TEXT, defaultValue: null },
  grading_system: { type: DataTypes.TEXT, defaultValue: null },
  references_list: { type: DataTypes.TEXT, defaultValue: null },
  file_path: { type: DataTypes.STRING(255), defaultValue: null },
  is_approved: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  approved_by: { type: DataTypes.STRING(20), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "syllabus",
  timestamps: false,
  indexes: [{ unique: true, fields: ["course_id", "member_id", "term_id"], name: "uq_syllabus" }],
});

module.exports = Syllabus;
