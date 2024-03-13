<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import { exerciseProgressChart } from '@/chartsconfig/exerciseProgressChart.js'
import { computed } from 'vue'
import { useEventsStore } from '@/stores/userEvents/userEvents.js'

ChartJS.register(
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
)

const props = defineProps({
  exerciseId: {
    type: [Number, String],
    default: 0
  }
})

const eventStore = useEventsStore()
eventStore.exerciseId = props.exerciseId

const chartData = computed(() => {
  const lastSixExerciseHistory = eventStore.exerciseHistory.slice(-6)

  return {
    labels: lastSixExerciseHistory.map(el => dayjs(el.date).format('DD.MM')),
    datasets: [
      {
        label: 'Weight',
        borderColor: '#1a5cff',
        backgroundColor: '#fff',
        data: lastSixExerciseHistory.map(el => el.weight / 1000),
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Repeats',
        borderColor: 'red',
        backgroundColor: '#fff',
        data: lastSixExerciseHistory.map(el => el.repeats),
        tension: 0.4,
        yAxisID: 'y1',
      }
    ]
  }
})
</script>

<template>
  <div
    class="exercise-chart"
    @click.stop
  >
    <h3
      v-if="eventStore.exerciseHistory.length > 3"
      class="exercise-chart__header"
    >
      Last 6 results
    </h3>
    <button
      class="exercise-chart__close"
      @click="$emit('close')"
    >
      <Icon
        icon-name="xmark"
        width="14px"
      />
    </button>

    <Line
      v-if="eventStore.exerciseHistory.length > 3"
      :data="chartData"
      :options="exerciseProgressChart"
    />
    <p v-else class="exercise-chart__no-data">
      Not enough data to show chart
    </p>
  </div>
</template>

<style scoped src="./style.css" />
