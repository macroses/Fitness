<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { updateCalendar } from '@/helpers/calendarHelper'

const emit = defineEmits(['getDate'])

const currentDate = ref(dayjs())
const today = ref(dayjs())
const calendarCells = ref([])
const transitionName = ref('')
const activeDate = ref(dayjs())

const handleClickCell = (cellDate) => {
  emit('getDate', cellDate)
  activeDate.value = cellDate
  transitionName.value = ''
}

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

const goToCurrentMonth = () => {
  currentDate.value = today.value
  transitionName.value = 'slideMonth'
  updateCalendar(currentDate, today, calendarCells)
}

onMounted(() => {
  updateCalendar(currentDate, today, calendarCells)
})
</script>

<template>
  <div class="calendar">
    <div class="calendar__controls">
      <Button transparent @click="goToPreviousMonth">
        <Icon icon-name="angle-left" width="20px" aria-label="previous month" />
      </Button>
      <Button transparent @click="goToNextMonth">
        <Icon icon-name="angle-right" width="20px" aria-label="next month" />
      </Button>
      <Button
        transparent
        aria-label="current month"
        @click="goToCurrentMonth"
        :disabled="currentDate.isSame(today, 'month')"
      >
        Current
      </Button>
      <Transition mode="out-in" :name="transitionName" appear>
        <div class="callendar__date" :key="currentDate">
          {{ currentDate.format('MMMM') }} {{ currentDate.format('YYYY') }}
        </div>
      </Transition>
    </div>
    <Transition mode="out-in" :name="transitionName" appear>
      <div class="calendar__days" :key="new Date()">
        <div
          v-for="cell in calendarCells"
          :key="cell.date"
          :class="[
            'calendar__cell',
            {
              'calendar__cell--other-month': cell.isOtherMonth,
              'calendar__cell--current-day': cell.isCurrentDay,
              active: dayjs(cell.date).isSame(activeDate, 'day')
            }
          ]"
          @click="handleClickCell(cell.date)"
        >
          <span class="calendar__cell-text">{{ dayjs(cell.date).format('D') }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style src="./style.css"></style>
