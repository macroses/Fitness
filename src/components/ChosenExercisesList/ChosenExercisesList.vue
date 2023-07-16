<script setup>
import { ref } from 'vue'
import { workoutStore } from '@/stores/workout'

const store = workoutStore()
const activeExerciseId = ref(null)

const toggleParameters = id => {
  activeExerciseId.value === id
    ? activeExerciseId.value = null
    : activeExerciseId.value = id

  store.effort = null
  store.weight = null
  store.repeats = null
}
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
      <div
        class="chosen-exercises__item-header"
        :class="{ active: activeExerciseId === exercise.id }"
        @click="toggleParameters(exercise.id)"
      >
        <div class="collapse__icon" />
        <div class="chosen-exercises__item-name">
          {{ exercise.name }}
        </div>
        <button
          @click="store.deleteExercise(exercise.id)"
          class="chosen-exercises__delete"
        />
      </div>
      <TransitionSlideY>
        <SetExerciseForm
          v-if="activeExerciseId === exercise.id"
          :exercise-id="exercise.id"
        />
      </TransitionSlideY>
    </li>
  </ul>
  <p
    v-else
    class="chosen-exercises__empty"
  >
    Add exercises
  </p>
</template>

<style src="./style.css" />
