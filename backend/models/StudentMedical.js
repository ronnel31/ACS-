const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StudentMedical = sequelize.define("StudentMedical", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  exam_date: { type: DataTypes.DATEONLY, allowNull: false },
  physician: { type: DataTypes.STRING(100), allowNull: false },
  clinic: { type: DataTypes.STRING(150), defaultValue: null },
  height_cm: { type: DataTypes.DECIMAL(5, 2), defaultValue: null },
  weight_kg: { type: DataTypes.DECIMAL(5, 2), defaultValue: null },
  bmi: { type: DataTypes.DECIMAL(4, 2), defaultValue: null, comment: "Computed: weight/(height/100)^2" },
  blood_type: {
    type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
    defaultValue: null,
  },
  blood_pressure: { type: DataTypes.STRING(10), defaultValue: null },
  visual_l: { type: DataTypes.STRING(10), defaultValue: null },
  visual_r: { type: DataTypes.STRING(10), defaultValue: null },
  hearing_l: { type: DataTypes.ENUM("normal", "impaired", "deaf"), defaultValue: null },
  hearing_r: { type: DataTypes.ENUM("normal", "impaired", "deaf"), defaultValue: null },
  conditions: { type: DataTypes.TEXT, defaultValue: null },
  medications: { type: DataTypes.TEXT, defaultValue: null },
  immunizations: { type: DataTypes.TEXT, defaultValue: null },
  fit_status: { type: DataTypes.ENUM("fit", "fit_with_conditions", "unfit"), allowNull: false },
  clearance_path: { type: DataTypes.STRING(255), defaultValue: null },
  next_exam_at: { type: DataTypes.DATEONLY, defaultValue: null },
  recorded_by: { type: DataTypes.STRING(20), allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: "student_medical",
  timestamps: false,
  comment: "Highly confidential — RA 10173 applies. Admin access only.",
});

module.exports = StudentMedical;
