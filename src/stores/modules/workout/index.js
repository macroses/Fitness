import { defineStore } from 'pinia'
import state from '@/stores/modules/workout/state'
import actions from '@/stores/modules/workout/actions'
import getters from '@/stores/modules/workout/getters'

export const workoutStore = defineStore({
  id: 'workout',
  state,
  actions,
  getters
})
