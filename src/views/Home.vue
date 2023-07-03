<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import Workout from '@/components/Workout/Workout.vue'
import MySelect from '@/components/UI/MySelect/MySelect.vue'
import { workoutStore } from '@/stores/workout'

const workoutsStore = workoutStore()

const activeTab = ref(0)
const chosenDate = ref(dayjs())

const getActiveTab = (value) => {
  activeTab.value = value
}

const getDate = (date) => {
  chosenDate.value = date
  workoutsStore.date = date
}

const tabs = [
  { id: 0, tabTitle: 'Workout' },
  { id: 1, tabTitle: 'Program' },
  { id: 2, tabTitle: 'Body Parameters' }
]
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout">
        <Calendar @get-date="getDate" />
        <div />
        <div class="workouts">
          <Tabs :tabs="tabs" @activeTab="getActiveTab" />
          <Workout v-if="activeTab === 0" :active-tab="activeTab" :chosen-date="chosenDate" />
          <!--          <MySelect :options="testOptions" />-->
        </div>
        <div />
      </div>
    </div>
  </main>
</template>
