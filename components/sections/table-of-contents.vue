<template>
  <b-container fluid>
    <slot name="heading" />
    <b-row no-gutters class="my-3">
      <b-col>
        <h3 class="intro-heading text-uppercase text-center">
          Table of Contents
        </h3>
        <hr width="40%" class="mx-auto cover-divider">
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-list-group flush>
          <b-list-group-item
            v-for="section in sections"
            :key="section.id"
            class="text-right border-0"
          >
            <a
              :id="section.id"
              :href="section.targetId"
              class="toc-anchor py-1 px-2"
            >
              <span class="pl-1">
                {{ section.label }}
              </span>
              <left-caret :color="`currentColor`" />
            </a>
            <b-list-group
              v-if="section.hasChild"
            >
              <b-list-group-item
                v-for="child in section.children"
                :key="child.id"
              >
                {{ child }}
              </b-list-group-item>
            </b-list-group>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LeftCaret from '~/components/icons/left-caret'
const example = {
  sections: [
    {
      id: '',
      label: '',
      targetId: '',
      hasChild: true,
      children: [
        {
          id: '',
          label: '',
          targetId: ''
        }
      ]
    }
  ]
}
export default {
  components: {
    LeftCaret
  },
  props: {
    sections: {
      type: Array,
      default() {
        return example
      }
    }
  }
}
</script>

<style>
.toc-anchor,
.toc-anchor:hover {
  text-decoration: none;
  transition: 200ms ease-in-out;
  font-weight: 300;
}
.toc-anchor {
  color: #7898ad;
}
.toc-anchor > span {
  border-bottom: 3px solid #7898ad;
}
.toc-anchor:hover {
  background-color: #7898ad;
  color: white;
}
</style>
