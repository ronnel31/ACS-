const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ResearchMember = sequelize.define("ResearchMember", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  research_project_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  member_id: { type: DataTypes.STRING(20), allowNull: false },
  role: {
    type: DataTypes.ENUM(
      "lead_researcher", "co_researcher", "adviser", "panelist",
      "student_researcher", "other"
    ),
    allowNull: false,
  },
  joined_at: { type: DataTypes.DATEONLY, defaultValue: null },
}, {
  tableName: "research_member",
  timestamps: false,
  indexes: [{ unique: true, fields: ["research_project_id", "member_id"], name: "uq_rm" }],
});

module.exports = ResearchMember;
