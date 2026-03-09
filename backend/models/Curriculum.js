const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Curriculum = sequelize.define("Curriculum", {
  id: { type: DataTypes.STRING(20), primaryKey: true },
  program: { type: DataTypes.STRING(100), allowNull: false },
  version: { type: DataTypes.STRING(100) },
  status: { type: DataTypes.ENUM("Active", "Inactive", "Archived"), defaultValue: "Active" },
  year: { type: DataTypes.STRING(10) },
  courses: { type: DataTypes.JSON },
}, {
  tableName: "curricula",
  timestamps: true,
});

module.exports = Curriculum;
