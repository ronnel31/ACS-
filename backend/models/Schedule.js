const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Schedule = sequelize.define("Schedule", {
  id: { type: DataTypes.STRING(20), primaryKey: true },
  courseCode: { type: DataTypes.STRING(20), allowNull: false },
  subject: { type: DataTypes.STRING(100), allowNull: false },
  faculty: { type: DataTypes.STRING(100) },
  section: { type: DataTypes.STRING(20) },
  day: {
    type: DataTypes.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
  },
  timeStart: { type: DataTypes.STRING(10) },
  timeEnd: { type: DataTypes.STRING(10) },
  room: { type: DataTypes.STRING(50) },
  roomType: { type: DataTypes.STRING(50) },
  semester: { type: DataTypes.STRING(10) },
  year: { type: DataTypes.STRING(20) },
}, {
  tableName: "schedules",
  timestamps: true,
});

module.exports = Schedule;
