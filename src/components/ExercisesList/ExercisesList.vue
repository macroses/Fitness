<script setup>
import { computed, onMounted, ref } from 'vue'
import { getCollection } from '@/composables/getCollection'

const dataExercises = ref([])
const loading = ref(false)

const uniqueMainMuscles = computed(() => {
  const mainMuscles = new Set(dataExercises.value.map((exercise) => exercise.main_muscle))
  return Array.from(mainMuscles)
})

const filteredExercisesByMuscle = computed(() => {
  return uniqueMainMuscles.value.map((muscle) => {
    return {
      muscle,
      exercises: dataExercises.value.filter((exercise) => exercise.main_muscle === muscle)
    }
  })
})

// вывести те упражнения, в которых поле main_muscle соответствует одному из значений массива uniqueMainMuscle

onMounted(async () => {
  await getCollection('exercises', '*', loading, dataExercises)
  console.log(uniqueMainMuscles.value)
})
</script>

<template>
  <ul class="muscles">
    <li v-for="item in filteredExercisesByMuscle" :key="item.muscle" class="muscles__item">
      {{ item.muscle }}
      <ul class="muscle-exercises">
        <li v-for="exercise in item.exercises" :key="exercise.id" class="muscle-exercises__item">
          {{ exercise.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped src="./style.css"></style>
