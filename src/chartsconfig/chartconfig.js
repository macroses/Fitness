import { computed } from 'vue'

export const workoutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
      labels: {
        boxWidth: 15
      }
    }
  }
}

export const chartData = (propData) => {
  const percentageData = computed(() => {
    const percentageData = []
    const totalTonnage = propData.tonnage

    for (const exercise of propData.exercisesParamsCollection) {
      const percentage = (exercise.setTonnage / totalTonnage) * 100
      percentageData.push(Math.round(percentage))
    }

    return percentageData
  })

  const exercises = propData.exercisesParamsCollection.map(exercise => {
    const max_length = 27
    const { exerciseName } = exercise

    if (exerciseName.length > max_length) {
      exercise.exerciseName = `${exerciseName.substring(0, max_length)}...`
    }

    return exercise.exerciseName
  })

  const workoutData = {
    labels: exercises,
    datasets: [
      {
        data: percentageData.value,
        backgroundColor: ['#99ffcc', '#ff99cc', '#ffff9b', '#ffccff', '#ccffcc', '#cc99ff', '#ccff99', '#ccccff', '#ffcc99', '#ccffff', '#ffcccc', '#99ccff']
      }
    ]
  }

  return { workoutData }
}
