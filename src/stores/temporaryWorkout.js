import { defineStore } from 'pinia'
import { cloneDeep } from '@/helpers/cloneDeep.js'

export const temporaryWorkoutStore = defineStore({
  id: 'temporaryWorkout',
  state: () => ({
    temporaryWorkout: null,
    isWorkoutAvailable: true
  }),
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('temporaryWorkout', JSON.stringify(this.temporaryWorkout))
    },
    loadFromLocalStorage() {
      this.temporaryWorkout = cloneDeep(JSON.parse(localStorage.getItem('temporaryWorkout')))
    },
    clearLocalStorage() {
      localStorage.removeItem('temporaryWorkout')
      localStorage.removeItem('startTime')
      this.temporaryWorkout = null
    }
  }
})