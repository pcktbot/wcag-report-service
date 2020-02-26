const { INTEGER, STRING } = require('sequelize')

module.exports = (sequelize) => {
  const wcagRun = sequelize.define('wcag_run', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    task_id: {
      type: INTEGER
    },
    project_id: {
      type: INTEGER
    },
    run_group: {
      type: INTEGER
    },
    critical_count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    serious_count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    moderate_count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    minor_count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    pages_eval: {
      type: INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: STRING
    },
    axeVersion: {
      type: STRING
    }
  }, {
    paranoid: true
  })
  wcagRun.associate = (models) => {
    models.wcag_run.hasMany(models.wcag_violation)
    models.wcag_run.belongsTo(models.g5_updatable_location)
  }
  return wcagRun
}
