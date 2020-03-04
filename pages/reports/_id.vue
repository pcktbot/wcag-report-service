<template>
<b-container fluid class="px-4">
    <drawer>
      <template v-slot:button-text>
        <list-icon :color="`currentColor`" />
      </template>
      <template v-slot:content>
        <table-of-contents :sections="sections" />
      </template>
    </drawer>
    <definitions
      :is-visible="showDefinitions"
      @toggle-def="showDefinitions = !showDefinitions"
    />
    <b-row>
      <b-col cols="8" offset="2">
        <b-row id="intro" no-gutters>
          <b-col>
            <transition name="fade" appear>
              <cover />
            </transition>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <transition name="fade" appear>
              <introduction />
            </transition>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col id="disclaimer">
            <transition name="fade" appear>
              <disclaimer />
            </transition>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col id="summary" cols="12">
            <transition name="fade" appear>
              <b-card no-body class="my-5 py-3 border-0">
                <b-card-header class="border-0">
                  <h2 class="mb-4 intro-heading">
                    SUMMARY of USER IMPACT
                  </h2>
                </b-card-header>
                <b-card-body class="p-0 d-flex justify-content-between border-0 bg-white">
                  <b-card-text class="font-weight-light px-3">
                    There are varying degrees of impact to disabled users. Here’s the breakdown of how implementations on your site are affecting users with a range of disabilities.
                  </b-card-text>
                  <toggle-btn @toggle-defs="showDefinitions = !showDefinitions" class="align-self-start" />
                </b-card-body>
                <apex-chart
                  :height="350"
                  :options="chartOptions"
                  :series="chart"
                  type="bar"
                />
              </b-card>
            </transition>
          </b-col>
        </b-row>
        <b-row>
          <b-col id="by-location" class="my-5">
            <transition name="fade" appear>
              <h2 class="mb-4 intro-heading">
                SUMMARY by LOCATION
              </h2>
            </transition>
            <transition name="fade" appear>
              <b-table
                :items="summary.items"
                :fields="summary.fields"
                :sort-desc="false"
                sort-by="name"
                striped
              >
                <template v-slot:cell(name)="{ item }">
                  <a
                    v-smooth-scroll
                    :href="`#by-topic`"
                    @click="setAllFilters(item.name)"
                    class="font-weight-bold"
                  >
                    {{ item.name }}
                  </a>
                </template>
                <template v-slot:cell(fail)="{ item }">
                  <span class="text-tertiary font-weight-bold">
                    {{ item.fail }}
                  </span>
                </template>
                <template v-slot:cell(axeVersion)="{ item }">
                  <span class="font-weight-light">
                    {{ item.axeVersion }}
                  </span>
                </template>
                <template v-slot:cell(date)="{ item }">
                  <span class="font-weight-light">
                    {{ item.date }}
                  </span>
                </template>
              </b-table>
            </transition>
          </b-col>
        </b-row>
        <b-row id="by-topic">
          <b-col cols="12">
            <transition name="fade" appear>
              <div>
                <h2 class="mb-4 intro-heading text-primary">
                  SUMMARY BY ACCESSIBILITY TOPIC
                </h2>
                <card-grid :cards="appendices" :cols="`4`" />
              </div>
            </transition>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row
      v-for="table in tables"
      :key="table.keyId"
    >
      <b-col
        :id="table.keyId"
        cols="10"
        offset="1"
        class="my-5"
      >
        <b-card
          no-body
          bg-variant="white"
          class=""
        >
          <b-card-header class="d-flex gradient-bg bg-striped pt-5 pb-3">
            <h2 class="intro-heading flex-grow-1">
              {{ table.name }}
            </h2>
            <p class="w-75 font-weight-light">
              The items listed below are items you can work with your G5 team to resolve as soon as possible. The page count details the number of pages where the update is needed, while the item count details the instances of the issue.*
              <br>
              <span class="text-tertiary">
                *Depending on configuration, a site or page can contain multiple items related to the same review element.
              </span>
            </p>
          </b-card-header>
          <b-table
            :ref="table.keyId"
            :items="table.items"
            :fields="table.fields"
            :current-page="helper[findIndex(table.keyId)].currentPage"
            :per-page="helper[findIndex(table.keyId)].perPage"
            :filter="helper[findIndex(table.keyId)].filter"
            :sort-desc="false"
            show-empty
            empty-filtered-text="There were no failures for this location within this section."
            sort-by="propertyName"
            fixed
            responsive
            striped
            class="mb-0"
          >
            <template v-slot:thead-top>
              <b-tr class="bg-striped">
                <b-th colspan="3">
                  <b-input-group
                    class="mb-0 font-weight-light d-flex align-items-center"
                  >
                    <b-input-group-prepend class="mb-0 mr-2 text-right font-weight-light">
                      Filter to Location
                    </b-input-group-prepend>
                    <b-form-select
                      v-model="helper[findIndex(table.keyId)].filter"
                      :options="locations"
                    />
                    <b-input-group-append
                      v-show="helper[findIndex(table.keyId)].filter !== ''"
                    >
                      <b-btn
                        @click="helper[findIndex(table.keyId)].filter = ''"
                        variant="outline-primary"
                      >
                        Clear
                      </b-btn>
                    </b-input-group-append>
                  </b-input-group>
                </b-th>
                <b-th colspan="2">
                  <b-form-group
                    label="Per Page"
                    label-cols="3"
                    label-align="right"
                    class="mb-0 font-weight-light"
                  >
                    <b-form-select
                      v-model="helper[findIndex(table.keyId)].perPage"
                      :options="[5, 10, 20]"
                    />
                  </b-form-group>
                </b-th>
                <b-th colspan="2">
                  <b-pagination
                    v-model="helper[findIndex(table.keyId)].currentPage"
                    :total-rows="helper[findIndex(table.keyId)].totalRows"
                    :per-page="helper[findIndex(table.keyId)].perPage"
                    class="mb-0 font-weight-light"
                  />
                </b-th>
                <b-th class="text-right">
                  <toggle-btn @toggle-defs="showDefinitions = !showDefinitions" />
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(propertyName)="{ item }">
              <span class="font-weight-bold">
                {{ item.propertyName }}
              </span>
            </template>
            <template v-slot:cell(impact)="{ item }">
              <span :class="`${formatStopLight(item.impact)} text-center font-weight-light text-uppercase`">
                <warning-icon
                  v-if="item.impact === 'critical' || item.impact === 'serious'"
                  :color="`white`"
                  :fill="`currentColor`"
                  :size="2"
                  :text-align="`text-center`"
                />
                {{ item.impact }}
              </span>
            </template>
            <template v-slot:cell(page)="{ item }">
              <a
                :href="item.page"
                target="_blank"
                class="anchor-break"
              >
                {{ item.page }}
              </a>
            </template>
            <template v-slot:cell(summary)="{ item }">
              <p class="text-truncate full-text-container font-weight-light">
                {{ item.summary }}
              </p>
            </template>
            <template v-slot:cell(html)="{ item }">
              <code class="text-tertiary text-truncate full-text-container">
                {{ item.html }}
              </code>
            </template>
            <template v-slot:cell(target)="{ item }">
              <code class="text-tertiary">
                {{ item.target }}
              </code>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import apexOptions from '~/mixins/apex'
import Drawer from '~/components/drawer'
import WarningIcon from '~/components/icons/warning'
import Definitions from '~/components/definitions'
import CardGrid from '~/components/card-grid'
import ToggleBtn from '~/components/toggle-defs'
import ListIcon from '~/components/icons/list'
import Cover from '~/components/sections/cover'
import Disclaimer from '~/components/sections/disclaimer'
import TableOfContents from '~/components/sections/table-of-contents'
import Introduction from '~/components/sections/introduction'
export default {
  components: {
    Drawer,
    Cover,
    WarningIcon,
    CardGrid,
    ListIcon,
    Definitions,
    ToggleBtn,
    Disclaimer,
    TableOfContents,
    Introduction
  },
  mixins: [apexOptions],
  async asyncData({ $axios, route }) {
    return {
      route: `api${route.fullPath}`,
      response: await $axios.$get(`api${route.fullPath}`)
    }
  },
  data() {
    return {
      helper: [],
      showDefinitions: false,
      sections: [
        {
          id: 'intro-link',
          label: 'Introduction',
          targetId: 'intro',
          hasChild: false
        },
        {
          id: 'disclaimer-link',
          label: 'Disclaimer',
          targetId: 'disclaimer',
          hasChild: false
        },
        {
          id: 'summary-link',
          label: 'Summary by User Impact',
          targetId: 'summary',
          hasChild: false
        },
        {
          id: 'location-link',
          label: 'Summary by Location',
          targetId: 'by-location',
          hasChild: false
        },
        {
          id: 'topic-link',
          label: 'Summary by Topic',
          targetId: 'by-topic',
          hasChild: false
        },
        {
          id: 'recFix-link',
          label: 'Recommended Fixes',
          targetId: 'recFix',
          hasChild: false
        },
        {
          id: 'fullList-link',
          label: 'Full Failure List',
          targetId: 'fullList',
          hasChild: false
        }
      ],
      keys: {
        alignRight: ['pages', 'pass', 'total', 'fail', 'target'],
        alignCenter: ['impact', 'date', 'axeVersion']
      }
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
    appendices() {
      return this.response.appendices.total
    },
    cards() {
      return Object.keys(this.response.appendices.total[0].cards).map(key => ({
        ...this.response.appendices.total[0].cards[key]
      }))
    },
    tables() {
      return Object.keys(this.response.tables)
        .filter(table => table !== 'summary')
        .map((table) => {
          if (this.response.tables[table].length <= 0) {
            this.createHelpers(table)
            return {
              items: [],
              fields: [],
              name: this.response.tableTitles[table],
              keyId: table
            }
          } else {
            this.createHelpers(table)
            return {
              items: this.response.tables[table],
              fields: this.createFields(this.response.tables[table][0]),
              name: this.response.tableTitles[table],
              keyId: table
            }
          }
        })
    },
    summary() {
      return {
        items: this.response.tables.summary,
        fields: this.createFields(this.response.tables.summary[0]),
        csv: [],
        downloadCsv: ''
      }
    },
    locations() {
      const locations = this.response.tables.summary.map(row => row.name)
      return [{ value: '', text: 'Show All' }, ...locations]
    }
  },
  methods: {
    findIndex(id) {
      return this.tables.findIndex(table => table.keyId === id)
    },
    setAllFilters(location) {
      this.appendices = this.response.appendices[location]
      this.helper.forEach((helper, i) => {
        this.helper[i].filter = location
      })
    },
    createHelpers(table) {
      this.helper.push({
        id: table,
        currentPage: 1,
        perPage: 5,
        filter: '',
        totalRows: this.response.tables[table].length,
        csv: [],
        downloadCsv: ''
      })
    },
    createFields(items) {
      return Object.keys(items)
        .map(key => ({
          key,
          sortable: true,
          class: (this.keys.alignCenter.includes(key))
            ? 'text-center'
            : (this.keys.alignRight.includes(key))
              ? 'text-right'
              : 'text-left'
        }))
    },
    formatStopLight(item) {
      return item === 'critical'
        ? 'text-tertiary'
        : item === 'serious'
          ? 'text-quaternary'
          : 'text-primary'
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 750ms;
  transition-delay: 500ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.full-text-container {
  white-space: inherit;
  overflow-y: scroll;
  max-height: 250px;
}
.anchor-break {
  word-break: break-all;
  font-weight: 300;
}
</style>
