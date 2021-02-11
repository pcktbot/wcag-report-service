<template>
  <b-container fluid>
    <b-row :class="[{ 'is-busy': isBusy }, 'my-5']" no-gutters>
      <b-col
        v-for="(card, i) in cards"
        :key="card.id"
        cols="4"
      >
        <b-card
          :bg-variant="setStripe(i)"
          :class="[{ 'gradient-bg' : i % 2 === 0 }, 'py-5', 'border-0', 'h-100']"
        >
          <h3 class="intro-header text-uppercase text-tertiary">
            {{ card.heading }}
          </h3>
          <p class="font-weight-light">
            {{ card.description }}
          </p>
          <p v-if="card.passes" class="d-flex flex-column justify-content-start">
            <span class="mb-2 text-uppercase">
              Passes:
              <b-badge variant="primary" class="better-pill px-2">
                {{ card.passes }}
              </b-badge>
            </span>
            <span class="text-uppercase">
              Failures:
              <b-badge variant="tertiary" class="border border-white better-pill px-2">
                {{ card.violations }}
              </b-badge>
            </span>
          </p>
          <vue-stars
            v-if="card.stars"
            :name="card.id"
            :max="3"
            :value="card.stars"
            :readonly="true"
            active-color="#0b233f"
            shadow-color="transparent"
          />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { VueStars } from 'vue-stars'
export default {
  components: {
    VueStars
  },
  props: {
    isBusy: {
      type: Boolean,
      default: false
    },
    cols: {
      type: String,
      return: '4'
    },
    cards: {
      type: Array,
      default() {
        return [
          {
            id: 'unique',
            heading: 'title text',
            subheading: 'subtitle text',
            description: 'descriptive text appears here.',
            stars: 1
          },
          {
            id: 'unique',
            heading: 'title text',
            subheading: 'subtitle text',
            description: 'descriptive text appears here.',
            stars: 2
          },
          {
            id: 'unique',
            heading: 'title text',
            subheading: 'subtitle text',
            description: 'descriptive text appears here.',
            stars: 3
          },
          {
            id: 'unique',
            heading: 'title text',
            subheading: 'subtitle text',
            description: 'descriptive text appears here.',
            stars: 2
          },
          {
            id: 'unique',
            heading: 'title text',
            subheading: 'subtitle text',
            description: 'descriptive text appears here.',
            stars: 3
          },
          {
            id: 'unique',
            heading: 'title text',
            subheading: 'subtitle text',
            description: 'descriptive text appears here.',
            stars: 1
          }
        ]
      }
    }
  },
  methods: {
    getStars(child) {
      const rate = child.passes / (child.passes + child.violations)
      return (rate === 1)
        ? 3
        : (rate > 0.85)
          ? 2
          : 1
    },
    setStripe(i) {
      return (this.cols === '6')
        ? ([0, 3, 4, 7, 8].includes(i))
          ? 'striped'
          : 'white'
        : (i % 2 === 0)
          ? 'striped'
          : 'white'
    }
  }
}
</script>

<style>
.is-busy {
  transition: 200ms ease-in-out;
  opacity: 0.5;
}
.better-pill {
  border-radius: 10px;
}
</style>
