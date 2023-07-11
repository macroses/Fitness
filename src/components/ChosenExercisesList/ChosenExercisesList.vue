<script setup>
import { workoutStore } from '@/stores/workout'
import ButtonClose from '@/components/UI/ButtonClose/ButtonClose.vue'

const store = workoutStore()
</script>

<template>
  <ul
    v-if="store.exercises.length"
    class="chosen-exercises"
  >
    <li
      v-for="exercise in store.exercises"
      :key="exercise.id"
      class="chosen-exercises__item"
    >
      {{ exercise.name }}
      <ButtonClose
        @click="store.deleteExercise(exercise.id)"
        class="chosen-exercises__delete"
      />
    </li>
  </ul>
  <p
    v-else
    class="chosen-exercises__empty"
  >
    Add exercises
  </p>
</template>

<style scoped src="./style.css" />
