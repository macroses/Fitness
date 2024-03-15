<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { temporaryWorkoutStore } from '@/stores/modules/temporaryWorkout'
import { useTemporaryWorkoutComposable } from './composable'
import router from '@/router'
import { workoutStore } from '@/stores/modules/workout'
import { useEventsStore } from '@/stores/modules/userEvents/userEvents'

const useTemporaryWorkout = temporaryWorkoutStore()
const workoutsStore = workoutStore()
const userEvents = useEventsStore()

const isOpened = ref(false)
const workoutControls = ref(null)

const {
  startTimer,
  calculateTimeLeft,
  isAlert,
  formatTime,
  timeLeft
} = useTemporaryWorkoutComposable()

let timerId = null

const editTemporaryWorkout = () => {
  workoutsStore.editUsersEvent(useTemporaryWorkout.temporaryWorkout, true)

  isOpened.value = false
  router.push('/workout')
  useTemporaryWorkout.clearLocalStorage()
}

const saveTemporaryWorkout = async () => {
  await userEvents.pushEventHandler(useTemporaryWorkout.temporaryWorkout)
  isOpened.value = false
  useTemporaryWorkout.clearLocalStorage()
}

const deleteTemporaryWorkout = () => {
  useTemporaryWorkout.clearLocalStorage()
  clearInterval(timerId)
}

onMounted(() => {
  startTimer()
  calculateTimeLeft()
  timerId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerId)
      useTemporaryWorkout.clearLocalStorage()
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timerId))

onClickOutside(workoutControls, () => isOpened.value = false)
</script>

<template>
  <div class="temporary-workout">
    <button
      class="temporary-workout__button"
      :class="{ 'time-left': isAlert }"
      @click="isOpened = !isOpened"
    >
      <span :class="{'temporary-first': !useTemporaryWorkout.isWorkoutAvailable}" />
      <Icon
        icon-name="timer"
        width="20px"
      />
    </button>
    <div
      ref="workoutControls"
      class="temporary-workout__content"
      :class="{ opened: isOpened }"
    >
      <div class="temporary-workout__funcs">
        <div class="temporary-workout__timer">
          <Alert sm>
            You are not complete your workout <b>{{ useTemporaryWorkout.temporaryWorkout.title }}</b>.
            It will be deleted after 5 minutes.
          </Alert>
          <div class="temporary-workout__timer-wrap">
            {{ formatTime(timeLeft) }}
          </div>
          <div class="temporary-workout__funcs-list">
            <Button
              bordered
              aria-label="Save temporary workout"
              @click="saveTemporaryWorkout"
            >
              Save
            </Button>
            <Button
              bordered
              aria-label="Edit temporary workout"
              @click="editTemporaryWorkout"
            >
              Edit
            </Button>
            <Button
              bordered
              aria-label="Delete temporary workout"
              @click="deleteTemporaryWorkout"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css" />