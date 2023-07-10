<script setup>
import { computed, ref } from 'vue'
import { cacheExercises } from '@/composables/cacheExercises'
import { exerciseStore } from '@/stores/exercise'
import Input from '@/components/UI/Input/Input.vue'

const exercisesStore = exerciseStore()

const dataExercises = ref([])
const loading = ref(false)
const activeMuscle = ref(null)
const search = ref(null)

const uniqueMainMuscles = computed(() => {
  const mainMuscles = new Set(dataExercises.value.map(exercise => exercise.main_muscle))
  return Array.from(mainMuscles)
})

const filteredExercisesByMuscle = computed(() => uniqueMainMuscles.value.map(muscle => ({
  muscle,
  exercises: dataExercises.value.filter(exercise => exercise.main_muscle === muscle)
})))

cacheExercises(loading, dataExercises)

const selectMuscle = index => {
  activeMuscle.value === index ? (activeMuscle.value = null) : (activeMuscle.value = index)
}

const showExercise = exercise => (exercisesStore.exercise = exercise)
</script>

<template>
  <Loading
    v-if="loading"
    large
    style="height: 240px"
  />
  <div
    v-else
    class="exercises-list"
  >
    <Input
      v-model="search"
      :value="search"
      label-placeholder="Find exercise"
    />
    <ul class="muscles">
      <li
        v-for="(item, index) in filteredExercisesByMuscle"
        :key="item.muscle"
        class="muscles__item"
        :class="{ active: activeMuscle === index }"
      >
        <div
          class="muscles__item-header"
          @click="selectMuscle(index)"
        >
          {{ item.muscle }}
          <div class="muscle__item-length">
            {{ item.exercises.length }}
            <div class="muscles__item-img" />
          </div>
          <div class="collapse__icon" />
        </div>

        <div class="exercises-wr">
          <ul class="exercises">
            <li
              v-for="exercise in item.exercises"
              :key="exercise.id"
              class="exercises__item"
              @click="showExercise(exercise)"
            >
              {{ exercise.name }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style src="./style.css"></style>
