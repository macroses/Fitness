import { defineStore } from 'pinia'
import state from '@/stores/modules/temporaryWorkout/state/index.js'
import actions from '@/stores/modules/temporaryWorkout/actions/index.js'

export const temporaryWorkoutStore = defineStore({
  id: 'temporaryWorkout',
  state,
  actions
})