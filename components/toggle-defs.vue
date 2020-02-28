<template>
  <b-btn
    @click="$emit('toggle-defs')"
    variant="primary"
    class="p-0"
    pill
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
