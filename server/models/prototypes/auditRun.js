const moment = require('moment')
const recFixes = require('../../controllers/recFixes')
const appendices = require('../../config/appendices')
const WcagReport = require('../../controllers/report')
module.exports = (models) => {
  models.wcag_run.getByTaskName = (project_id, name) => {
    const where = { project_id, name }
    return generateReport(where, models)
  }
}

async function generateReport (where, models) {
  const audits = await models.wcag_run.findAll({
    where,
    include: [{
      model: models.wcag_violation,
      include: [
        { model: models.wcag_page },
        { model: models.wcag_impact }
      ]
    },
    {
      model: models.g5_updatable_location,
      attributes: ['name', 'display_name']
    }
    ],
    order: [
      ['run_group', 'DESC']
    ]
  })
  const report = new WcagReport({ audits })
  return report.generate()
}
