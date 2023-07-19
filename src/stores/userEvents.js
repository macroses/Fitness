import { defineStore } from 'pinia'
import { ref } from 'vue'
import { deleteEvent, getWorkouts, pushEvent } from '@/composables/workouts'
import { workoutStore } from '@/stores/workout'
import { chosenDateStore } from '@/stores/chosenDate'

export const useEventsStore = defineStore('userEvents', () => {
  const events = ref([])
  const eventsLoading = ref(false)
  const workoutData = workoutStore()
  const dateStore = chosenDateStore()

  const fetchEventHandler = async () => {
    await getWorkouts(events, eventsLoading)
  }

  const deleteEventHandler = async (tableName, columnName, id) => {
    await deleteEvent(tableName, columnName, id, eventsLoading)
    events.value = events.value.filter(event => event.workoutId !== id)
  }

  const pushEventHandler = async () => {
    const workoutObject = {
      title: workoutData.title,
      color: workoutData.labelColor,
      date: dateStore.date,
      workoutId: workoutData.workoutId,
      exercisesParamsCollection: workoutData.exercisesParamsCollection
    }

    await pushEvent(workoutObject)
    events.value.push(workoutObject)
  }

  return {
    events,
    eventsLoading,
    fetchEventHandler,
    deleteEventHandler,
    pushEventHandler
  }
})
