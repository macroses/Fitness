<script setup>
import dayjs from 'dayjs'
import { onMounted, ref, watchEffect } from 'vue'
import { updateCalendar } from '@/helpers/calendarHelper'
import { chosenDateStore } from '@/stores/chosenDate'
import { useEventsStore } from '@/stores/modules/userEvents/userEvents'
import useCalendar from '@/composables/useCalendarControls'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  isAfterDaysOff: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['getDate'])
const dateStore = chosenDateStore()
const userStore = useEventsStore()

const calendarParent = ref(null)
const SWIPE_THRESHOLD = 20

const {
  currentDate,
  today,
  calendarCells,
  transitionName,
  goToPreviousMonth,
  goToNextMonth
} = useCalendar()

const handleClickCell = cellDate => {
  if (props.isAfterDaysOff && dayjs(cellDate).isAfter(today.value, 'day')) {
    return
  }

  emit('getDate', cellDate)
  transitionName.value = ''
}

const isMarker = date =>
  props.events.some(event => event.date.isSame(date, 'day'))

const getCellColor = date => {
  const matchingEvent = props.events.find(event => event.date.isSame(date, 'day'))
  return matchingEvent ? matchingEvent.color : ''
}

const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = event => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchEnd = event => {
  touchEndX.value = event.changedTouches[0].clientX
  const swipeDistance = touchEndX.value - touchStartX.value

  if (Math.abs(swipeDistance) >= SWIPE_THRESHOLD) {
    if (swipeDistance > 0) {
      goToPreviousMonth()
      transitionName.value = 'slideMonthRight'
    } else {
      goToNextMonth()
      transitionName.value = 'slideMonth'
    }
  }
}

onMounted(() => updateCalendar(currentDate, today, calendarCells))

watchEffect(props.events, val => {
  if (val) updateCalendar(currentDate, today, calendarCells)
})
</script>

<template>
  <div
    class="calendar"
    :class="{ copyMode: userStore.isCopyMode }"
  >
    <div
      class="calendar__controls"
      data-test="controls"
    >
      <Button
        transparent
        @click="goToPreviousMonth"
      >
        <Icon
          icon-name="angle-left"
          width="20px"
          aria-label="previous month"
        />
      </Button>
      <Button
        transparent
        @click="goToNextMonth"
        data-test="next"
      >
        <Icon
          icon-name="angle-right"
          width="20px"
          aria-label="next month"
        />
      </Button>
      <Transition
        mode="out-in"
        :name="transitionName"
        appear
      >
        <div
          class="calendar__date"
          :key="currentDate"
        >
          {{ currentDate.format('MMMM') }} {{ currentDate.format('YYYY') }}
        </div>
      </Transition>
    </div>
    <Transition
      mode="out-in"
      :name="transitionName"
      appear
    >
      <div
        ref="calendarParent"
        class="calendar__days"
        :key="new Date()"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
      >
        <button
          v-for="cell in calendarCells"
          :key="cell.date"
          :class="[
            'calendar__cell',
            {
              'calendar__cell--other-month': cell.isOtherMonth,
              'calendar__cell--current-day': cell.isCurrentDay,
              active: dayjs(cell.date).isSame(dateStore.date, 'day'),
              disabled: isAfterDaysOff && dayjs(cell.date).isAfter(today, 'day')
            }
          ]"
          tabindex="0"
          @click="handleClickCell(cell.date)"
        >
          <span class="calendar__cell-text">{{
              dayjs(cell.date).format('D')
            }}</span>
          <div
            v-if="isMarker(cell.date)"
            :style="{ backgroundColor: `rgb(${getCellColor(cell.date)})` }"
            class="markerDate"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style src="./style.css"></style>