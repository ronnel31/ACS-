const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ResearchProject = sequelize.define("ResearchProject", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  department_id: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: false },
  type: {
    type: DataTypes.ENUM(
      "faculty_research", "thesis", "capstone", "dissertation", "extension", "other"
    ),
    allowNull: false,
  },
  abstract: { type: DataTypes.TEXT, defaultValue: null },
  keywords: { type: DataTypes.STRING(255), defaultValue: null },
  status: {
    type: DataTypes.ENUM("proposal", "ongoing", "completed", "published", "cancelled"),
    allowNull: false,
    defaultValue: "proposal",
  },
  start_date: { type: DataTypes.DATEONLY, defaultValue: null },
  end_date: { type: DataTypes.DATEONLY, defaultValue: null },
  funding_source: { type: DataTypes.STRING(150), defaultValue: null },
  funding_amount: { type: DataTypes.DECIMAL(12, 2), defaultValue: null },
  // publication fields (populated when status = 'published')
  pub_type: {
    type: DataTypes.ENUM(
      "journal", "conference_paper", "book_chapter", "thesis", "capstone_report", "other"
    ),
    defaultValue: null,
  },
  pub_title: { type: DataTypes.STRING(255), defaultValue: null },
  journal_conference: { type: DataTypes.STRING(200), defaultValue: null },
  volume: { type: DataTypes.STRING(20), defaultValue: null },
  issue: { type: DataTypes.STRING(20), defaultValue: null },
  pages: { type: DataTypes.STRING(20), defaultValue: null },
  doi: { type: DataTypes.STRING(120), defaultValue: null },
  issn_isbn: { type: DataTypes.STRING(25), defaultValue: null },
  published_at: { type: DataTypes.DATEONLY, defaultValue: null },
  indexed_in: {
    type: DataTypes.STRING(100),
    defaultValue: null,
    comment: "e.g. Scopus, ISI, CHED-recognized",
  },
  is_peer_reviewed: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  pub_file_path: { type: DataTypes.STRING(255), defaultValue: null },
  // audit
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: null },
}, {
  tableName: "research_project",
  timestamps: false,
  comment: "Merged research_project + publication. pub_* cols null when unpublished.",
});

module.exports = ResearchProject;
