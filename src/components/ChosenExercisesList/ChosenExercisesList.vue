<script setup>
import { ref } from 'vue'
import { uid } from 'uid'
import Input from '@/components/UI/Input/Input.vue'
import { workoutStore } from '@/stores/workout'
import Button from '@/components/UI/Button/Button.vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers'

const store = workoutStore()
const parametersVisibility = ref({})
const weight = ref(null)
const repeats = ref(null)
const loadType = ref(null)

const toggleParameters = id => parametersVisibility.value[id] = !parametersVisibility.value[id]
const isParametersVisible = id => parametersVisibility.value[id]

// todo: в тренировку входит, id тренировки, id пользователя, название, дата, цвет, массив упражнений, тоннаж упражнений
// todo: в массив упражнений входят объекты упражнений
// todo: каждый объект содержит id упражнения, и массив подходов
// todo: каждый массив подходов содержит объекты подходов
// todo: каждый объект подходов содержит id подхода, вес, кол-во повторов, сложность подхода
const addSet = exerciseId => {
  const set = {
    setId: uid(10),
    exerciseId,
    weight: weight.value,
    repeats: repeats.value,
    loadType: loadType.value,
    tonnage: weight.value * repeats.value
  }

  console.log(set)
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
            v-model.number="weight"
            label-fade
            label-placeholder="Weight"
            @clear="weight = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Input
            v-model.number="repeats"
            label-fade
            label-placeholder="Repeats"
            @clear="repeats = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Button @click="addSet(exercise.id)">
            +
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

<style scoped src="./style.css" />
