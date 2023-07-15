<script setup>
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { workoutStore } from '@/stores/workout'
import { exerciseStore } from '@/stores/exercise'

const workoutsStore = workoutStore()
const exercisesStore = exerciseStore()
const chosenDate = ref(dayjs())
const homeCalendar = ref(null)
const userWorkoutEl = ref(null)
const exList = ref(null)
const isCalendarVisible = ref(false)

const getDate = date => {
  chosenDate.value = date
  workoutsStore.date = date
}

gsap.registerPlugin(CSSPlugin)

onMounted(() => {
  const settings = { autoAlpha: 0, scale: 0.8, duration: 0.3, ease: 'sine', delay: 0 }
  gsap.from(homeCalendar.value, { x: '+100', ...settings })
  gsap.from(userWorkoutEl.value, { y: '-100', ...settings })
  gsap.from(exList.value, { x: '-100', ...settings })
})
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout workout-mode">
        <div class="main__layout-left">
          <div
            ref="homeCalendar"
            class="calendar-wr"
            :class="{ hidden: !isCalendarVisible }"
          >
            <Calendar
              @get-date="getDate"
              is-workout
            />
            <div
              v-if="!isCalendarVisible"
              class="calendar-chosen-date"
            >
              {{ chosenDate.format('DD MMMM YYYY') }}
              <span>{{ chosenDate.format('dddd') }}</span>
            </div>
            <Button
              size="small"
              class="hide-calendar__button"
              :class="{ active: isCalendarVisible }"
              @click="isCalendarVisible = !isCalendarVisible"
            >
              {{ isCalendarVisible ? 'Hide calendar' : 'Show calendar' }}
            </Button>
          </div>

          <div
            ref="userWorkoutEl"
            class="user-workout"
          >
            <WorkoutDescription />
            <ChosenExercisesList />
          </div>
        </div>

        <div class="main__layout-right">
          <div
            ref="exList"
            class="exercises-list__wr"
          >
            <ExercisesList />
          </div>
        </div>
      </div>
    </div>

    <AsideExercise v-if="exercisesStore.exercise" />
  </main>
</template>

<style>
.user-workout {
  padding: 12px;
  border-radius: 20px;
  border: 1px solid rgba(26, 92, 255, 0.1);
}
</style>