<script setup>
import { ref } from 'vue'
import { workoutStore } from '@/stores/workout'
import Input from '@/components/UI/Input/Input.vue'

const store = workoutStore()
const parametersVisibility = ref({})

const toggleParameters = id => parametersVisibility.value[id] = !parametersVisibility.value[id]
const isParametersVisible = id => parametersVisibility.value[id]

// todo: в тренировку входит, id тренировки, id пользователя, название, дата, цвет, массив упражнений, тоннаж упражнений
// todo: в массив упражнений входят объекты упражнений
// todo: каждый объект содержит id упражнения, и массив подходов
// todo: каждый массив подходов содержит объекты подходов
// todo: каждый объект подходов содержит id подхода, вес, кол-во повторов, сложность подхода
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
        v-if="isParametersVisible(exercise.id)"
        class="chosen-exercises__parameters"
      >
        <div class="group">
          <Input
            label-fade
            label-placeholder="Weight"
          />
          <Input
            label-fade
            label-placeholder="Repeats"
          />
        </div>
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
