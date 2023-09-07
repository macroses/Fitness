<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { bodyParamsOptions } from '@/chartsconfig/bodyParamsChart.js'
import { bodyParamsStore } from '@/stores/bodyParams.js'

ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

const props = defineProps({
  filter: {
    type: Number
  }
})

const paramsStore = bodyParamsStore()
const currentDate = dayjs()
const last30Days = []
const thirtyDaysAgo = currentDate.subtract(30, 'days')

for (let i = 0; i < 30; i++) {
  const date = currentDate.subtract(i, 'day')
  last30Days.unshift(date.format('DD.MM'))
}

const filteredData = computed(() => {
  return paramsStore.filteredParamsByProp?.filter(el => {
    return dayjs(el.date).isAfter(thirtyDaysAgo)
  })
})

const chartData = computed(() => {
  return {
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
})
</script>

<template>
  <div class="body-params__container">
    <div class="body-params__chart">
      <Loading large v-if="!paramsStore.filteredParamsByProp"/>
      <Line
        v-if="paramsStore.filteredParamsByProp?.length"
        :data="chartData"
        :options="bodyParamsOptions"
      />
      <div v-else>empty</div>
    </div>
  </div>
</template>