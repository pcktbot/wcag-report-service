<template>
  <svg
    :width="`${size}em`"
    :height="`${size * 1.1}em`"
    :fill="fill"
    :stroke="color"
    :stroke-width="stroke"
    :class="textAlign"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line
      x1="12"
      y1="9"
      x2="12"
      y2="13"
    />
    <line
      x1="12"
      y1="17"
      x2="12"
      y2="17"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'currentColor'
    },
    textAlign: {
      type: String,
      default: 'text-top'
    },
    fill: {
      type: String,
      default: 'none'
    },
    size: {
      type: Number,
      default() {
        return 1
      }
    },
    stroke: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style>

</style>
