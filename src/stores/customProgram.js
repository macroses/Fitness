import { defineStore } from 'pinia'
import { ref } from 'vue'

export const customProgramStore = defineStore('customProgramStore', () => {
  const customProgram = ref(null)

  return {
    customProgram
  }
})