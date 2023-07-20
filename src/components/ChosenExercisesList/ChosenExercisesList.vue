<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
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
  <draggable
    v-if="store.exercises.length"
    v-model="store.exercises"
    tag="ul"
    :animation="300"
    :item-key="item => item.id"
  >
    <template #item="{ element }">
      <li
        class="chosen-exercises__item"
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
