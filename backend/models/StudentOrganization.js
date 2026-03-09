const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StudentOrganization = sequelize.define("StudentOrganization", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  org_name: { type: DataTypes.STRING(150), allowNull: false },
  org_type: {
    type: DataTypes.ENUM("student_council", "academic", "social", "religious", "ngo", "other"),
    allowNull: false,
  },
  position: { type: DataTypes.STRING(80), allowNull: false },
  year_term: { type: DataTypes.STRING(9), allowNull: false },
  is_school_based: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
  is_accredited: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  accomplishments: { type: DataTypes.TEXT, defaultValue: null },
  adviser: { type: DataTypes.STRING(100), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "student_organization",
  timestamps: false,
});

module.exports = StudentOrganization;
