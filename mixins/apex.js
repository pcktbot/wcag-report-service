export default {
  data() {
    return {
      chartOptions: {
        colors: ['#0b233f', '#e24d3c'],
        chart: {
          stacked: true,
          animations: { enabled: true }
        },
        legend: {
          floating: true,
          position: 'top'
        },
        plotOptions: {
          bar: {
            columnWidth: '100%',
            barHeight: '90%',
            horizontal: true,
            dataLabels: {
              hideOverflowingLabels: true,
              orientation: 'horizontal'
            }
          }
        },
        dataLabels: {
          style: {
            fontSize: '16px',
            fontFamily: 'Roboto',
            colors: ['#e8e8e8']
          },
          dropShadow: {
            enabled: true
          }
        },
        grid: { show: false },
        fill: { opacity: 1 },
        xaxis: {
          // title: {
          //   text: 'SUM CHECKED ITEMS by SEVERITY',
          //   style: {
          //     fontSize: '16px',
          //     fontFamily: 'Roboto',
          //     fontWeight: 300
          //   }
          // },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          categories: ['Critical', 'Serious', 'Moderate', 'Minor'],
          labels: {
            show: false
          }
        },
        yaxis: {
          title: {
            text: 'SEVERITY',
            offsetX: 10,
            style: {
              fontSize: '16px',
              fontFamily: 'Roboto',
              fontWeight: 300
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'Roboto',
              padding: { right: 10 }
            }
          }
        }
      }
    }
  }
}
