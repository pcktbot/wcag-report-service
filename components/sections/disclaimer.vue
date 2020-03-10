<template>
  <b-container fluid class="my-5 p-0">
    <slot name="heading" />
    <b-row no-gutters>
      <b-col>
        <b-card no-body bg-variant="white" class="border-0">
          <b-card-header class="px-0 border-0 bg-white">
            <h2 class="text-uppercase mb-0 intro-heading">
              Disclaimer
            </h2>
            <hr width="30%" class="cover-divider mb-0">
          </b-card-header>
          <b-card-body class="px-0 intro-paragraph">
            G5 provides a website accessibility report based on Web Content Accessibility Guidelines (WCAG) 2.0 Level A. The report is only valid at the moment it is run and does not take into account any subsequent website modifications. G5 does not represent, warrant, or certify compliance with the Americans with Disabilities Act or with WCAG Guidelines, and disclaims any liability related to the report.
          </b-card-body>
          <b-card-footer class="px-0 intro-bold border-0 bg-white">
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
        return new Date().toLocaleDateString()
      }
    }
  }
}
</script>

<style>

</style>
