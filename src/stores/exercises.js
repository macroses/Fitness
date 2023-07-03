import { defineStore } from 'pinia'
import { getCollection } from '@/composables/getCollection'

export const useExercises = defineStore({
  id: 'exercises',
  state: () => ({
    loading: false,
    dataExercises: []
  }),
  actions: {
    async getExercises() {
      await getCollection('exercises', '*', loading, dataExercises)
    }
  }
})
