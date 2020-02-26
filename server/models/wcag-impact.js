const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => sequelize.define('wcag_impact', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  name: {
    type: STRING
  }
})
