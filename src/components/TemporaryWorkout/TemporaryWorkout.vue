<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { temporaryWorkoutStore } from '@/stores/temporaryWorkout.js'

const useTemporaryWorkout = temporaryWorkoutStore()

const isOpened = ref(false)
const workoutControls = ref(null)
const timeLeft = ref(600) // 5 minutes in seconds
let timerId = null

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const isAlert = computed(() => timeLeft.value <= 60)

const deleteTemporaryWorkout = () => {

  useTemporaryWorkout.$reset()
}

onMounted(() => {
  timerId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerId)
      useTemporaryWorkout.$reset()
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timerId)
})

onClickOutside(workoutControls, () => isOpened.value = false)
</script>

<template>
  <div
    class="temporary-workout"
  >
    <button
      class="temporary-workout__button"
      :class="{ 'time-left': isAlert}"
      @click="isOpened = !isOpened"
    >
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
            >
              Save
            </Button>
            <Button
              bordered
              aria-label="Edit temporary workout"
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

<style src="./style.css" />