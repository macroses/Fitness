import { defineStore } from 'pinia'

export const useWorkout = defineStore({
  id: 'workout',
  state: () => ({
    name: null,
    color: '246, 191, 38'
  })
})
