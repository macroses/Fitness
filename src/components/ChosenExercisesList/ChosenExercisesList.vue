<script setup>
import { reactive, readonly, ref } from 'vue'
import Input from '@/components/UI/Input/Input.vue'
import { workoutStore } from '@/stores/workout'
import Button from '@/components/UI/Button/Button.vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers'

const store = workoutStore()
const activeExerciseId = ref(null)

const paramsSets = reactive({
  weight: null,
  repeats: null,
  effort: null
})

const toggleParameters = id => {
  activeExerciseId.value === id
    ? activeExerciseId.value = null
    : activeExerciseId.value = id

  paramsSets.effort = null
}

const addSetHandler = exerciseId => {
  store.addSet(exerciseId, paramsSets)
  paramsSets.weight = null
  paramsSets.repeats = null
}

const getExerciseSets = exerciseId => {
  const exerciseParams = store.exercisesParamsCollection.find(item => item.exerciseId === exerciseId);
  return exerciseParams ? exerciseParams.sets : [];
}

const addEffortType = effortId => paramsSets.effort = effortId

const efforts = readonly([
  { id: 0, text: 'Warm-up', color: '#ececec' },
  { id: 1, text: 'Low', color: '#d0ffad' },
  { id: 2, text: 'Med', color: '#ffe38c' },
  { id: 3, text: 'High', color: '#f9b5b5' },
  { id: 4, text: 'Max', color: '#ff7d7d' }
])
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
      <div
        v-if="activeExerciseId === exercise.id"
        class="chosen-exercises__parameters"
      >
        <div class="chosen-exercises__sets">
          <ul v-if="getExerciseSets(exercise.id).length">
            <li
              v-for="set in getExerciseSets(exercise.id)"
              :key="set.setId"
            >
              {{ set }}
            </li>
          </ul>
        </div>
        <div class="group">
          <Input
            v-model.number="paramsSets.weight"
            label-fade
            label-placeholder="Weight"
            @clear="paramsSets.weight = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Input
            v-model.number="paramsSets.repeats"
            label-fade
            label-placeholder="Repeats"
            @clear="paramsSets.repeats = null"
            @keydown="useOnlyNumbers($event)"
          />
        </div>
        <div class="group">
          <div class="chosen-exercises__effort">
            <button
              v-for="(effort, index) in efforts"
              :key="effort.id"
              class="button__effort-type"
              :class="{ active: index === paramsSets.effort }"
              :style="{ backgroundColor: effort.color }"
              @click="addEffortType(effort.id)"
            >
              {{ effort.text }}
            </button>
          </div>
          <Button
            class="chosen-exercises__add"
            @click="addSetHandler(exercise.id)"
          >
            <Icon
              icon-name="plus"
              width="20px"
            />
          </Button>
        </div>
        <div class="chosen-exercises__load" />
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

<style src="./style.css" />
