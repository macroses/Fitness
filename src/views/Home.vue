<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import Workout from '@/components/Workout/Workout.vue'
import MySelect from '@/components/UI/MySelect/MySelect.vue'

const activeTab = ref(0)
const chosenDate = ref(dayjs())

const getActiveTab = value => {
  activeTab.value = value
}

const getDate = date => {
  chosenDate.value = date
}

const tabs = [
  { id: 0, tabTitle: 'Workout' },
  { id: 1, tabTitle: 'Program' },
  { id: 2, tabTitle: 'Body Parameters' }
]

const testOptions = [
  'rhfcysq',
  'синий',
  'зеленый',
  'rhfcysq',
  'синий',
  'зеленый',
  'rhfcysq',
  'синий',
  'зеленый'
]
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout">
        <Calendar @get-date="getDate" />
        <div />
        <div class="workouts">
          <Tabs
            :tabs="tabs"
            @activeTab="getActiveTab"
          />
          <Workout
            v-if="activeTab === 0"
            :active-tab="activeTab"
            :chosen-date="chosenDate"
          />
          <!--          <MySelect :options="testOptions" />-->
        </div>
        <div />
      </div>
    </div>
  </main>
</template>
