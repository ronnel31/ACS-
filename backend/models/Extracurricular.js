const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Extracurricular = sequelize.define("Extracurricular", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  term_id: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: null, comment: "NULL for hobbies" },
  type: { type: DataTypes.ENUM("sport", "hobby"), allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  category: { type: DataTypes.STRING(60), defaultValue: null },
  team: { type: DataTypes.STRING(100), defaultValue: null },
  position: { type: DataTypes.STRING(50), defaultValue: null },
  level: {
    type: DataTypes.ENUM("intramural", "intercollege", "regional", "national", "international"),
    defaultValue: null,
  },
  achievement: { type: DataTypes.STRING(200), defaultValue: null },
  coach: { type: DataTypes.STRING(100), defaultValue: null },
  is_active: { type: DataTypes.TINYINT(1), defaultValue: null },
  skill_level: { type: DataTypes.ENUM("beginner", "intermediate", "advanced"), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "extracurricular",
  timestamps: false,
  comment: "Student sports and hobbies — type discriminator column",
});

module.exports = Extracurricular;
