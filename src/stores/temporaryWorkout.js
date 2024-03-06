import { defineStore } from 'pinia'

export const temporaryWorkoutStore = defineStore({
  id: 'temporaryWorkout',
  state: () => ({
    temporaryWorkout: null
  })
})