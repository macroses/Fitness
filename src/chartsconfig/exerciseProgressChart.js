// const legendMargin = {
//   id: 'legendMargin',
//   beforeInit (chart) {
//     const fitValue = chart.legend.fit
//
//     chart.legend.fit = function fit() {
//       fitValue.bind(chart.legend)()
//       return this.height += 50
//     }
//   }
// }

export const exerciseProgressChart = {
  responsive: true,
  maintainAspectRatio: false,
  circular: true,
  scales: {
    x: {
      grid: {
        color: 'rgba(0,0,0, 0.05)'
      },
      ticks: {
        maxTicksLimit: 10,
        beginAtZero: true
      },
      border: {
        dash: [5, 5]
      }
    },
    y: {
      grid: {
        color: 'rgba(0,0,0, 0.05)'
      },
      ticks: {
        stepSize: 10,
        beginAtZero: true
      },
      border: {
        dash: [5, 5]
      }
    },
    y1: {
      position: 'right'
    }
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 3
    }
  },
  plugins: {
    legend: {
      align: 'start',
      labels: {
        useBorderRadius: true,
        borderRadius: 5,
        boxWidth: 10,
        boxHeight: 10
      }
    },
    // legendMargin
  }
}
