import { defineStore } from 'pinia'
import { ref } from 'vue'
import { deleteEvent, getWorkouts, pushEvent, updateEvent } from '@/composables/workouts'
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
    if (!workoutData.workoutId) return

    const workoutObject = {
      title: workoutData.title,
      color: workoutData.color,
      date: dateStore.date,
      workoutId: workoutData.workoutId,
      exercisesParamsCollection: workoutData.exercisesParamsCollection
    }

    await pushEvent(workoutObject)
    events.value.push(workoutObject)
  }

  const updateEventHandler = async () => {
    const workoutObject = {
      title: workoutData.title,
      color: workoutData.color,
      date: dateStore.date,
      exercisesParamsCollection: workoutData.exercisesParamsCollection
    }

    await updateEvent(
      'workouts',
      'workoutId',
      workoutData.workoutId,
      workoutObject,
      eventsLoading
    )

    const index = events.value.findIndex(event => event.workoutId === workoutData.workoutId)

    if (index !== -1) {
      events.value.splice(index, 1, workoutObject)
    }
  }

  return {
    events,
    eventsLoading,
    fetchEventHandler,
    deleteEventHandler,
    pushEventHandler,
    updateEventHandler
  }
})
