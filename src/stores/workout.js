import { defineStore } from 'pinia'
import { uid } from 'uid'

export const workoutStore = defineStore({
  id: 'workout',
  state: () => ({
    workoutId: localStorage.getItem('wId') || null,
    openedExerciseId: null,
    isWorkoutEdit: false,
    title: null,
    color: '213, 0, 0',
    weight: null,
    repeats: null,
    effort: 0,
    tonnage: 0,
    exercisesParamsCollection: [],
    previousResults: []
  }),
  actions: {
    addExerciseToWorkout(exerciseId) {
      if (!this.exercisesParamsCollection.includes(exerciseId)) {
        this.exercisesParamsCollection.push({
          exerciseId
        })
      }
    },
    deleteExercise(id) {
      const index = this.exercisesParamsCollection.findIndex(item => item.exerciseId === id);

      if (index !== -1) {
        this.exercisesParamsCollection.splice(index, 1)

        this.updateTonnage()
      }
    },
    addSet(exerciseId) {
      const set = {
        setId: uid(10),
        weight: this.weight,
        repeats: this.repeats,
        effort: this.effort
      }

      const exerciseParams = this.exercisesParamsCollection.find(item => item.exerciseId === exerciseId)

      if (!exerciseParams.sets) {
        exerciseParams.sets = [set]
        exerciseParams.setTonnage = set.weight * set.repeats

      } else {
        exerciseParams.sets.push(set);
        exerciseParams.setTonnage += set.weight * set.repeats;
      }

      this.updateTonnage()
    },
    deleteSet(setId) {
      const exerciseParams = this.exercisesParamsCollection.find(item => item.exerciseId === this.openedExerciseId);
      if (exerciseParams) {
        exerciseParams.sets = exerciseParams.sets.filter(set => set.setId !== setId);

        const tonnage = exerciseParams.sets.reduce((acc, curSet) => acc + (curSet.weight * curSet.repeats), 0);
        exerciseParams.setTonnage = tonnage;
      }

      this.updateTonnage()
    },
    editUsersEvent(event) {
      this.isWorkoutEdit = true

      this.workoutId = event.workoutId
      this.title = event.title
      this.color = event.color
      this.tonnage = event.tonnage
      this.exercisesParamsCollection = event.exercisesParamsCollection
    },
    getSetTonnage(id) {
      const exercise = this.exercisesParamsCollection.find(item => item.exerciseId === id);
      return exercise.setTonnage ? exercise.setTonnage : 0;
    },
    updateTonnage() {
      const sumTonnage = this.exercisesParamsCollection.reduce((acc, exerciseParams) => acc + (exerciseParams.setTonnage || 0), 0);

      this.tonnage = sumTonnage
    }
  }
})
