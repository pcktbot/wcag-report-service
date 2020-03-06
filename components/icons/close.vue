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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
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
