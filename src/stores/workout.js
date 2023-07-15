import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { uid } from 'uid'

export const workoutStore = defineStore({
  id: 'workout',
  state: () => ({
    userId: null,
    workoutId: null,
    title: null,
    labelColor: '246, 191, 38',
    date: dayjs(),
    exercises: [],
    exercisesParamsCollection: []
  }),
  actions: {
    addExerciseToWorkout(exerciseId) {
      if (!this.exercises.includes(exerciseId)) {
        this.exercises.push(exerciseId)
      }
    },
    deleteExercise(id) {
      this.exercises = this.exercises.filter(exercise => exercise.id !== id)
    },
    addSet(exerciseId, paramsSets) {
      const set = {
        setId: uid(10),
        ...paramsSets
      }

      const existingIndex = this.exercisesParamsCollection.findIndex(item => item.exerciseId === exerciseId)

      if (existingIndex === -1) {
        const newExerciseParams = {
          exerciseId,
          sets: [set]
        }

        this.exercisesParamsCollection.push(newExerciseParams)
      } else {
        this.exercisesParamsCollection[existingIndex].sets.push(set)
      }
    }
  }
})
