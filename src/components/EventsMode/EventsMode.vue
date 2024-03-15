<script setup>
import dayjs from 'dayjs'
import { computed } from 'vue'
import { chosenDateStore } from '@/stores/chosenDate'
import { temporaryWorkoutStore } from '@/stores/modules/temporaryWorkout'

const emit = defineEmits(['workoutMode'])

const dateStore = chosenDateStore()
const useTemporaryWorkout = temporaryWorkoutStore()

const isWorkoutModeAvailable = computed(() => {
  return useTemporaryWorkout.temporaryWorkout !== null
})

const workoutMode = () => {
  if (isWorkoutModeAvailable.value) {
    useTemporaryWorkout.isWorkoutAvailable = false

    setTimeout(function () {
      useTemporaryWorkout.isWorkoutAvailable = true
    }, 3000)

    return
  }

  emit('workoutMode')
}
</script>

<template>
  <div class="group home">
    <Button
      bordered
      @click="workoutMode"
    >
      <Icon
        icon-name="fluent--dumbbell"
        width="25px"
      />
      <span>Workout</span>
    </Button>
    <Button
      is-link
      bordered
      path="/program"
    >
      <Icon
        icon-name="computer"
        width="25px"
      />
      <span>Program</span>
    </Button>
    <Button
      is-link
      bordered
      :disabled="dateStore.date > dayjs()"
      path="/body-parameters"
    >
      <Icon
        icon-name="pen-ruler"
        width="20px"
      />
      <span>Parameters</span>
    </Button>
  </div>
</template>
