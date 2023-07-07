<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import Workout from '@/components/Workout/Workout.vue'
import { workoutStore } from '@/stores/workout'
import AsideExercise from '@/components/AsideExercise/AsideExercise.vue'
import { exerciseStore } from '@/stores/exercise'

const workoutsStore = workoutStore()
const exercisesStore = exerciseStore()

const activeTab = ref(0)
const chosenDate = ref(dayjs())

const getActiveTab = value => {
  activeTab.value = value
}

const getDate = date => {
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
        <div class="main__layout-left">
          <Calendar @get-date="getDate" />
          <div class="events">
            its chosen events
          </div>
        </div>
        <div class="main__layout-right">
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
          </div>
        </div>
      </div>
    </div>
  </main>

  <transition name="slide-left">
    <AsideExercise v-if="exercisesStore.exercise" />
  </transition>
  <transition>
    <div
      v-if="exercisesStore.exercise"
      class="aside-layout"
    />
  </transition>
</template>
