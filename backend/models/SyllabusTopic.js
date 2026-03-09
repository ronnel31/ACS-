const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SyllabusTopic = sequelize.define("SyllabusTopic", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  syllabus_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  week_no: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: null },
  hours: { type: DataTypes.DECIMAL(4, 1), allowNull: false, defaultValue: 3.0 },
  outcomes_json: {
    type: DataTypes.TEXT,
    defaultValue: null,
    comment: "JSON array: [{outcome, bloom_level}]. bloom_level: remember|understand|apply|analyze|evaluate|create",
  },
  // lesson fields (merged from lesson)
  lesson_no: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: null },
  lesson_title: { type: DataTypes.STRING(200), defaultValue: null },
  objectives: { type: DataTypes.TEXT, defaultValue: null },
  content: { type: DataTypes.TEXT("long"), defaultValue: null },
  activities: { type: DataTypes.TEXT, defaultValue: null },
  materials: { type: DataTypes.TEXT, defaultValue: null },
  assessment: { type: DataTypes.TEXT, defaultValue: null },
  duration_mins: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: null },
  file_path: { type: DataTypes.STRING(255), defaultValue: null },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "syllabus_topic",
  timestamps: false,
  indexes: [{ unique: true, fields: ["syllabus_id", "week_no"], name: "uq_topic_week" }],
  comment: "Merged syllabus_topic + syllabus_outcome (outcomes_json) + lesson (lesson_* cols)",
});

module.exports = SyllabusTopic;
