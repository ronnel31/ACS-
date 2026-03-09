const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define("Department", {
  id: { type: DataTypes.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(10), allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  is_active: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
}, {
  tableName: "department",
  timestamps: false,
  indexes: [{ unique: true, fields: ["code"], name: "uq_dept_code" }],
});

module.exports = Department;
