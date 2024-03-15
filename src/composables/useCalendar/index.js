import { ref } from 'vue'
import { updateCalendar } from '@/helpers/calendarHelper'
import dayjs from 'dayjs'

export default function useCalendar() {
  const currentDate = ref(dayjs())
  const today = ref(dayjs())
  const transitionName = ref('')
  const calendarCells = ref([])

  const goToPreviousMonth = () => {
    currentDate.value = currentDate.value.subtract(1, 'month')
    transitionName.value = 'slideMonth'
    updateCalendar(currentDate, today, calendarCells)
  }

  const goToNextMonth = () => {
    currentDate.value = currentDate.value.add(1, 'month')
    transitionName.value = 'slideMonthRight'
    updateCalendar(currentDate, today, calendarCells)
  }

  return {
    currentDate,
    today,
    calendarCells,
    transitionName,
    goToPreviousMonth,
    goToNextMonth
  }
}