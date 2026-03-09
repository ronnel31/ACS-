const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
  id: { type: DataTypes.STRING(20), primaryKey: true },
  title: { type: DataTypes.STRING(150), allowNull: false },
  description: { type: DataTypes.TEXT },
  type: {
    type: DataTypes.ENUM("Seminar", "Workshop", "Hackathon", "Thesis Defense", "General Assembly", "Career Fair", "Others"),
  },
  department: { type: DataTypes.ENUM("IT", "CS", "Both") },
  organizer: { type: DataTypes.STRING(100) },
  date: { type: DataTypes.DATEONLY },
  startTime: { type: DataTypes.STRING(10) },
  endTime: { type: DataTypes.STRING(10) },
  venue: { type: DataTypes.STRING(150) },
  mode: { type: DataTypes.ENUM("Onsite", "Online", "Hybrid") },
  meetingLink: { type: DataTypes.STRING(255) },
  platform: { type: DataTypes.STRING(50) },
  capacity: { type: DataTypes.INTEGER },
  participants: { type: DataTypes.INTEGER, defaultValue: 0 },
  certificateIssued: { type: DataTypes.BOOLEAN, defaultValue: false },
  semester: { type: DataTypes.STRING(10) },
  participantList: { type: DataTypes.JSON },
}, {
  tableName: "events",
  timestamps: true,
});

module.exports = Event;
