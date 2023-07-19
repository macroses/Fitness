<script setup>
defineProps({
  events: {
    type: Array,
    default: () => [],
    required: true
  }
})

const emit = defineEmits(['deleteEvent'])
const deleteEvent = eventId => emit('deleteEvent', eventId)
</script>

<template>
  <div class="events">
    <ul
      v-if="events.length"
      class="events__list"
    >
      <li
        v-for="event in events"
        :key="event.id"
        class="events__item"
      >
        {{ event.title || 'without name' }}
        <button @click="deleteEvent(event.workoutId)">
          delete
        </button>
      </li>
    </ul>
    <div
      v-else
      class="events__empty"
    >
      Today there are no events
    </div>
  </div>
</template>

<style scoped src="./style.css" />
