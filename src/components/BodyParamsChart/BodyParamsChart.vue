<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { useEventsStore } from '@/stores/userEvents.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { bodyParamsOptions } from '@/chartsconfig/bodyParamsChart.js'

ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

const props = defineProps({
  bodyParamType: {
    type: Object
  }
})

const userEvents = useEventsStore()
const currentDate = dayjs()
const chartDataValues = ref(Array(30).fill(0))

const last30Days = ref([])

for (let i = 0; i < 30; i++) {
  const date = currentDate.subtract(i, 'day')
  last30Days.value.unshift(date.format('DD.MM'))
}

const filteredParamsByProp = computed(() => {
  const resultArray = userEvents.bodyParams?.filter(item => {
    return item.params.some(param => param.label === props.bodyParamType.label)
  })

  return resultArray?.map(item => ({
    id: item.id,
    date: item.date,
    params: item.params.filter(param => param.label === props.bodyParamType.label)
  }))
    .sort((a, b) => dayjs(a.date) - dayjs(b.date))
})

const chartData = ref({
  labels: last30Days.value,
  datasets: [{
    label: '',
    borderColor: '#1a5cff',
    backgroundColor: '#fff',
    data: last30Days.value.map(date => {
      const dataPoint = filteredParamsByProp.value?.find(item => dayjs(item.date).format('DD.MM') === date);
      return dataPoint ? dataPoint.params[0].value : 0
    }),
    tension: 0.4,
  }]
})

const updateChartData = () => {
  const filteredData = filteredParamsByProp.value;

  chartDataValues.value = last30Days.value.map(date => {
    const dataPoint = filteredData.find(item => dayjs(item.date).format('DD.MM') === date)
    return dataPoint ? dataPoint.params[0].value : 0
  })

  // Обновите данные графика
  chartData.value = {
    labels: last30Days,
    datasets: [{
      label: '',
      borderColor: '#1a5cff',
      backgroundColor: '#fff',
      data: chartDataValues.value,
      tension: 0.4,
    }]
  }
}

watch(filteredParamsByProp, val => val && updateChartData())
watch(userEvents.bodyParams, val => val && updateChartData())
</script>

<template>
  <div class="body-params__chart" >
    <Loading large v-if="!filteredParamsByProp"/>
    <Line
      v-if="filteredParamsByProp?.length"
      :data="chartData"
      :options="bodyParamsOptions"
      style="height: 300px;"
    />
    <div v-else>empty</div>
  </div>
</template>