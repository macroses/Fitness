import { uid } from 'uid'

const actions = {
  addExerciseToWorkout(exerciseId, exerciseName) {
    if (!this.exercisesParamsCollection.some(e => e.exerciseId === exerciseId)) {
      this.exercisesParamsCollection.push({
        exerciseId,
        exerciseName
      })
    }
  },
  deleteExercise(id) {
    const index = this.exercisesParamsCollection.findIndex(item => item.exerciseId === id)

    if (index !== -1) {
      this.exercisesParamsCollection.splice(index, 1)

      this.updateTonnage()
      this.updateRepeatsSum()
    }
  },
  addSet(exerciseId) {
    const set = {
      setId: uid(10),
      weight: this.weight || 0,
      repeats: this.repeats || 0,
      effort: this.effort
    }

    const exerciseParams = this.exercisesParamsCollection.find(
      item => item.exerciseId === exerciseId
    )

    if (!exerciseParams.sets) {
      exerciseParams.sets = [set]
      exerciseParams.setTonnage = set.weight * set.repeats
    } else {
      exerciseParams.sets.push(set)
      exerciseParams.setTonnage += set.weight * set.repeats
    }

    this.updateTonnage()
    this.updateRepeatsSum()
  },
  deleteSet(setId) {
    const exerciseParams = this.exercisesParamsCollection.find(item => item.exerciseId === this.openedExerciseId)
    if (exerciseParams) {
      exerciseParams.sets = exerciseParams.sets.filter(
        set => set.setId !== setId
      )

      const tonnage = exerciseParams.sets.reduce(
        (acc, curSet) => acc + curSet.weight * curSet.repeats,
        0
      )
      exerciseParams.setTonnage = tonnage
    }

    this.updateTonnage()
    this.updateRepeatsSum()
  },
  editUsersEvent(event, isTemporary) {
    this.isWorkoutEdit = !isTemporary;

    this.workoutId = event.workoutId
    this.title = event.title
    this.color = event.color
    this.tonnage = event.tonnage
    this.exercisesParamsCollection = event.exercisesParamsCollection
  },
  getSetTonnage(id) {
    const exercise = this.exercisesParamsCollection.find(item => item.exerciseId === id)
    return exercise.setTonnage ? exercise.setTonnage : 0
  },
  getSetRepeats(id) {
    const exercise = this.exercisesParamsCollection.find(item => item.exerciseId === id)

    return exercise.sets ? exercise.sets.reduce((acc, curSet) => acc + curSet.repeats, 0) : 0
  },
  updateTonnage() {
    this.tonnage = this.exercisesParamsCollection.reduce((acc, exerciseParams) => {
      return acc + (exerciseParams.setTonnage || 0)
    }, 0)
  },
  updateRepeatsSum() {
    this.repeatsSum = this.exercisesParamsCollection.reduce((acc, exerciseParams) => {
      return acc + (exerciseParams.sets ? exerciseParams.sets.reduce((acc, set) => acc + set.repeats, 0) : 0)
    }, 0)
  },
  mergeToSuperset(supersetsIdArray) {
    if (supersetsIdArray.value.length < 2) return

    const uidValue = uid(7)

    this.exercisesParamsCollection.forEach(exercise => {
      if (supersetsIdArray.value.includes(exercise.exerciseId)) {
        exercise.superset = uidValue
      }
    })

    supersetsIdArray.value = []
    this.isSuperset = false
  },
  splitToExercises(supersetId) {
    const exercisesToUpdate = this.exercisesParamsCollection.filter(
      exercise => exercise.superset === supersetId
    )

    exercisesToUpdate.forEach(exercise => {
      delete exercise.superset
    })
  },
  checkExercisesForSuperset(supersetIdCollection, exerciseId, isChecked) {
    if (isChecked) {
      if (!supersetIdCollection.value.some(ex => ex.id === exerciseId)) {
        supersetIdCollection.value.push(exerciseId)
      }
    } else {
      supersetIdCollection.value = supersetIdCollection.value.filter(
        exId => exId !== exerciseId
      )
    }
  }
}

export default actions