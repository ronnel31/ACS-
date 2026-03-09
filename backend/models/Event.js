const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  type: {
    type: DataTypes.ENUM("academic", "cultural", "sports", "civic", "seminar", "competition", "other"),
    allowNull: false,
  },
  description: { type: DataTypes.TEXT, defaultValue: null },
  organizer: { type: DataTypes.STRING(150), defaultValue: null },
  venue: { type: DataTypes.STRING(150), defaultValue: null },
  room_id: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: null },
  start_at: { type: DataTypes.DATE, allowNull: false },
  end_at: { type: DataTypes.DATE, allowNull: false },
  academic_year: { type: DataTypes.STRING(9), defaultValue: null },
  is_school_wide: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  is_open: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
  created_by: { type: DataTypes.STRING(20), allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "event",
  timestamps: false,
});

module.exports = Event;
