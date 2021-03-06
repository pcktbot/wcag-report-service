<template>
  <b-container fluid class="px-4">
    <copyright />
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
              <cover :names="{ client: summary.name, count: summary.totalRows }" />
            </transition>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <transition name="fade" appear>
              <introduction :isAA="response.isAA" />
            </transition>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col id="disclaimer">
            <transition name="fade" appear>
              <disclaimer :isAA="response.isAA" />
            </transition>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col id="summary" cols="12">
            <transition name="fade" appear>
              <b-card no-body bg-variant="white" class="my-5 border-0">
                <b-card-header class="px-0 border-0 bg-white">
                  <h2 class="intro-heading mb-0">
                    SUMMARY of USER IMPACT
                  </h2>
                  <hr width="30%" class="cover-divider mb-0">
                </b-card-header>
                <b-card-body class="px-0 d-flex justify-content-between border-0 bg-white">
                  <b-card-text class="font-weight-light pr-3">
                    This section summarizes the level of impact that accessibility issues have on your website users. We use this information to outline and prioritize items that need to be addressed in order for your website to meet standards. We recommend addressing all issues identified in the report, regardless of severity level. For definitions of the severity levels, please click the ? button.
                  </b-card-text>
                  <toggle-btn
                    @toggle-defs="showDefinitions = !showDefinitions"
                    class="align-self-start"
                  />
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
          <transition name="fade" appear>
            <b-col id="by-location">
              <b-card no-body bg-variant="white" class="my-5 border-0">
                <b-card-header class="px-0 border-0 bg-white">
                  <h2 class="intro-heading mb-0">
                    SUMMARY by PROPERTY
                  </h2>
                  <hr width="30%" class="cover-divider mb-0">
                </b-card-header>
                <b-card-body class="px-0 intro-paragraph border-0 bg-white">
                  <b-card-text class="font-weight-light pr-3">
                    There may be variances in property results based on best practices at the time of implementation, property-specific preferences, and ongoing updates to the website. To filter the results following this section to a single property, feel free to click that property in the results below.
                  </b-card-text>
                  <div class="bg-striped px-4 py-3 d-flex w-100 justify-content-between align-items-end">
                    <b-input-group
                      class="mb-0 font-weight-light d-flex align-items-center w-50"
                    >
                      <b-input-group-prepend class="mb-0 mr-2 text-right font-weight-light text-uppercase">
                        Properties per Page
                      </b-input-group-prepend>
                      <b-form-select
                        v-model="summaryHelpers.perPage"
                        :options="[5, 10, 20]"
                      />
                    </b-input-group>
                    <b-pagination
                      v-model="summaryHelpers.currentPage"
                      :total-rows="summary.totalRows"
                      :per-page="summaryHelpers.perPage"
                      class="mb-0 font-weight-light"
                    />
                  </div>
                  <b-table
                    ref="summary-of-locations"
                    :items="summary.items"
                    :fields="summary.fields"
                    :sort-desc="false"
                    :per-page="summaryHelpers.perPage"
                    :current-page="summaryHelpers.currentPage"
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
                </b-card-body>
              </b-card>
            </b-col>
          </transition>
        </b-row>
        <b-row id="by-topic">
          <b-col cols="12">
            <transition name="fade" appear>
              <b-card no-body bg-variant="white" class="my-5 border-0">
                <b-card-header class="px-0 border-0 bg-white">
                  <h2 class="intro-heading mb-0">
                    SUMMARY by ACCESSIBILTY TOPIC
                  </h2>
                  <hr width="30%" class="cover-divider mb-0">
                </b-card-header>
                <b-card-body class="px-0 intro-paragraph border-0 bg-white">
                  <b-card-text class="font-weight-light pr-3">
                    Below you will find a summary of how your properties perform by topic, with pass and fail information for each topic. You’re able to view this for all properties or a single property using the filter below.
                  </b-card-text>
                  <div class="bg-striped px-4 py-3 d-flex w-100 justify-content-between align-items-end">
                    <b-input-group
                      class="mb-0 font-weight-light d-flex align-items-center w-50"
                    >
                      <b-input-group-prepend class="mb-0 mr-2 text-right font-weight-light text-uppercase">
                        Filter to Property
                      </b-input-group-prepend>
                      <b-form-select
                        v-model="summaryHelpers.filter"
                        :options="locations"
                        @change="setAllFilters($event)"
                      />
                    </b-input-group>
                  </div>
                  <card-grid
                    :is-busy="summaryHelpers.isBusy"
                    :cards="appendices"
                    :cols="`4`"
                  />
                </b-card-body>
              </b-card>
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
              {{ disclaimerText[table.keyId].text }}
              <br>
              <span class="text-tertiary">
                {{ disclaimerText[table.keyId].clarification }}
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
            responsive
            empty-filtered-text="There were no failures for this location within this section."
            sort-by="propertyName"
            striped
            class="mb-0"
          >
            <template v-slot:thead-top>
              <b-tr class="bg-striped">
                <b-th colspan="6">
                  <div class="d-flex align-items-center justify-content-between w-100">
                    <b-input-group
                      class="mb-0 font-weight-light d-flex align-items-center w-50"
                    >
                      <b-input-group-prepend class="mb-0 mr-2 text-right font-weight-light text-uppercase">
                        Filter to Property
                      </b-input-group-prepend>
                      <b-form-select
                        v-model="helper[findIndex(table.keyId)].filter"
                        :options="locations"
                        @change="setAllFilters($event)"
                      />
                      <b-input-group-append
                        v-show="helper[findIndex(table.keyId)].filter !== ''"
                      >
                        <b-btn
                          @click="setAllFilters('')"
                          variant="primary"
                          pill
                          class="p-0 ml-2"
                        >
                          <close-icon :color="`currentColor`" :size="`2em`" />
                        </b-btn>
                      </b-input-group-append>
                    </b-input-group>
                    <b-form-group
                      label="Per Page"
                      label-cols="3"
                      label-align="right"
                      class="mb-0 font-weight-light text-uppercase w-25"
                    >
                      <b-form-select
                        v-model="helper[findIndex(table.keyId)].perPage"
                        :options="[5, 10, 20]"
                        style="max-width: 75px;"
                      />
                    </b-form-group>
                    <b-pagination
                      v-model="helper[findIndex(table.keyId)].currentPage"
                      :total-rows="helper[findIndex(table.keyId)].totalRows"
                      :per-page="helper[findIndex(table.keyId)].perPage"
                      class="mb-0 font-weight-light"
                    />
                    <toggle-btn @toggle-defs="showDefinitions = !showDefinitions" />
                  </div>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:empty>
              <p class="intro-paragraph text-center mb-0">
                There were no failures for the selected property within this section.
              </p>
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
              <p class="text-monospace text-tertiary text-truncate full-text-container">
                {{ item.html }}
              </p>
            </template>
            <template v-slot:cell(element)="{ item }">
              {{ item.element }}
              <code class="d-block text-tertiary">
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
import CloseIcon from '~/components/icons/close'
import CardGrid from '~/components/card-grid'
import Copyright from '~/components/copyright'
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
    CloseIcon,
    CardGrid,
    Copyright,
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
      appendices: null,
      summaryHelpers: {
        isBusy: false,
        filter: '',
        csv: [],
        downloadCsv: '',
        perPage: 10,
        currentPage: 1
      },
      disclaimerText: {
        recFix: {
          text: 'The items listed below are items you can work with your G5 team to resolve as soon as possible. You’re able to views this for all properties or a single property using the filter below. The page count details the number of pages where the update is needed, while the item count details the instances of the issue.*',
          clarification: '*Depending on configuration, a site or page can contain multiple items related to the same review element.'
        },
        fullList: {
          text: 'This section is a full list of every failure discovered during the audit. You’re able to view this for all properties or a single property using the filter below.',
          clarification: ''
        }
      },
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
        alignCenter: ['impact', 'date', 'axeVersion'],
        lookup: {
          propertyName: 'text-left w-15',
          element: 'text-left w-10',
          html: 'text-left w-15',
          page: 'text-left w-20',
          summary: 'text-left w-20'
        }
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
        totalRows: this.response.tables.summary.length,
        name: this.response.clientName
      }
    },
    locations() {
      const locations = this.response.tables.summary.map(row => row.name)
      return [{ value: '', text: 'Show All' }, ...locations]
    }
  },
  created() {
    this.appendices = this.response.appendices.total
  },
  methods: {
    findIndex(id) {
      return this.tables.findIndex(table => table.keyId === id)
    },
    setAllFilters(location) {
      this.summaryHelpers.isBusy = true
      location === ''
        ? this.appendices = this.response.appendices.total
        : this.appendices = this.response.appendices[location]
      this.helper.forEach((helper, i) => {
        this.helper[i].filter = location
      })
      this.summaryHelpers.filter = location
      setTimeout(() => {
        this.summaryHelpers.isBusy = false
      }, 500)
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
        .filter(key => !['description', 'target'].includes(key))
        .map(key => ({
          key,
          sortable: true,
          class: (Object.keys(this.keys.lookup).includes(key))
            ? this.keys.lookup[key]
            : (this.keys.alignCenter.includes(key))
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
.text-monospace {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85em;
  max-width: 250px;
  /* ^ A SERIOUS FAUX PAS, I KNOW */
}
.w-15 {
  width: 15%;
}
.w-10 {
  width: 10%;
}
.w-20 {
  width: 20%;
}
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
