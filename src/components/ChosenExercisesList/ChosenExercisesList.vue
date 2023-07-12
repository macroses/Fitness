<script setup>
import { workoutStore } from '@/stores/workout'

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
      <div class='chosen-exercises__item-header'>
        <div class="collapse__icon"></div>
        <div class='chosen-exercises__item-name'>
          {{ exercise.name }}
        </div>
        <button
          @click="store.deleteExercise(exercise.id)"
          class="chosen-exercises__delete"
        />
      </div>
      <div class='chosen-exercises__parameters'>

      </div>
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
