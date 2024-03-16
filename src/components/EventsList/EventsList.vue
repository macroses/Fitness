<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { workoutStore } from '@/stores/modules/workout'
import router from '@/router'
import { chosenDateStore } from '@/stores/chosenDate'
import { useEventsStore } from '@/stores/modules/userEvents/userEvents'
// import ConfirmDialog from '@/components/ConfirmModal/ConfirmDialog'

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
const isReadModal = ref(false)
const readableEvent = ref(null)
const confirmDialog = ref(null)

const chosenEvent = ref(null)

const eventToDelete = ref(null)

const showConfirmDialog = (event) => {
  eventToDelete.value = event
  confirmDialog.value?.show()
}

const confirmDelete = () => {
  if (eventToDelete.value) {
    emit('deleteEvent', eventToDelete.value.workoutId)
    eventToDelete.value = null
  }
}

const activeIndex = ref(null)
const dropdownList = ref(null)

const toggleMenu = index => (activeIndex.value = activeIndex.value === index ? null : index)

onClickOutside(dropdownList, () => (activeIndex.value = null))

const editEvent = event => {
  workoutsStore.editUsersEvent(event)
  router.push('/workout')
}

const openRescheduleModule = event => {
  chosenEvent.value = event
  isRescheduleModal.value = true
}

const rescheduleEventHandler = () => userEvents.rescheduleEvent(chosenEvent, isFutureEventsMove)

const copyEventHandler = event => {
  userEvents.isCopyMode = true
  userEvents.copyObject = event
}

const readEventModal = event => {
  isReadModal.value = true
  readableEvent.value = event
}

const closeReadModal = () => {
  isReadModal.value = false
  readableEvent.value = null
  workoutsStore.openedExerciseId = null
}

const rescheduleModalClose = () => {
  isRescheduleModal.value = false
  isFutureEventsMove.value = false
}
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
        @click.self="readEventModal(event)"
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
            style="width: 240px"
          >
            <ul class="user-dropdown">
              <li
                class="user-dropdown__item"
                @click="copyEventHandler(event)"
              >
                Copy an event
              </li>
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
                @click="showConfirmDialog(event)"
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <Modal
      v-if="isRescheduleModal"
      width="400px"
      @close="rescheduleModalClose"
      @confirm="rescheduleEventHandler"
      confirm-label="Reschedule"
    >
      <template #modal-header> Reschedule event </template>
      <template #modal-body>
        <Alert sm>
          To move this event in the calendar for how many days. Positive value -
          forward, negative - backward. (from -30 to +30 days)
        </Alert>
        <form class="reschedule-form">
          <Input
            v-model.number="dateStore.rescheduleCounter"
            @clear="dateStore.rescheduleCounter = 0"
          />
        </form>
      </template>
      <template #modal-footer>
        <Checkbox
          label="Move all future events"
          v-model="isFutureEventsMove"
        />
      </template>
    </Modal>
    <ReadModal
      v-if="isReadModal"
      :readable-event="readableEvent"
      @toEditPage="editEvent"
      @closeReadModal="closeReadModal"
    />
  </div>
  <ConfirmDialog
    ref="confirmDialog"
    showCancel
    @confirm="confirmDelete"
    confirm-text="Delete"
  >
    <template #confirmMessage>
      Are you sure you want to delete <b>{{ eventToDelete?.title }}</b> event?
    </template>
  </ConfirmDialog>
</template>

<style scoped src="./style.css" />
