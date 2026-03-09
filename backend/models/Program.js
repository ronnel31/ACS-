const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Program = sequelize.define("Program", {
  id: { type: DataTypes.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  department_id: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  code: { type: DataTypes.STRING(15), allowNull: false },
  title: { type: DataTypes.STRING(120), allowNull: false },
  total_units: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 0 },
  is_active: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
}, {
  tableName: "program",
  timestamps: false,
  indexes: [{ unique: true, fields: ["code"], name: "uq_program_code" }],
});

module.exports = Program;
