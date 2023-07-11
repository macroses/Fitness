<script setup>
import { computed, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { exerciseStore } from '@/stores/exercise'
import SearchExercises from '@/components/SearchExercises/SearchExercises.vue'
import Exercises from '@/components/ExercisesList/Exercises/Exercises.vue'
import MuscleItemHeader from '@/components/ExercisesList/MuscleItemHeader/MuscleItemHeader.vue'

const exercisesStore = exerciseStore()

const activeMuscle = ref(null)
const sessionExercises = ref(JSON.parse(sessionStorage.getItem('exercisesCache')))
const muscles = ref(null)

const uniqueMainMuscles = computed(() => {
  const mainMuscles = new Set(sessionExercises.value.map(exercise => exercise.main_muscle))
  return Array.from(mainMuscles)
})

const filteredExercisesByMuscle = computed(() => uniqueMainMuscles.value.map(muscle => ({
  muscle,
  exercises: sessionExercises.value.filter(exercise => exercise.main_muscle === muscle)
})))

const selectMuscle = index => activeMuscle.value = activeMuscle.value === index ? null : index

const showExercise = exercise => exercisesStore.exercise = exercise

onMounted(() => {
  gsap.from(muscles.value.children, {
    delay: 0.3,
    duration: 1,
    autoAlpha: 0,
    stagger: 0.1,
    y: '-20',
    ease: 'back.out(1.7)'
  })
})
</script>

<template>
  <div class="exercises-list">
    <SearchExercises />

    <ul
      ref="muscles"
      class="muscles"
    >
      <li
        v-for="(item, index) in filteredExercisesByMuscle"
        :key="item.muscle"
        class="muscles__item"
        :class="{ active: activeMuscle === index }"
      >
        <MuscleItemHeader
          :muscle-item="item"
          @click="selectMuscle(index)"
        />
        <Exercises
          :exercises="item.exercises"
          @showChosenExercises="showExercise"
        />
      </li>
    </ul>
  </div>
</template>

<style src="./style.css"></style>
