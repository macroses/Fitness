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
  labels: filteredParamsByProp.value?.map(el => dayjs(el.date).format('DD.MM')),
  datasets: [{
    label: '',
    borderColor: '#1a5cff',
    backgroundColor: '#fff',
    data: filteredParamsByProp.value?.map(el => el.params[0].value),
    tension: 0.4,
  }],
})

const updateChartData = () => {
  chartData.value = {
    labels: filteredParamsByProp.value?.map(el => dayjs(el.date).format('DD.MM')),
    datasets: [{
      label: '',
      borderColor: '#1a5cff',
      backgroundColor: '#fff',
      data: filteredParamsByProp.value?.map(el => el.params[0].value),
      tension: 0.4,
    }]
  }
}

watch(() => filteredParamsByProp, val => val && updateChartData())
watch(() => userEvents.bodyParams, val => val && updateChartData())
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