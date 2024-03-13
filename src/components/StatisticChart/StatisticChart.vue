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
import { createHomePageChart } from '@/chartsconfig/homePageChart.js'
import { computed, ref } from 'vue'
import { useEventsStore } from '@/stores/userEvents/userEvents.js'
import { FILTER_LIST, HOME_PAGE_CHART_FILTER } from '@/constants/FILTER_LIST.js'
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm'
import dayjs from 'dayjs'
import ButtonGroup from '@/components/UI/ButtonGroup/ButtonGroup.vue'
import FlexContainer from '@/components/UI/FlexContainer/FlexContainer.vue'

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

const getMaxTonnage = () => Math.max(...userEvents.events.map(el => el.tonnage / 1000))
const getMaxRepeats = () => Math.max(...userEvents.events.map(el => el.repeatsSum))

const getFilter = filterId => {
  switch (filterId) {
    case 1: filterValue.value = 90
      break
    case 2: filterValue.value = 180
      break
    case 3: filterValue.value = 365
      break
    default: filterValue.value = 30
  }
}

const maxChartData = computed(() => {
  return activeFilter.value === 1
    ? getMaxTonnage()
    : getMaxRepeats()
})

const statisticChartData = computed(() => {
  const data = activeFilter.value === 1
    ? userEvents.events.map(el => el.tonnage / 1000)
    : userEvents.events.map(el => el.repeatsSum)

  return {
    labels: userEvents.events.map(el => dayjs(el.date).toISOString()),
    datasets: [
      {
        borderColor: 'rgba(0,0,0, 0.5)',
        backgroundColor: '#fff',
        data,
        tension: 0.4
      }
    ]
  }
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
      />
    </div>
  </div>
</template>

<style src='./style.css' />