const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CurriculumCourse = sequelize.define("CurriculumCourse", {
  id: { type: DataTypes.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  curriculum_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  course_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  year_level: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  semester: { type: DataTypes.ENUM("1st", "2nd", "Summer"), allowNull: false },
  is_elective: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
  prerequisite_id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    defaultValue: null,
    comment: "FK to course.id",
  },
}, {
  tableName: "curriculum_course",
  timestamps: false,
  indexes: [{ unique: true, fields: ["curriculum_id", "course_id"], name: "uq_cc" }],
});

module.exports = CurriculumCourse;
