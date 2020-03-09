
const models = require('../models')

module.exports = (app) => {
  app.get('/api/reports', async (req, res) => {
    const { name, salesforceId, projctId } = req.query
    if (!name) {
      res.sendStatus(500)
    } else {
      const report = await models.wcag_run.getByTaskName(projctId, salesforceId, name)
      res.json(report)
    }
  })
}
