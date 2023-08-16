<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement } from 'chart.js'
import dayjs from 'dayjs'
import { useEventsStore } from '@/stores/userEvents'

ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement)

const userEvents = useEventsStore()
// Что должно быть в чтении тренировки
// 1. График тоннажа, где на каждое упражнение указана процентовка от общего тоннажа
// 2. На каждое упражнение построить график с ростом предыдущих результатов
// 3. попробовать выстроить тенденции по росту/спаду весов.
// 4. График интенсивности. Для этого надо написать таймеры в тренировках, чтобы их запускать
// и записывать интервалы в сеты, а затем в тренировки. Тогда можно будет построить зависимость интенсивности
// 5. Изходя из поднимаемых весов, попробовать вычислить примерный одноповторный максимум - отобразить на графике

const props = defineProps(['id'])

const workout = computed(() => userEvents.events.filter(event => event.workoutId === props.id))

const chartData = computed(() => {
  const exerciseId = 1
  const exerciseData = userEvents.events
    .filter(event => event.exercisesParamsCollection.some(exercise => exercise.exerciseId === exerciseId))
    .sort((a, b) => dayjs(a.date.$d).valueOf() - dayjs(b.date.$d).valueOf())

  // Преобразование данных для графика
  const labels = exerciseData.map(event => dayjs(event.date.$d).format('DD.MM'))
  const tonnages = exerciseData.map(event => event.tonnage / 1000)

  return {
    labels,
    datasets: [
      {
        label: 'Тоннаж',
        backgroundColor: 'rgba(26, 92, 255, 0.2)',
        borderColor: 'rgba(26, 92, 255, 1)',
        borderWidth: 1,
        tension: 0.3,
        data: tonnages
      }
    ]
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  circular: true,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        color: 'rgba(0,0,0, 0.03)'
      },
      ticks: {
        stepSize: 10,
        beginAtZero: true,
        callback: value => `${value}T`
      }
    }
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 2
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <div class="read-workout">
    <div class="container">
      <h1>{{ workout[0].title }}</h1>
    </div>
    <div class="chart">
      <Line
        :data="chartData"
        :options="options"
      />
    </div>
  </div>
</template>
