const moment = require('moment')
const recFixes = require('../controllers/recFixes')
const appendicexLU = require('../config/appendices')
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
    this.appendices.total = appendicexLU
    this.audits.forEach((audit) => {
      const g5Location = audit.dataValues.g5_updatable_location
      if (g5Location) {
        const summary = audit.dataValues.summary
        const locationName = (g5Location.display_name === '' || g5Location.display_name === null) ? g5Location.name : g5Location.display_name
        this.buildLocationSummary(audit, locationName)
        this.addLocationVioloations(audit)
        this.buildAppendices(summary, locationName)
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

  addLocationVioloations(audit) {
    audit.wcag_violations.forEach((violation) => {
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
    this.appendices[locationName] = appendicexLU
    appendicexLU.forEach((appendix, i) => {
      const { cards, name, catCount, categoryDesc, catKeys, checkIds } = appendix
      if (cards) {
        const keys = Object.keys(cards)
        keys.forEach((key) => {
          const passes = cards[key].checkIds.reduce((total, checkId) => {
            if (summary.passes[checkId]) {
              total += summary.passes[checkId]
            }
            return total
          }, 0)
          const violations = cards[key].checkIds.reduce((total, checkId) => {
            if (summary.violations[checkId]) {
              total += summary.violations[checkId]
            }
            return total
          }, 0)
          this.appendices[locationName][i].cards[key].passes = passes
          this.appendices[locationName][i].cards[key].violations = violations
          if (!this.appendices.total[i].cards[key].passes) {
            this.appendices.total[i].cards[key].passes = 0
            this.appendices.total[i].cards[key].violations = 0
          }
          this.appendices.total[i].cards[key].passes += passes
          this.appendices.total[i].cards[key].violations += violations
        })
      } else {
        const passes = checkIds.reduce((total, checkId) => {
          if (summary.passes[checkId]) {
            total += summary.passes[checkId]
          }
          return total
        }, 0)
        const violations = checkIds.reduce((total, checkId) => {
          if (summary.violations[checkId]) {
            total += summary.violations[checkId]
          }
          return total
        }, 0)
        if (!this.appendices.total.passes) {
          this.appendices.total.passes = 0
          this.appendices.total.violations = 0
        }
        this.appendices[locationName][i].passes = passes
        this.appendices[locationName][i].violations = violations
      }
    })
  }
}

module.exports = Report
