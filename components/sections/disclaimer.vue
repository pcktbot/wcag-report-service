<template>
  <b-container fluid>
    <slot name="heading" />
    <b-row>
      <b-col>
        <b-card>
          <b-card-header>
            Disclaimer
          </b-card-header>
          <b-card-body>
            G5 provides a website accessibility report based on Web Content Accessibility Guidelines (WCAG) 2.0 Level A. The report is only valid at the moment it is run and does not take into account any subsequent website modifications. G5 does not represent, warrant, or certify compliance with the Americans with Disabilities Act or with WCAG Guidelines, and disclaims any liability related to the report.
          </b-card-body>
          <b-card-footer>
            Prepared On: {{ preparedOn }}
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    preparedOn: {
      type: String,
      default() {
        return new Date().getDate()
      }
    }
  }
}
</script>

<style>

</style>
