import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { deleteEvent, getWorkouts, pushEvent, updateEvent, updateSeveralRows } from '@/composables/workouts'
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
      exercisesParamsCollection: workoutData.exercisesParamsCollection,
      tonnage: workoutData.tonnage,
      supersets: workoutData.supersets
    }

    await pushEvent('workouts', workoutObject, eventsLoading)
    events.value.push(workoutObject)
  }

  const updateEventHandler = async () => {
    const workoutObject = {
      title: workoutData.title,
      color: workoutData.color,
      date: dateStore.date,
      exercisesParamsCollection: workoutData.exercisesParamsCollection,
      tonnage: workoutData.tonnage,
      supersets: workoutData.supersets
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

  const updateAllEvents = async () => {
    await updateSeveralRows('workouts', events, eventsLoading)
  }

  const getExerciseSets = () => {
    const exerciseParams = workoutData.exercisesParamsCollection.find(item => item.exerciseId === workoutData.openedExerciseId)
    return exerciseParams ? exerciseParams.sets : []
  }

  const previousResults = computed(() => {
    const userWorkouts = events.value.filter(workout => workout.date < dateStore.date)

    const previousSets = []
    for (const workout of userWorkouts.reverse()) {
      const exerciseParams = workout.exercisesParamsCollection.find(item => item.exerciseId === workoutData.openedExerciseId)

      if (exerciseParams && exerciseParams.sets.length > 0) {
        previousSets.push(...exerciseParams.sets)
        break
      }
    }

    return previousSets
  })

  // Новое вычисляемое свойство для получения комбинированных результатов
  const combinedResults = computed(() => {
    const previous = previousResults.value.slice()
    const exerciseSets = getExerciseSets()

    const combined = exerciseSets.map((set, index) => {
      const prevSet = previous[index] || {}

      return {
        setId: set.setId,
        weight: set.weight,
        repeats: set.repeats,
        effort: set.effort,
        prevWeight: prevSet.weight ?? null,
        prevRepeats: prevSet.repeats ?? null,
        prevEffort: prevSet.effort ?? null
      }
    })

    combined.push(
      ...previous
        .slice(exerciseSets.length)
        .map(prevSet => ({
          setId: null,
          weight: null,
          repeats: null,
          effort: null,
          prevWeight: prevSet.weight,
          prevRepeats: prevSet.repeats,
          prevEffort: prevSet.effort
        }))
    )

    return combined
  })

  const rescheduleEvent = async (chosenEvent, isFutureEventsMove) => {
    if (isFutureEventsMove.value) {
      const eventsToUpdate = events.value.filter(event => event.date >= dateStore.date)

      eventsToUpdate.forEach(event => {
        event.date = event.date.add(dateStore.rescheduleCounter, 'day')
      })

      await updateAllEvents()

      return
    }
    workoutData.editUsersEvent(chosenEvent.value)
    dateStore.date = dateStore.rescheduledEventDate
    await updateEventHandler()
    workoutData.$reset()
  }

  return {
    events,
    eventsLoading,
    fetchEventHandler,
    deleteEventHandler,
    pushEventHandler,
    updateEventHandler,
    combinedResults,
    updateAllEvents,
    rescheduleEvent
  }
})
