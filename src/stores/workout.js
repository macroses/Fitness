import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const workoutStore = defineStore({
  id: 'workout',
  state: () => ({
    title: null,
    labelColor: null,
    date: dayjs()
  })
})
