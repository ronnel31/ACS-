const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EventParticipant = sequelize.define("EventParticipant", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  event_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  role: {
    type: DataTypes.ENUM(
      "participant", "organizer", "volunteer", "delegate",
      "representative", "judge", "speaker"
    ),
    allowNull: false,
  },
  award: { type: DataTypes.STRING(200), defaultValue: null },
  proof_path: { type: DataTypes.STRING(255), defaultValue: null },
  attended: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "event_participant",
  timestamps: false,
  indexes: [{ unique: true, fields: ["event_id", "member_id"], name: "uq_ep" }],
  comment: "Unified for both student and faculty participants",
});

module.exports = EventParticipant;
