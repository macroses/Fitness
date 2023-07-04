<script setup>
import { computed, ref } from 'vue'
import BodySvg from '@/components/BodySvg/BodySvg.vue'
import { cacheExercises } from '@/composables/cacheExercises'

const dataExercises = ref([])
const loading = ref(false)

const uniqueMainMuscles = computed(() => {
  const mainMuscles = new Set(dataExercises.value.map(exercise => exercise.main_muscle))
  return Array.from(mainMuscles)
})

const filteredExercisesByMuscle = computed(() => uniqueMainMuscles.value.map(muscle => ({
  muscle,
  exercises: dataExercises.value.filter(exercise => exercise.main_muscle === muscle)
})))

cacheExercises(loading, dataExercises)
</script>

<template>
  <BodySvg
    body-part="chest"
    :secondary-part="['forearms', 'glutes']"
  />

  <ul class="muscles">
    <li
      v-for="item in filteredExercisesByMuscle"
      :key="item.muscle"
      class="muscles__item"
    >
      {{ item.muscle }}
      <ul class="muscle-exercises">
        <li
          v-for="exercise in item.exercises"
          :key="exercise.id"
          class="muscle-exercises__item"
        >
          {{ exercise.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped src="./style.css"></style>
