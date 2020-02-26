<template>
  <div>
    Dynamic Route
    {{ response }}
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    return {
      response: await $axios.$get(`api/reports/${params.id}`)
    }
  }
}
</script>

<style>

</style>
