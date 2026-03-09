const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Member = sequelize.define("Member", {
  id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    comment: "Natural key: 2024-CCS-0001 | FAC-2024-001 | ADMIN-001",
  },
  role: { type: DataTypes.ENUM("student", "faculty", "admin"), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  middle_name: { type: DataTypes.STRING(50), defaultValue: null },
  suffix: { type: DataTypes.STRING(10), defaultValue: null },
  birth_date: { type: DataTypes.DATEONLY, allowNull: false },
  sex: { type: DataTypes.ENUM("M", "F", "O"), allowNull: false },
  civil_status: { type: DataTypes.ENUM("S", "M", "W", "P"), allowNull: false },
  nationality: { type: DataTypes.STRING(40), allowNull: false, defaultValue: "Filipino" },
  religion: { type: DataTypes.STRING(40), defaultValue: null },
  contact_no: { type: DataTypes.STRING(15), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  address_home: { type: DataTypes.TEXT, allowNull: false },
  address_current: { type: DataTypes.TEXT, defaultValue: null },
  photo_path: { type: DataTypes.STRING(255), defaultValue: null },
  username: { type: DataTypes.STRING(50), allowNull: false },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  is_active: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
  last_login_at: { type: DataTypes.DATE, defaultValue: null },
  // student fields
  program_id: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: null },
  year_level: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: null, comment: "1-4; 0=Irregular" },
  section: { type: DataTypes.STRING(10), defaultValue: null },
  student_status: {
    type: DataTypes.ENUM("active", "inactive", "loa", "dropped", "graduated"),
    defaultValue: null,
  },
  scholarship: { type: DataTypes.STRING(80), defaultValue: null },
  enrolled_at: { type: DataTypes.DATEONLY, defaultValue: null },
  emergency_name: { type: DataTypes.STRING(100), defaultValue: null },
  emergency_rel: { type: DataTypes.STRING(40), defaultValue: null },
  emergency_no: { type: DataTypes.STRING(15), defaultValue: null },
  // faculty fields
  department_id: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: null },
  employee_no: { type: DataTypes.STRING(15), defaultValue: null },
  employment_type: {
    type: DataTypes.ENUM("full_time", "part_time", "contractual"),
    defaultValue: null,
  },
  is_full_time: { type: DataTypes.TINYINT(1), defaultValue: null },
  hired_at: { type: DataTypes.DATEONLY, defaultValue: null },
  salary_grade: { type: DataTypes.STRING(10), defaultValue: null },
  sss_no: { type: DataTypes.STRING(20), defaultValue: null },
  tin: { type: DataTypes.STRING(15), defaultValue: null },
  gsis_no: { type: DataTypes.STRING(20), defaultValue: null },
  // audit
  created_by: { type: DataTypes.STRING(20), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "member",
  timestamps: false,
  indexes: [
    { unique: true, fields: ["email"], name: "uq_member_email" },
    { unique: true, fields: ["username"], name: "uq_member_username" },
    { unique: true, fields: ["employee_no"], name: "uq_member_emp_no" },
  ],
});

module.exports = Member;
