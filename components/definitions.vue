<template>
  <b-card
    :class="[{ 'is-visible': isVisible }, 'card-drawer', 'border-0']"
    no-body
    bg-variant="white"
  >
    <b-btn
      @click="$emit('toggle-def')"
      variant="outline-tertiary"
      pill
      class="py-0 px-1 card-btn"
    >
      <right-caret :color="`currentColor`" :size="`1.5em`" />
    </b-btn>
    <b-card-header class="border-0 bg-white">
      <h3 class="text-uppercase text-center intro-heading mb-0">
        Definitions
      </h3>
      <hr width="40%" class="mx-auto cover-divider">
    </b-card-header>
    <b-card-body class="pt-1">
      <h3 class="text-uppercase font-weight-light text-tertiary">
        <warning-icon
          :color="`white`"
          :fill="`currentColor`"
          :size="1.25"
          :text-align="`text-center`"
        />
        Critical
      </h3>
      <p>
        People with certain disabilities are completely unable to utilize the content.
      </p>
      <h3 class="text-uppercase text-quaternary font-weight-light">
        <warning-icon
          :color="`white`"
          :fill="`currentColor`"
          :size="1.25"
          :text-align="`text-center`"
        />
        Serious
      </h3>
      <p>
        People with certain disabilities have significant difficulty in being able to utilize the content.
      </p>
      <h3 class="text-uppercase font-weight-light">
        Moderate
      </h3>
      <p>
        People with certain disabilities have moderate difficulty in the user being able to utilize the content.
      </p>
      <h3 class="text-uppercase font-weight-light">
        Minor
      </h3>
      <p>
        People with certain disabilities have minor difficulty in the user being able to utilize the content.
      </p>
      <b-list-group class="border-0 pt-1">
        <b-list-group-item
          v-for="(star, i) in stars"
          :key="i"
          class="d-flex p-0 justify-content-start align-items-start border-0"
        >
          <vue-stars
            :name="star.id"
            :max="3"
            :value="i + 1"
            :readonly="true"
            active-color="#0b233f"
            shadow-color="transparent"
          />
          <p class="pl-3 font-weight-bold">
            {{ star.label }}
            <span class="font-weight-light">
              {{ star.text }}
            </span>
          </p>
        </b-list-group-item>
      </b-list-group>
    </b-card-body>
  </b-card>
</template>

<script>
import { VueStars } from 'vue-stars'
import RightCaret from '~/components/icons/right-caret'
import WarningIcon from '~/components/icons/warning'
export default {
  components: {
    VueStars,
    RightCaret,
    WarningIcon
  },
  props: ['isVisible'],
  data() {
    return {
      stars: [
        {
          id: 'one-star',
          label: '1 Star:',
          text: 'Does not meet standard'
        },
        {
          id: 'two-star',
          label: '2 Star:',
          text: 'Opportunity for improvement'
        },
        {
          id: 'three-star',
          label: '3 Star:',
          text: 'Meets standard'
        }
      ]
    }
  }
}
</script>

<style>
.card-drawer {
  position: fixed;
  right: 0;
  top: 50%;
  max-width: 300px;
  transform-origin: center right;
  transform-style: preserve-3d;
  /* transform: rotateY(90deg) translate(100%, -50%); */
  transform: rotateY(65deg) translate(100%, -50%);
  transition: transform 200ms ease-in-out;
  font-size: 0.9rem;
  z-index: 20;
}
.is-visible {
  /* transform: rotateY(0deg) translate(0%, -50%); */
  transform: rotateY(0deg) translate(0%, -50%);
  box-shadow: -20px 0 40px rgba(0, 0, 0, 0.2);
}
.card-btn {
  position: absolute;
  z-index: 21;
  left: 0;
  top: 10%;
  transform: translate(50%, -50%);
  /* transition-delay: 500ms; */
  transition: 200ms ease-in-out;
  background: white;
}
.is-visible .card-btn {
  transform: translate(-50%, -50%);
}
</style>
