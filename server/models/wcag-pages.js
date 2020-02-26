const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => sequelize.define('wcag_page', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  url: {
    type: STRING
  }
})
