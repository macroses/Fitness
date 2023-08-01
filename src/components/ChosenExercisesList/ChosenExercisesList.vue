<script setup>
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { workoutStore } from '@/stores/workout'

const store = workoutStore()
const activeExerciseId = ref(null)

const toggleParameters = id => {
  activeExerciseId.value === id
    ? activeExerciseId.value = null
    : activeExerciseId.value = id

  store.effort = 0
  store.weight = null
  store.repeats = null

  store.openedExerciseId = activeExerciseId.value
}

const filteredCacheExercises = computed(() => {
  const cache = JSON.parse(sessionStorage.getItem('exercisesCache'))
  return cache.filter(sessionExercise => store.exercisesParamsCollection.some(exercise => {
    return sessionExercise.id === exercise.exerciseId
  }))
})
</script>

<template>
  <draggable
    v-if="filteredCacheExercises.length"
    v-model="filteredCacheExercises"
    tag="ul"
    handle=".chosen-exercises__item-header"
    :animation="300"
    :item-key="item => item.id"
  >
    <template #item="{ element }">
      <li
        class="chosen-exercises__item"
        tabindex="0"
      >
        <div
          class="chosen-exercises__item-header"
          :class="{ active: activeExerciseId === element.id }"
          @click="toggleParameters(element.id)"
        >
          <div class="collapse__icon" />
          <div class="chosen-exercises__item-name">
            {{ element.name }}
          </div>
          <div class="chosen-exercises__item-tonnage">
            {{ store.getSetTonnage(element.id) / 1000 }} T
          </div>
          <button
            @click="store.deleteExercise(element.id)"
            class="chosen-exercises__delete"
          />
        </div>
        <TransitionSlideY>
          <SetExerciseForm
            v-if="activeExerciseId === element.id"
            :exercise-id="element.id"
          />
        </TransitionSlideY>
      </li>
    </template>
  </draggable>
  <div
    v-else
    class="chosen-exercises__empty"
  >
    <div class="chosen-exercises__img-wr">
      <img
        src="/Folder.svg"
        alt="add exercises"
        width="100"
        height="100"
      >
    </div>
    <span>Add exercises</span>
  </div>
</template>

<style src="./style.css" />
