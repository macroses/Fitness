import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const chosenDateStore = defineStore({
  id: 'chosenDate',
  state: () => ({
    date: dayjs()
  })
})
