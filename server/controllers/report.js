const moment = require('moment')
const recFixes = require('../controllers/recFixes')
const newAppendix = require('../config/appendices')
class Report {
  constructor(params) {
    this.audits = params.audits
    this.chart = { pass: [], fail: [], category: [] }
    this.tables = { summary: [], recFix: [], fullList: [] }
    this.tableTitles = { summary: 'Portfolio Summary', recFix: 'Recommended Fixes', fullList: 'Full Failure List' }
    this.appendices = {}
    this.impactCounts = {
      critical: { pass: 0, fail: 0 },
      serious: { pass: 0, fail: 0 },
      moderate: { pass: 0, fail: 0 },
      minor: { pass: 0, fail: 0 }
    }
  }

  generate() {
    this.appendices.total = newAppendix()
    this.audits.forEach((audit) => {
      const g5Location = audit.dataValues.g5_updatable_location
      if (g5Location) {
        const summary = audit.dataValues.summary
        const locationName = (g5Location.display_name === '' || g5Location.display_name === null) ? g5Location.name : g5Location.display_name
        this.buildLocationSummary(audit, locationName)
        this.addLocationVioloations(audit, locationName)
        if (summary) {
          this.buildAppendices(summary, locationName)
        }
      }
    })

    const keys = Object.keys(this.impactCounts)
    keys.forEach((key) => {
      this.chart.pass.push(this.impactCounts[key].pass)
      this.chart.fail.push(this.impactCounts[key].fail)
      this.chart.category.push(key)
    })

    return {
      chart: this.chart,
      tables: this.tables,
      tableTitles: this.tableTitles,
      appendices: this.appendices
    }
  }

  buildLocationSummary(audit, name) {
    const { critical_count, serious_count, moderate_count, minor_count, pages_eval: pages, axeVersion } = audit
    this.addPassingImpactCounts({ critical_count, serious_count, moderate_count, minor_count })
    const pass = critical_count + serious_count + moderate_count + minor_count
    const fail = audit.wcag_violations.length

    const location = {
      name,
      pages,
      total: pass + fail,
      pass,
      fail,
      axeVersion,
      date: moment(audit.createdAt).format('YYYY-MM-DD HH:mm')
    }
    this.tables.summary.push(location)
  }

  addPassingImpactCounts({ critical_count, serious_count, moderate_count, minor_count }) {
    this.impactCounts.critical.pass += critical_count
    this.impactCounts.serious.pass += serious_count
    this.impactCounts.moderate.pass += moderate_count
    this.impactCounts.minor.pass += minor_count
  }

  addLocationVioloations(audit, propertyName) {
    audit.wcag_violations.forEach((violation) => {
      const { element, description, html, target, summary, wcag_page, wcag_impact } = violation.dataValues
      const failureInfo = {
        propertyName,
        element,
        impact: wcag_impact.name,
        page: wcag_page.url,
        html,
        description,
        target,
        summary
      }
      this.tables.fullList.push(failureInfo)
      if (recFixes.includes(violation.dataValues.element)) {
        this.tables.recFix.push(failureInfo)
      }
      if (wcag_impact.name) {
        this.impactCounts[wcag_impact.name].fail++
      }
    })
  }

  buildAppendices(summary, locationName) {
    this.appendices[locationName] = newAppendix()
    for (let i = 0; i < this.appendices[locationName].length; i++) {
      const appendix = this.appendices[locationName][i]
      const { checkIds } = appendix
      this.appendices[locationName][i].passes = checkIds.reduce((total, checkId) => {
        if (summary.passes[checkId]) {
          total += summary.passes[checkId]
        }
        return total
      }, 0)
      this.appendices[locationName][i].violations = checkIds.reduce((total, checkId) => {
        if (summary.violations[checkId]) {
          total += summary.violations[checkId]
        }
        return total
      }, 0)
      this.appendices[locationName][i].stars = this.calcStars(this.appendices[locationName][i].passes, (this.appendices[locationName][i].passes + this.appendices[locationName][i].violations))

      this.appendices.total[i].passes += this.appendices[locationName][i].passes
      this.appendices.total[i].violations += this.appendices[locationName][i].violations
      this.appendices.total[i].stars = this.calcStars(this.appendices.total[i].passes, (this.appendices.total[i].passes + this.appendices.total[i].violations))
    }
  }

  calcStars(pass, total) {
    const score = pass / total
    if (total === 0) {
      return null
    }
    if (score === 1) {
      return 3
    } else if (score >= 0.75) {
      return 2
    } else if (total === 0) {
      return 0
    } else {
      return 1
    }
  }
}

module.exports = Report
