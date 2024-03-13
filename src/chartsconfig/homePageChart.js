import dayjs from 'dayjs'

export const createHomePageChart = (data, filterDaysNumber) => {
  const now = dayjs()
  const thirtyDaysAgo = now.subtract(filterDaysNumber, 'day')

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 60
      }
    },
    scales: {
      x: {
        type: 'time',
        min: thirtyDaysAgo.toISOString(),
        max: now.toISOString(),
        time: {
          unit: 'day',
          displayFormats: {
            day: 'DD.MM'
          }
        },
        ticks: {
          source: 'auto',
          maxTicksLimit: 8,
          callback: function(value, index, values) {
            return index !== 0 ? dayjs(value).format('DD.MM') : ""
          }
        },
        grid: {
          color: 'rgba(0,0,0, 0.05)'
        }
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(0,0,0, 0.05)'
        },
        ticks: {
          stepSize: 10,
          beginAtZero: true,
        },
        suggestedMin: 0,
        suggestedMax: data + 20
      }
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 4
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
}