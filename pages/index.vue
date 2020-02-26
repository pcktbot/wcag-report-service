<template>
  <b-container>
    <drawer>
      <template v-slot:content>
        <table-of-contents :sections="sections" />
      </template>
    </drawer>
    <b-row no-gutters>
      <b-col>
        <cover />
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <introduction />
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <disclaimer />
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-card no-body class="my-5 p-3 border-0">
          <apex-chart
            :height="450"
            :options="chartOptions"
            :series="chart"
            type="bar"
          />
        </b-card>
      </b-col>
    </b-row>
    <b-table :items="summary.items" :fields="summary.fields" :sort-by="name" bordered />
    <b-table :items="recFix.items" :fields="recFix.fields" fixed />
    <b-table :items="fullList.items" :fields="fullList.fields" fixed />
  </b-container>
</template>

<script>
import apexOptions from '~/mixins/apex'
import Drawer from '~/components/drawer'
import Cover from '~/components/sections/cover'
import Disclaimer from '~/components/sections/disclaimer'
import TableOfContents from '~/components/sections/table-of-contents'
import Introduction from '~/components/sections/introduction'
export default {
  components: {
    Drawer,
    Cover,
    Disclaimer,
    TableOfContents,
    Introduction
  },
  mixins: [apexOptions],
  async asyncData({ $axios }) {
    return {
      response: await $axios.$get('http://localhost:2020/api/reports/52119757?name=Pre-Live%20Accessibility%20Review%20and%20Edits%20-%20Phase%204')
    }
  },
  data() {
    return {
      sections: [
        {
          id: '',
          label: 'Introduction',
          targetId: '',
          hasChild: false
        },
        {
          id: '',
          label: 'Disclaimer',
          targetId: '',
          hasChild: false
        },
        {
          id: '',
          label: 'Summary',
          targetId: '',
          hasChild: false
        }
      ]
    }
  },
  computed: {
    chart() {
      return Object.keys(this.response.chart)
        .filter(chart => chart !== 'category')
        .map(chart => ({
          name: `${chart[0].toUpperCase()}${chart.slice(1)}`,
          data: this.response.chart[chart]
        }))
    },
    summary() {
      return {
        items: this.response.tables.summary,
        fields: this.createFields(this.response.tables.summary[0])
      }
    },
    recFix() {
      return {
        items: this.response.tables.recFix,
        fields: this.createFields(this.response.tables.recFix[0])
      }
    },
    fullList() {
      return {
        items: this.response.tables.fullList,
        fields: this.createFields(this.response.tables.fullList[0])
      }
    }
  },
  methods: {
    createFields(items) {
      return Object.keys(items)
        .map(key => ({
          key,
          sortable: true
        }))
    }
  }
}
</script>

<style>

</style>
