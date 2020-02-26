<template>
  <b-container fluid>
    <slot name="heading" />
    <b-row no-gutters>
      <b-col>
        <h1>
          Table of Contents
        </h1>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-list-group flush>
          <b-list-group-item
            v-for="section in sections"
            :key="section.id"
          >
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
            {{ section }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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

</style>
