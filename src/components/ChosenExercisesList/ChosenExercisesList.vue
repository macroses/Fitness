<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { workoutStore } from '@/stores/workout'
import Checkbox from '@/components/UI/Checkbox/Checkbox.vue'

const props = defineProps({
  isSuperset: {
    type: Boolean,
    default: false
  }
})

const store = workoutStore()
const activeExerciseId = ref(null)
const supersetExercises = ref([])

const toggleParameters = id => {
  activeExerciseId.value === id
    ? activeExerciseId.value = null
    : activeExerciseId.value = id

  store.effort = 0
  store.weight = null
  store.repeats = null
  store.openedExerciseId = activeExerciseId.value
}

const handleCheckboxChange = (exerciseId, isChecked) => {
  isChecked
    ? supersetExercises.value = [...supersetExercises.value, exerciseId]
    : supersetExercises.value = supersetExercises.value.filter(id => id !== exerciseId)
}

watch(() => props.isSuperset, val => {
  if (val) activeExerciseId.value = null
  else supersetExercises.value.length = 0
})
</script>

<template>
  <draggable
    v-if="store.exercises.length"
    v-model="store.exercises"
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
          class='chosen-exercises__item-top'
          :class="{
            active: activeExerciseId === element.id,
            superset: isSuperset
          }"
        >
          <Checkbox
            v-if="isSuperset"
            :modelValue="supersetExercises.includes(element.id)"
            @update:modelValue="value => handleCheckboxChange(element.id, value)"
          />
          <div
            class="chosen-exercises__item-header"
            :class="{disabledExercise : isSuperset}"
            @click="toggleParameters(element.id)"
          >
            <div class="collapse__icon" v-if="!isSuperset"/>
            <div class="chosen-exercises__item-name">{{ element.name }} </div>
            <div class="chosen-exercises__item-tonnage">
              {{ store.getSetTonnage(element.id) / 1000 }} T
            </div>
            <button
              @click="store.deleteExercise(element.id)"
              class="chosen-exercises__delete"
            />
          </div>
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
