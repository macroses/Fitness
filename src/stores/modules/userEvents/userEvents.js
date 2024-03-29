import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { uid } from 'uid'
import { deleteEvent, getWorkouts, pushEvent, updateEvent, updateSeveralRows } from '@/api/workouts.js'
import { workoutStore } from '@/stores/modules/workout/index.js'
import { chosenDateStore } from '@/stores/chosenDate.js'
import { getProfileColumn } from '@/api/profile.js'

export const useEventsStore = defineStore('userEvents', () => {
  const events = ref([])
  const favoritesFromBase = ref([])
  const eventsLoading = ref(false)
  const copyObject = ref(null)
  const isCopyMode = ref(false)
  const workoutData = workoutStore()
  const dateStore = chosenDateStore()
  const exerciseId = ref(null)

  const fetchEventHandler = async () => {
    await getWorkouts(events, eventsLoading)
    await getProfileColumn(
      favoritesFromBase,
      eventsLoading,
      'favorite_exercises'
    )

    if (favoritesFromBase.value === null) {
      favoritesFromBase.value = []
    }
  }

  const deleteEventHandler = async (tableName, columnName, id) => {
    await deleteEvent(tableName, columnName, id, eventsLoading)
    events.value = events.value.filter((event) => event.workoutId !== id)
  }

  const pushEventHandler = async (temporaryWorkout) => {
    if (temporaryWorkout) {
      await pushEvent("workouts", temporaryWorkout, eventsLoading)
      events.value.push(temporaryWorkout)
    }

    let workoutObject = {}

    if (copyObject.value) {
      const { title, color, exercisesParamsCollection, tonnage, repeatsSum } = copyObject.value

      workoutObject = {
        workoutId: uid(50),
        date: dateStore.copyDate,
        title,
        color,
        exercisesParamsCollection,
        tonnage,
        repeatsSum
      }

      await pushEvent("workouts", workoutObject, eventsLoading)

      events.value.push(workoutObject)

      return
    }

    if (!workoutData.workoutId) return

    workoutObject = {
      title: workoutData.title,
      color: workoutData.color,
      date: dateStore.date,
      workoutId: workoutData.workoutId,
      exercisesParamsCollection: workoutData.exercisesParamsCollection,
      tonnage: workoutData.tonnage,
      repeatsSum: workoutData.repeatsSum,
    }

    await pushEvent("workouts", workoutObject, eventsLoading)

    events.value.push(workoutObject)
  }

  const updateEventHandler = async () => {
    const workoutObject = {
      title: workoutData.title,
      color: workoutData.color,
      date: dateStore.date,
      exercisesParamsCollection: workoutData.exercisesParamsCollection,
      tonnage: workoutData.tonnage,
      repeatsSum: workoutData.repeatsSum,
    }

    await updateEvent(
      "workouts",
      "workoutId",
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
    await updateSeveralRows("workouts", events, eventsLoading)
  }

  const getMaxTonnage = () => Math.max(...events.value.map(el => el.tonnage / 1000))
  const getMaxRepeats = () => Math.max(...events.value.map(el => el.repeatsSum))

  const getExerciseSets = () => {
    const exerciseParams = workoutData.exercisesParamsCollection.find(
      (item) => item.exerciseId === workoutData.openedExerciseId
    )
    return exerciseParams
      ? exerciseParams.sets
        ? exerciseParams.sets
        : []
      : []
  }

  const previousResults = computed(() => {
    const userWorkouts = events.value.filter(workout => {
      const workoutDate = new Date(workout.date)
      const storeDate = new Date(dateStore.date)
      return workoutDate.getDate() < storeDate.getDate()
    })

    const previousSets = []

    for (const workout of userWorkouts) {
      const exerciseParams = workout.exercisesParamsCollection.find(item => item.exerciseId === workoutData.openedExerciseId)

      if (exerciseParams && exerciseParams.sets?.length > 0) {
        previousSets.push(...exerciseParams.sets)
        break
      }
    }

    if (userWorkouts.at(-1).date.isSame(dateStore.date, 'day')) {
      previousSets.pop()
    }

    return previousSets
  })

  const getTotalPreviousRepeats = computed(() => {
    const previousSets = previousResults.value.slice()
    if (previousSets.length === 0) {
      return 0
    }

    const totalRepeats = previousSets.reduce((total, set) => total + set.repeats, 0)

    return totalRepeats
  })

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
        prevEffort: prevSet.effort ?? null,
      }
    })

    combined.push(...previous.slice(exerciseSets.length).map((prevSet) => ({
        setId: null,
        weight: null,
        repeats: null,
        effort: null,
        prevWeight: prevSet.weight,
        prevRepeats: prevSet.repeats,
        prevEffort: prevSet.effort,
      }))
    )

    return combined
  })

  const rescheduleEvent = async (chosenEvent, isFutureEventsMove) => {
    if (isFutureEventsMove.value) {
      const eventsToUpdate = events.value.filter(
        (event) => event.date >= dateStore.date
      )

      eventsToUpdate.forEach((event) => {
        event.date = event.date.add(dateStore.rescheduleCounter, "day")
      })

      await updateAllEvents()

      return
    }
    workoutData.editUsersEvent(chosenEvent.value)
    dateStore.date = dateStore.rescheduledEventDate
    await updateEventHandler()
    workoutData.$reset()
  }

  // высчитывает дату и тоннаж за всю историю упражнения для графика
  const exerciseHistory = computed(() => {
    const history = []

    if (exerciseId.value) {
      events.value.forEach((event) => {
        const exercises = event.exercisesParamsCollection.reduce((acc, exercise) => {
          if (exercise.exerciseId === exerciseId.value) {
            const sets = exercise.sets || []
            const totalRepeats = sets.reduce((total, set) => total + set.repeats, 0)

            acc.push({
              date: event.date,
              weight: exercise.setTonnage ?? 0,
              repeats: totalRepeats ?? 0
            })
          }

          return acc
        }, [])

        history.push(...exercises)
      })
    }

    return history.sort((a, b) => a.date - b.date)
  })

  watch(
    () => dateStore.copyDate,
    async (val) => {
      if (val) {
        // if copyDate and copyObject is defined and filled
        await pushEventHandler()
        copyObject.value = null
        isCopyMode.value = false
        dateStore.copyDate = null
      }
    }
  )

  watch(
    () => isCopyMode.value,
    async (val) => {
      if (!val) {
        copyObject.value = null
        isCopyMode.value = false
        dateStore.copyDate = null
      }
    }
  )

  return {
    events,
    favoritesFromBase,
    eventsLoading,
    copyObject,
    isCopyMode,
    exerciseId,
    fetchEventHandler,
    deleteEventHandler,
    pushEventHandler,
    updateEventHandler,
    previousResults,
    getTotalPreviousRepeats,
    combinedResults,
    updateAllEvents,
    rescheduleEvent,
    exerciseHistory,
    getMaxTonnage,
    getMaxRepeats,
  }
})
