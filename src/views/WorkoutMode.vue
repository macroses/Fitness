<script setup>
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { onBeforeRouteLeave } from 'vue-router'
import Button from '@/components/UI/Button/Button.vue'
import { workoutStore } from '@/stores/workout'
import { exerciseStore } from '@/stores/exercise'
import router from '@/router'
import { chosenDateStore } from '@/stores/chosenDate'
import { useEventsStore } from '@/stores/userEvents'
import Loading from '@/components/UI/Loading/Loading.vue'

const workoutsStore = workoutStore()
const exercisesStore = exerciseStore()
const dateStore = chosenDateStore()
const userEvents = useEventsStore()
const chosenDate = ref(dayjs())
const homeCalendar = ref(null)
const userWorkoutEl = ref(null)
const exList = ref(null)
const isCalendarVisible = ref(false)

const getDate = date => {
  chosenDate.value = date
  dateStore.date = date
}

gsap.registerPlugin(CSSPlugin)

onMounted(() => {
  const settings = { autoAlpha: 0, scale: 0.8, duration: 0.3, ease: 'sine', delay: 0 }
  gsap.from(homeCalendar.value, { x: '+100', ...settings })
  gsap.from(userWorkoutEl.value, { y: '-100', ...settings })
  gsap.from(exList.value, { x: '-100', ...settings })
})

const workoutToBase = async () => {
  if (workoutsStore.isWorkoutEdit) {
    await userEvents.updateEventHandler()
    router.push('/')
    return
  }

  await userEvents.pushEventHandler()
  workoutsStore.$reset()
  router.push('/')
}

onBeforeRouteLeave(() => {
  localStorage.removeItem('wId')
  workoutsStore.$reset()
})
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout workout-mode">
        <Loading
          large
          v-if="userEvents.eventsLoading"
        />
        <div class="main__layout-left">
          <div
            ref="homeCalendar"
            class="calendar-wr"
            :class="{ hidden: !isCalendarVisible }"
          >
            <Calendar @get-date="getDate" />
            <div
              v-if="!isCalendarVisible"
              class="calendar-chosen-date"
            >
              {{ dateStore.date.format('DD MMMM YYYY') }}
              <span>{{ dateStore.date.format('dddd') }}</span>
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
            <div class='total-tonnage'>
              Total tonnage: <b>{{ workoutsStore.tonnage / 1000 }}T</b>
            </div>
            <ChosenExercisesList />
          </div>

          <Button
            bordered
            full
            @click="workoutToBase"
          >
            {{ workoutsStore.isWorkoutEdit ? 'Update workout' : 'Save workout' }}
          </Button>
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
  margin-bottom: 12px;
}
</style>
