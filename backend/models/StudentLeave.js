const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StudentLeave = sequelize.define("StudentLeave", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  leave_type: {
    type: DataTypes.ENUM("medical", "personal", "financial", "academic"),
    allowNull: false,
  },
  filed_at: { type: DataTypes.DATEONLY, allowNull: false },
  effective_at: { type: DataTypes.DATEONLY, allowNull: false },
  expected_return: { type: DataTypes.DATEONLY, allowNull: false },
  actual_return: { type: DataTypes.DATEONLY, defaultValue: null },
  approved_by: { type: DataTypes.STRING(20), defaultValue: null },
  status: {
    type: DataTypes.ENUM("pending", "approved", "denied", "completed"),
    allowNull: false,
    defaultValue: "pending",
  },
  document_path: { type: DataTypes.STRING(255), defaultValue: null },
  remarks: { type: DataTypes.TEXT, defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "student_leave",
  timestamps: false,
});

module.exports = StudentLeave;
