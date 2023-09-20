export const bodyParamsFunc = (max, min) => {
  const bodyParamsOptions = {
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
          beginAtZero: true,
        },
        border: {
          dash: [5, 5],
        }
      },
      y: {
        suggestedMax: (max + 10) || null,
        suggestedMin: (min - 10) || null,
        grid: {
          color: 'rgba(0,0,0, 0.05)',
        },
        ticks: {
          stepSize: 10,
          beginAtZero: true,
        },
        border: {
          dash: [5, 5],
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

  return { bodyParamsOptions }
}

// export const bodyParamsOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   circular: true,
//   scales: {
//     x: {
//       grid: {
//         color: 'rgba(0,0,0, 0.05)'
//       },
//       ticks: {
//         maxTicksLimit: 10,
//         beginAtZero: true,
//         // stepSize: 1,
//         // max: 12,
//         // align: 'inner',
//       },
//       border: {
//         dash: [5, 5],
//       }
//     },
//     y: {
//       // suggestedMax: 120,
//       // suggestedMin: 30,
//       grid: {
//         color: 'rgba(0,0,0, 0.05)',
//       },
//       ticks: {
//         stepSize: 10,
//         beginAtZero: true,
//       },
//       border: {
//         dash: [5, 5],
//       }
//     }
//   },
//   elements: {
//     line: {
//       borderWidth: 2
//     },
//     point: {
//       radius: 3
//     }
//   },
//   plugins: {
//     legend: {
//       display: false
//     }
//   }
// }