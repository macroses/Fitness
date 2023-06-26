<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

const currentDate = ref(dayjs())
const calendarCells = ref([])

const updateCalendar = () => {
  const today = dayjs()
  const firstDayOfMonth = currentDate.value.startOf('month')
  const firstDayOfWeek = firstDayOfMonth.startOf('week').add(1, 'day')

  calendarCells.value = Array.from({ length: 35 }, (_, index) => {
    const cellDate = firstDayOfWeek.add(index, 'day')
    const formattedDate = cellDate.format('D.M')
    const isOtherMonth = !cellDate.isSame(firstDayOfMonth, 'month')
    const isCurrentDay = cellDate.isSame(today, 'day')

    return {
      date: formattedDate,
      isOtherMonth,
      isCurrentDay
    }
  })
}

const goToPreviousMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
  updateCalendar()
}

const goToNextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
  updateCalendar()
}

onMounted(() => {
  updateCalendar()
})
</script>

<template>
  <div class="calendar">
    <div class="calendar__controls">
      <button @click="goToPreviousMonth">Предыдущий месяц</button>
      <button @click="goToNextMonth">Следующий месяц</button>
    </div>
    <div class="calendar__days">
      <div
        v-for="cell in calendarCells"
        :key="cell.date"
        :class="[
          'calendar__cell',
          {
            'calendar__cell--other-month': cell.isOtherMonth,
            'calendar__cell--current-day': cell.isCurrentDay
          }
        ]"
      >
        {{ cell.date }}
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
