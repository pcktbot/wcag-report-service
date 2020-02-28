<template>
  <svg
    :width="size"
    :height="size"
    :stroke="color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3" y2="6" />
    <line x1="3" y1="12" x2="3" y2="12" />
    <line x1="3" y1="18" x2="3" y2="18" />
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
