<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { workoutStore } from '@/stores/workout'
import { exerciseStore } from '@/stores/exercise'

const workoutsStore = workoutStore()
const exercisesStore = exerciseStore()
const chosenDate = ref(dayjs())

const getDate = date => {
  chosenDate.value = date
  workoutsStore.date = date
}
</script>

<template>
  <main>
    <div class="container">
      <div
        class="main__layout"
        :class="{ 'workout-mode': workoutsStore.isWorkoutMode }"
      >
        <div class="main__layout-left">
          <Calendar
            @get-date="getDate"
            :class="{ mode: workoutsStore.isWorkoutMode }"
          />

          <div
            v-if="!workoutsStore.isWorkoutMode"
            class="group"
          >
            <Button @click="workoutsStore.isWorkoutMode = true">
              Create workout
            </Button>
            <Button>Program</Button>
            <Button>Body parameters</Button>
          </div>

          <div
            v-if="!workoutsStore.isWorkoutMode"
            class="events"
          >
            <div class="events__empty">
              Today there are no events
            </div>
          </div>

          <template v-if="workoutsStore.isWorkoutMode">
            <div class="user-workout">
              <WorkoutDescription />
              <ChosenExercisesList />
            </div>
          </template>
        </div>

        <div class="main__layout-right">
          <ExercisesList v-if="workoutsStore.isWorkoutMode" />
        </div>
      </div>
    </div>
  </main>

  <AsideExercise v-if="exercisesStore.exercise" />
</template>

<style>
.user-workout {
  padding: 12px;
  border-radius: 20px;
  border: 1px solid rgba(26, 92, 255, 0.1);
}
</style>
