<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { workoutStore } from '@/stores/workout'
import router from '@/router'
import { chosenDateStore } from '@/stores/chosenDate'
import { useEventsStore } from '@/stores/userEvents'

defineProps({
  events: {
    type: Array,
    default: () => [],
    required: true
  }
})

const emit = defineEmits(['deleteEvent'])
const workoutsStore = workoutStore()
const dateStore = chosenDateStore()
const userEvents = useEventsStore()

const isFutureEventsMove = ref(false)
const isRescheduleModal = ref(false)

const chosenEvent = ref(null)

const deleteEvent = eventId => emit('deleteEvent', eventId)

const activeIndex = ref(null)
const dropdownList = ref(null)

const toggleMenu = index => activeIndex.value = (activeIndex.value === index) ? null : index

onClickOutside(dropdownList, () => activeIndex.value = null)

const editEvent = (event) => {
  workoutsStore.editUsersEvent(event)
  router.push('/workout')
}

const openRescheduleModule = event => {
  chosenEvent.value = event
  isRescheduleModal.value = true
}

const rescheduleEventHandler = () => userEvents.rescheduleEvent(chosenEvent, isFutureEventsMove)
</script>

<template>
  <div
    ref="dropdownList"
    class="events"
  >
    <ul
      v-if="events.length"
      class="events__list"
    >
      <li
        v-for="(event, index) in events"
        :key="event.id"
        class="events__item"
      >
        {{ event.title || 'without name' }}

        <div class="events__functions">
          <Button
            transparent
            class="events__button"
            :active="activeIndex === index"
            @click="toggleMenu(index)"
          >
            <span /><span /><span />
          </Button>
          <div
            class="user-dropdown__content"
            :class="{ 'user-menu__funcs--visible': activeIndex === index }"
            style="width: max-content"
          >
            <ul class="user-dropdown">
              <li
                class="user-dropdown__item"
                @click="openRescheduleModule(event)"
              >
                Reschedule an event
              </li>
              <li
                class="user-dropdown__item"
                @click="editEvent(event)"
              >
                Edit
              </li>
              <li
                class="user-dropdown__item"
                @click="deleteEvent(event.workoutId)"
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="events__empty"
    >
      <img
        src="/Box.webp"
        alt="There are no events"
        class="events__empty-img"
        width="335"
        height="240"
      >
      There are no events
    </div>
    <Modal
      v-if="isRescheduleModal"
      width="400px"
      @close="
        isRescheduleModal = false;
        isFutureEventsMove = false
      "
      @confirm='rescheduleEventHandler'
    >
      <template #modal-header>Reschedule event</template>
      <template #modal-body>
        <Alert sm>
          To move this event in the calendar for how many days. Positive value - forward, negative - backward. (from -30 to +30 days)
        </Alert>
        <form class="reschedule-form">
          <Input v-model.number="dateStore.rescheduleCounter" min='-30'/>
        </form>
      </template>
      <template #modal-footer>
        <Checkbox
          label="Move all future events"
          v-model="isFutureEventsMove"
        />
      </template>
    </Modal>
  </div>
</template>

<style scoped src="./style.css" />
