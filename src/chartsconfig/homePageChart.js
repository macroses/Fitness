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
          color: 'rgba(0,0,0, 0.05)',
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
    interaction: {
      intersect: false,
      mode: 'nearest',
      axis: 'xy'
    },
    plugins: {
      legend: {
        display: false
      },
      chartAreaBorder: {
        borderColor: 'rgb(235 236 240 / 0.1)',
        borderRadius: 4,
        borderWidth: 1,
      },
      title: {
        display: true,
        text: (ctx) => {
          const {axis = 'xy', intersect, mode} = ctx.chart.options.interaction;
          return 'Mode: ' + mode + ', axis: ' + axis + ', intersect: ' + intersect;
        }
      }
    }
  }
}

export const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, width, height}} = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
}