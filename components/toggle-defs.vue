<template>
  <b-btn
    @click="$emit('toggle-defs')"
    variant="primary"
    pill
    class="p-0 toggle-btn"
  >
    <info-icon :color="`currentColor`" :size="`2em`" />
  </b-btn>
</template>

<script>
import InfoIcon from '~/components/icons/info'
export default {
  components: {
    InfoIcon
  }
}
</script>

<style>
.toggle-btn {
  transition: 200ms ease-in-out;
}
.toggle-btn:hover {
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.5);
}
</style>
