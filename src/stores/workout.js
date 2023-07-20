import { defineStore } from 'pinia'
import { uid } from 'uid'

export const workoutStore = defineStore({
  id: 'workout',
  state: () => ({
    workoutId: localStorage.getItem('wId') || null,
    title: null,
    labelColor: '213, 0, 0',
    weight: null,
    repeats: null,
    effort: null,
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
    addSet(exerciseId) {
      const set = {
        setId: uid(10),
        weight: this.weight,
        repeats: this.repeats,
        effort: this.effort
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
    },
    deleteSet(exerciseId, setId) {
      const exerciseParams = this.exercisesParamsCollection.find(item => item.exerciseId === exerciseId);
      if (exerciseParams) {
        exerciseParams.sets = exerciseParams.sets.filter(set => set.setId !== setId);
      }
    }
  }
})
