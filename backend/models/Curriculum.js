const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Curriculum = sequelize.define("Curriculum", {
  id: { type: DataTypes.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  program_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  code: { type: DataTypes.STRING(20), allowNull: false },
  effectivity_ay: { type: DataTypes.STRING(9), allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: null },
  is_active: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
  approved_by: { type: DataTypes.STRING(100), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "curriculum",
  timestamps: false,
  indexes: [{ unique: true, fields: ["program_id", "code"], name: "uq_curriculum" }],
});

module.exports = Curriculum;
