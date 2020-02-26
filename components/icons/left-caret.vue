<template>
  <svg
    :width="size"
    :height="size"
    :stroke="color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '1em'
    },
    color: {
      type: String,
      default: '#000'
    }
  }
}
</script>

<style>

</style>
