const getters = {
  supersetsArray() {
    const exercises = JSON.parse(JSON.stringify(this.exercisesParamsCollection))
    const cache = JSON.parse(localStorage.getItem('exercisesCache'))

    return exercises.reduce((supersetGroups, exercise) => {
      const { superset } = exercise
      if (superset) {
        const cachedExercise = cache.find(
          sessionExercise => sessionExercise.id === exercise.exerciseId
        )

        if (cachedExercise) {
          const cachedExerciseCopy = { ...cachedExercise, superset }
          const groupIndex = supersetGroups.findIndex(
            group => group.superset === superset
          )

          groupIndex !== -1
            ? supersetGroups[groupIndex].exercises.push(cachedExerciseCopy)
            : supersetGroups.push({
              superset,
              exercises: [cachedExerciseCopy]
            })
        }
      }

      return supersetGroups
    }, [])
  },
  filteredCacheExercises() {
    return JSON.parse(localStorage.getItem('exercisesCache')).filter(
      sessionExercise => this.exercisesParamsCollection.some(
        exercise => sessionExercise.id === exercise.exerciseId && !exercise.hasOwnProperty('superset')
      )
    )
  }
}

export default getters
