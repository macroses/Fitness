<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { useEventsStore } from '@/stores/userEvents.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'

ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

const props = defineProps({
  bodyParamType: {
    type: Object
  }
})

const userEvents = useEventsStore()

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
        callback: value => `${value}`
      }
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
  plugins: {
    legend: {
      display: false
    }
  }
}

watch(filteredParamsByProp, (val) => {
  if (val) {
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
})

watch(userEvents.bodyParams, (val) => {
  if (val) {
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
})
</script>

<template>
<!--  <div><div>{{ filteredParamsByProp }}</div></div>-->
  <div class="body-params__chart" >
<!--    {{ bodyParamType }}-->

<!--    <div v-for="date in filteredParamsByProp"> {{ dayjs(date.date).format('DD.MM.YYYY') }}</div>-->
<!--    {{ userEvents.bodyParams }}-->
    <Line
      v-if="filteredParamsByProp.length"
      :data="chartData"
      :options="options"
      style="height: 300px;"
    />
    <div v-else>empty</div>


  </div>
</template>