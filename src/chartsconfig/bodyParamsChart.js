export const bodyParamsOptions = {
  responsive: true,
  maintainAspectRatio: false,
  circular: true,
  scales: {
    x: {
      grid: {
        color: 'rgba(0,0,0, 0.05)'
      },
      ticks: {
        // maxTicksLimit: 5,
        beginAtZero: true,
        // stepSize: 1,
        // max: 12,
        // align: 'inner',
      },
    },
    y: {
      suggestedMax: 120,
      suggestedMin: 30,
      grid: {
        color: 'rgba(0,0,0, 0.05)'
      },
      ticks: {
        stepSize: 10,
        beginAtZero: true,

      }
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
      display: false
    }
  }
}