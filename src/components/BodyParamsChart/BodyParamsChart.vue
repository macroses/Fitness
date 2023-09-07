<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { useEventsStore } from '@/stores/userEvents.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { bodyParamsOptions } from '@/chartsconfig/bodyParamsChart.js'

ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

const userEvents = useEventsStore()
const currentDate = dayjs()
const last30Days = []
const thirtyDaysAgo = currentDate.subtract(30, 'days')

for (let i = 0; i < 30; i++) {
  const date = currentDate.subtract(i, 'day')
  last30Days.unshift(date.format('DD.MM'))
}

const filteredData = computed(() => {
  return userEvents.filteredParamsByProp?.filter(el => {
    // отфильтровали по последним 30 дням
    return dayjs(el.date).isAfter(thirtyDaysAgo)
  })
})

const chartData = ref({
  labels: last30Days,
  datasets: [{
    borderColor: '#1a5cff',
    backgroundColor: '#fff',
    data: filteredData?.value?.map(el => ({
      x: dayjs(el.date).format('DD.MM'),
      y: el.params[0].value
    })),
    fill: false,
    tension: 0.4,
  }]
})

const updateChartData = () => {
  chartData.value = {
    labels: last30Days,
    datasets: [{
      borderColor: '#1a5cff',
      backgroundColor: '#fff',
      data: filteredData?.value?.map(el => ({
        x: dayjs(el.date).format('DD.MM'),
        y: el.params[0].value
      })),
      tension: 0.4,
    }]
  }
}

watch(() => userEvents.filteredParamsByProp, val => val && updateChartData())
watch(() => userEvents.bodyParams, val => val && updateChartData())
</script>

<template>
  <div class="body-params__container">
    <div class="body-params__chart">
      <Loading large v-if="!userEvents.filteredParamsByProp"/>
      <Line
        v-if="userEvents.filteredParamsByProp?.length"
        :data="chartData"
        :options="bodyParamsOptions"
      />
      <div v-else>empty</div>
    </div>
  </div>
</template>