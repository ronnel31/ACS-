const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Certification = sequelize.define("Certification", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  cert_name: { type: DataTypes.STRING(200), allowNull: false },
  issuing_body: { type: DataTypes.STRING(150), allowNull: false },
  cert_type: {
    type: DataTypes.ENUM(
      "training", "seminar", "workshop", "tesda", "professional",
      "government", "international", "other"
    ),
    allowNull: false,
  },
  conducted_by: { type: DataTypes.STRING(150), defaultValue: null },
  venue: { type: DataTypes.STRING(150), defaultValue: null },
  started_at: { type: DataTypes.DATEONLY, defaultValue: null },
  completed_at: { type: DataTypes.DATEONLY, allowNull: false },
  expiry_at: { type: DataTypes.DATEONLY, defaultValue: null },
  duration_hours: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: null },
  cert_no: { type: DataTypes.STRING(50), defaultValue: null },
  level: { type: DataTypes.ENUM("local", "national", "international"), defaultValue: null },
  funded_by: { type: DataTypes.ENUM("self", "school", "ched", "dost", "other"), defaultValue: null },
  cert_path: { type: DataTypes.STRING(255), defaultValue: null },
  is_verified: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  verified_by: { type: DataTypes.STRING(20), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "certification",
  timestamps: false,
  comment: "Training and certification records — covers both student and faculty",
});

module.exports = Certification;
