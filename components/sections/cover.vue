<template>
  <div class="my-5">
    <div class="mx-auto text-center">
      <b-img-lazy
        src="/g5-primary-logo.png"
        width="75px"
        alt="G5 Logo"
        class="mx-auto mb-2"
      />
      <hr width="40%" class="mx-auto cover-divider">
      <h1 class="my-1 cover-title mx-auto text-uppercase">
        Website Accessibility Report
      </h1>
      <hr width="40%" class="mx-auto cover-divider">
      <div v-if="names.location" class="text-uppercase cover-subtitle">
        {{ names.client }} / {{ names.location }}
      </div>
      <div v-else class="text-uppercase cover-subtitle">
        Summary of {{ names.client }} - {{ names.count }} Properties
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    names: {
      type: Object,
      default() {
        return {
          location: '',
          client: '',
          count: 0
        }
      }
    }
  }
}
</script>

<style>
.cover-title {
  font-weight: 300;
  letter-spacing: 0.3rem;
  font-size: 36pt;
  max-width: 100%;
}
.cover-subtitle {
  color: #131C2D;
  font-weight: 400;
  letter-spacing: 0.05rem;
  font-size: 16pt;
  margin-top: 30px;
}
</style>
