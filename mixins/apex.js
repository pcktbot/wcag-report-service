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
              hideOverflowingLabels: false,
              orientation: 'horizontal'
            }
          }
        },
        dataLabels: {
          formatter(val) {
            return val
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          },
          textAnchor: 'middle',
          offsetX: 10,
          style: {
            fontSize: '16px',
            fontFamily: 'Roboto',
            colors: ['#d6d6d6', '#0b233f']
          }
        },
        grid: { show: false },
        fill: { opacity: 1 },
        xaxis: {
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
            offsetX: 15,
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
