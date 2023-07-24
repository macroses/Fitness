import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

export const chosenDateStore = defineStore('chosenDate', () => {
  const date = ref(dayjs())
  const rescheduleCounter = ref(0)

  const rescheduledEventDate = computed(() => date.value.add(rescheduleCounter.value, 'day'))

  return {
    date,
    rescheduleCounter,
    rescheduledEventDate
  }
})