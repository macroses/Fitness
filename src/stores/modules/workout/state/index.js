const state = () => ({
  workoutId: localStorage.getItem('wId') || null,
  openedExerciseId: null,
  isWorkoutEdit: false,
  isSuperset: false,
  title: null,
  color: '213, 0, 0',
  weight: null,
  repeats: null,
  repeatsSum: 0,
  effort: 0,
  tonnage: 0,
  exercisesParamsCollection: [],
  previousResults: []
})

export default state