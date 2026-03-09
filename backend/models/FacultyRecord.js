const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FacultyRecord = sequelize.define("FacultyRecord", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  record_type: { type: DataTypes.ENUM("education", "position"), allowNull: false },
  // EDUCATION fields
  degree_level: {
    type: DataTypes.ENUM("baccalaureate", "masteral", "doctorate", "double_degree", "post_doctorate"),
    defaultValue: null,
  },
  degree_title: { type: DataTypes.STRING(150), defaultValue: null },
  specialization: { type: DataTypes.STRING(150), defaultValue: null },
  institution: { type: DataTypes.STRING(150), defaultValue: null },
  country: { type: DataTypes.STRING(60), defaultValue: "Philippines" },
  year_started: { type: DataTypes.INTEGER, defaultValue: null },
  year_graduated: { type: DataTypes.INTEGER, defaultValue: null },
  thesis_title: { type: DataTypes.TEXT, defaultValue: null },
  honors: { type: DataTypes.STRING(100), defaultValue: null },
  diploma_path: { type: DataTypes.STRING(255), defaultValue: null },
  is_verified: { type: DataTypes.TINYINT(1), defaultValue: 0 },
  verified_by: { type: DataTypes.STRING(20), defaultValue: null },
  // POSITION fields
  title: {
    type: DataTypes.ENUM("dean", "associate_dean", "chair", "faculty", "secretary", "admin_officer", "other"),
    defaultValue: null,
  },
  academic_rank: { type: DataTypes.STRING(60), defaultValue: null },
  desig_level: { type: DataTypes.ENUM("academic", "administrative", "both"), defaultValue: null },
  effective_at: { type: DataTypes.DATEONLY, defaultValue: null },
  ended_at: { type: DataTypes.DATEONLY, defaultValue: null },
  appoint_type: {
    type: DataTypes.ENUM("permanent", "temporary", "designation", "co_terminus"),
    defaultValue: null,
  },
  appoint_order: { type: DataTypes.STRING(50), defaultValue: null },
  appoint_path: { type: DataTypes.STRING(255), defaultValue: null },
  is_active: { type: DataTypes.TINYINT(1), defaultValue: 1 },
  // audit
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "faculty_record",
  timestamps: false,
  comment: "Merged faculty_education + faculty_position. record_type discriminates row purpose.",
});

module.exports = FacultyRecord;
