<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import Button from '@/components/UI/Button/Button.vue'
import Icon from '@/components/UI/Icon/Icon.vue'

const emit = defineEmits(['getDate'])

const currentDate = ref(dayjs())
const calendarCells = ref([])
const transitionName = ref('')
const isCellActive = ref(false)

const handleClickCell = (cellDate) => {
  emit('getDate', cellDate)
}

const updateCalendar = () => {
  const today = dayjs()
  const firstDayOfMonth = currentDate.value.startOf('month')
  const firstDayOfWeek = firstDayOfMonth.startOf('week').add(1, 'day')

  calendarCells.value = Array.from({ length: 35 }, (_, index) => {
    const cellDate = firstDayOfWeek.add(index, 'day')
    const formattedDate = cellDate.format('YYYY-MM-DDTHH:mm:ssZ')
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
  transitionName.value = 'slideMonth'
  updateCalendar()
}

const goToNextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
  transitionName.value = 'slideMonthRight'
  updateCalendar()
}

onMounted(() => {
  updateCalendar()
})
</script>

<template>
  <div class="calendar">
    <div class="calendar__controls">
      <Button transparent @click="goToPreviousMonth">
        <Icon icon-name="angle-left" width="20px" />
      </Button>
      <Button transparent @click="goToNextMonth">
        <Icon icon-name="angle-right" width="20px" />
      </Button>
    </div>
    <Transition mode="out-in" :name="transitionName">
      <div class="calendar__days" :key="new Date()">
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
          @click="handleClickCell(cell.date)"
        >
          {{ dayjs(cell.date).format('D') }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped src="./style.css"></style>
