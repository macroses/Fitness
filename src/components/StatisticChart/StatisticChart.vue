<script setup>
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { chartAreaBorder, createHomePageChart } from '@/chartsconfig/homePageChart'
import { computed, onMounted, ref } from 'vue'
import { useEventsStore } from '@/stores/modules/userEvents/userEvents'
import { FILTER_LIST, HOME_PAGE_CHART_FILTER } from '@/constants/FILTER_LIST'
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm'
import dayjs from 'dayjs'

ChartJS.register(
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale
)

const userEvents = useEventsStore()
const activeFilter = ref(1)
const filterValue = ref(30)
const lineChartRef = ref(null)
const chartColor = ref('')

const getFilter = filter => filterValue.value = FILTER_LIST[filter].days

const maxChartData = computed(() => {
  return activeFilter.value === 1 ? userEvents.getMaxTonnage() : userEvents.getMaxRepeats()
})

const calculateAverage = (property) => {
  return computed(() => {
    return userEvents.events
      .map(el => el[property] / 1000)
      .reduce((acc, el) => acc + el, 0) / userEvents.events.length
  })
}

const statisticChartData = computed(() => {
  const sortedEvents = [...userEvents.events].sort((a, b) => dayjs(a.date) - dayjs(b.date))

  const data = activeFilter.value === 1
    ? sortedEvents.map(el => el.tonnage / 1000)
    : sortedEvents.map(el => el.repeatsSum)

  const averageData = Array(sortedEvents.length).fill(
    calculateAverage(activeFilter.value === 1 ? 'tonnage' : 'repeatsSum' ).value
  )

  return {
    labels: sortedEvents.map(el => dayjs(el.date).toISOString()),
    datasets: [
      {
        borderColor: `rgb(${chartColor.value} / 0.7)`,
        backgroundColor: '#fff',
        data,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        borderDash: [6, 6],
        borderColor: 'rgb(121 134 203 / 0.5)',
        data: averageData,
        tension: 0.4,
        pointRadius: 0,
        label: 'Average'
      }
    ]
  }
})

onMounted(() => {
  chartColor.value = getComputedStyle(document.documentElement).getPropertyValue('--text-color')
})
</script>

<template>
  <div class="main-layout__chart">
    <Loading
      large
      v-if="!userEvents.events"
    />
    <FlexContainer>
      <Dropdown
        :width="170"
        :dropdown-list="HOME_PAGE_CHART_FILTER"
        @active-value="activeFilter = $event.id"
      />
      <ButtonGroup
        is-flexible
        :buttons="FILTER_LIST"
        @getButton="getFilter"
      />
    </FlexContainer>
    <div class="statistic-chart-wrapper">
      <Line
        ref="lineChartRef"
        :data="statisticChartData"
        :options="createHomePageChart(maxChartData, filterValue)"
        :plugins="[chartAreaBorder]"
      />
    </div>
  </div>
</template>

<style src='./style.css' />