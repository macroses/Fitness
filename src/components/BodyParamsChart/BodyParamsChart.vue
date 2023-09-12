<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { bodyParamsOptions } from '@/chartsconfig/bodyParamsChart.js'
import { bodyParamsStore } from '@/stores/bodyParams.js'

ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

const props = defineProps({
  filter: {
    type: Number,
    default: 0
  }
})

const paramsStore = bodyParamsStore()
const currentDate = dayjs()
const daysCounterByFilter = ref(30)
let datesCollection = []
const daysAgo = currentDate.subtract(daysCounterByFilter.value, 'days')



const fillDateCollection = computed(() => {
  datesCollection = []

  for (let i = 0; i < daysCounterByFilter.value; i++) {
    const date = currentDate.subtract(i, 'day')
    datesCollection.unshift(date.format('DD.MM'))
  }

  return datesCollection
})

const filteredData = computed(() => {
  return paramsStore.filteredParamsByProp?.filter(el => {
    return dayjs(el.date).isAfter(daysAgo)
  })
})

const chartData = computed(() => {
  return {
    labels: fillDateCollection.value,
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

watch(() => props.filter, (val) => {
  if (val === 0) daysCounterByFilter.value = 30
  if (val === 1) daysCounterByFilter.value = 90
  if (val === 2) daysCounterByFilter.value = 180
  if (val === 3) daysCounterByFilter.value = 365
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