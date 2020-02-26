const { INTEGER, STRING } = require('sequelize')

module.exports = (sequelize) => {
  const violation = sequelize.define('wcag_violation', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    element: {
      type: STRING(1000)
    },
    description: {
      type: STRING(1000),
      allowNull: false
    },
    html: {
      type: STRING(1000),
      allowNull: false
    },
    target: {
      type: STRING(1000),
      allowNull: false
    },
    summary: {
      type: STRING(1000)
    }
  })
  violation.associate = (models) => {
    models.wcag_violation.belongsTo(models.wcag_page)
    models.wcag_violation.belongsTo(models.wcag_impact)
  }
  return violation
}
