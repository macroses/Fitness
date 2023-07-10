<script setup>
import { computed } from 'vue'
import { workoutStore } from '@/stores/workout'

const store = workoutStore()

const showExercisesByChosenId = computed(() => {
  const sessionExercises = JSON.parse(sessionStorage.getItem('exercisesCache'))
  return sessionExercises.filter(exercise => store.exercises.includes(exercise.id))
})
</script>

<template>
  <ul class="chosen-exercises">
    <li
      v-for="exercise in showExercisesByChosenId"
      :key="exercise.id"
      class="chosen-exercises__item"
    >
      {{ exercise.name }}
    </li>
  </ul>
</template>

<style scoped src="./style.css" />
