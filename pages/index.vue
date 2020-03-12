<template>
  <b-container>
    <b-row>
      <b-col>
        <cover />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert :show="true" variant="tertiary">
          Are you looking for your Accessibility report? Please contact your Account Manager.
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Cover from '~/components/sections/cover'
export default {
  components: {
    Cover
  }
}
</script>

<style>

</style>
