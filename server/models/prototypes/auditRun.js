const moment = require('moment')
const recFixes = require('../../controllers/recFixes')
module.exports = (models) => {
  models.wcag_run.getByTaskName = (project_id, name) => {
    const where = { project_id, name }
    return generateReport(where, models)
  }
}

async function generateReport (where, models) {
  const data = {
    chart: {
      pass: [],
      fail: [],
      category: []
    },
    tables: {
      summary: [],
      recFix: [],
      fullList: []
    },
    tableTitles: {
      summary: 'Portfolio Summary',
      recFix: 'Recommended Fixes',
      fullList: 'Full Failure List'
    }
  }

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
  const impactCounts = {
    critical: {
      pass: 0,
      fail: 0
    },
    serious: {
      pass: 0,
      fail: 0
    },
    moderate: {
      pass: 0,
      fail: 0
    },
    minor: {
      pass: 0,
      fail: 0
    }
  }

  for (let i = 0; i < audits.length; i++) {
    const audit = audits[i]
    const g5Location = audit.dataValues.g5_updatable_location
    if (g5Location) {
      const locationName = (g5Location.display_name === '' || g5Location.display_name === null) ? g5Location.name : g5Location.display_name
      const { critical_count, serious_count, moderate_count, minor_count, pages_eval } = audit
      impactCounts.critical.pass += critical_count
      impactCounts.serious.pass += serious_count
      impactCounts.moderate.pass += moderate_count
      impactCounts.minor.pass += minor_count
      const totalPass = critical_count + serious_count + moderate_count + minor_count
      const totalFail = audit.wcag_violations.length

      const location = {
        name: locationName,
        pages: pages_eval,
        total: totalPass + audit.wcag_violations.length,
        pass: totalPass,
        fail: totalFail,
        axeVersion: audit.axeVersion,
        date: moment(audit.createdAt).format('YYYY-MM-DD HH:mm')
      }

      data.tables.summary.push(location)

      for (let j = 0; j < audit.wcag_violations.length; j++) {
        const violation = audit.wcag_violations[j]
        const { element, description, html, target, summary, wcag_page, wcag_impact } = violation.dataValues
        const failureInfo = {
          propertyName: location.name,
          element,
          impact: wcag_impact.name,
          page: wcag_page.url,
          html,
          description,
          target,
          summary
        }
        data.tables.fullList.push(failureInfo)
        if (recFixes.includes(violation.dataValues.element)) {
          data.tables.recFix.push(failureInfo)
        }
        if (wcag_impact.name) {
          impactCounts[wcag_impact.name].fail++
        }
      }
    }
  }
  const keys = Object.keys(impactCounts)
  keys.forEach((key) => {
    data.chart.pass.push(impactCounts[key].pass)
    data.chart.fail.push(impactCounts[key].fail)
    data.chart.category.push(key)
  })
  return data
}

