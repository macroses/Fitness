import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProfileColumn, updateProfile } from '@/composables/profile.js'

export const userExercisesStore = defineStore('userExercises', () => {
  const exercises = ref([])
  const exercisesLoading = ref(false)

  const fetchExercises = async () => {
    await getProfileColumn(
      exercises,
      exercisesLoading,
      'user_exercises'
    )
  }

  const pushExerciseToBase = async (isLoading, exercise) => {
    exercises.value.push(exercise)

    await updateProfile(
      null,
      isLoading,
      'user_exercises',
      exercises.value
    )
  }

  const deleteExerciseFromBase = async (exerciseId, isLoading) => {
    exercises.value = exercises.value.filter(exercise => exercise.id !== exerciseId)

    await updateProfile(
      null,
      isLoading,
      'user_exercises',
      exercises.value
    )
  }

  return {
    exercises,
    fetchExercises,
    pushExerciseToBase,
    deleteExerciseFromBase
  }
})