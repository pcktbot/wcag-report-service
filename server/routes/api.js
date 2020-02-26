
const models = require('../models')
module.exports = (app) => {
  app.get('/api/reports/:projctId', async (req, res) => {
    const { name } = req.query
    const { projctId } = req.params
    if (!name) {
      res.sendStatus(500)
    } else {
      const report = await models.wcag_run.getByTaskName(projctId, name)
      res.json(report)
    }
  })
}
