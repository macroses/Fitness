import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const workoutStore = defineStore({
  id: 'workout',
  state: () => ({
    isWorkoutMode: false,
    title: null,
    labelColor: '246, 191, 38',
    date: dayjs(),
    exercises: []
  }),
  actions: {
    addExerciseToWorkout(exerciseId) {
      if (!this.exercises.includes(exerciseId)) {
        this.exercises.push(exerciseId)
      }
    },
    deleteExercise(id) {
      this.exercises = this.exercises.filter(exercise => exercise.id !== id)
    }
  }
})
