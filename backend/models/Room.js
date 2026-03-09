const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Room = sequelize.define("Room", {
  id: { type: DataTypes.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(20), allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  type: {
    type: DataTypes.ENUM("lecture", "laboratory", "conference", "auditorium", "other"),
    allowNull: false,
  },
  capacity: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 0 },
  building: { type: DataTypes.STRING(60), defaultValue: null },
  floor_no: { type: DataTypes.TINYINT, defaultValue: null },
  has_projector: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  has_ac: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  is_active: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 1 },
}, {
  tableName: "room",
  timestamps: false,
  indexes: [{ unique: true, fields: ["code"], name: "uq_room_code" }],
  comment: "Rooms shared by scheduling and events",
});

module.exports = Room;
