<script setup>
import Checkbox from '@/components/UI/Checkbox/Checkbox.vue'
import { workoutStore } from '@/stores/workout'

const props = defineProps({
  element: {
    type: Object,
    default: () => {}
  },
  activeId: {
    type: [Number, null],
    default: null
  }
})

const emit = defineEmits(['toggleParameters'])
const store = workoutStore()

const toggleParameters = id => emit('toggleParameters', id)

const handleCheckboxChange = (exerciseId, isChecked) => {
  if (isChecked) {
    if (!store.supersetExercises.includes(exerciseId)) {
      store.supersetExercises.push(exerciseId);
    }
  } else {
    store.supersetExercises = store.supersetExercises.filter(id => id !== exerciseId);
  }

  const exercisePositions = {};
  store.supersetExercises.forEach((id, index) => exercisePositions[id] = index);

  store.exercises.sort((a, b) => {
    const aIndex = exercisePositions[a.id] ?? Infinity;
    const bIndex = exercisePositions[b.id] ?? Infinity;
    return aIndex - bIndex;
  });
}
</script>

<template>
  <div
    :key="element.id"
    class="chosen-exercises__item"
    tabindex="0"
  >
    <div
      class='chosen-exercises__item-top'
      :class="{
        active: activeId === element.id,
        superset: store.isSuperset
      }"
    >
      <Checkbox
        v-if="store.isSuperset"
        :modelValue="store.supersetExercises.includes(element.id)"
        @update:modelValue="value => handleCheckboxChange(element.id, value)"
      />
      <div
        class="chosen-exercises__item-header"
        :class="{ disabledExercise : store.isSuperset }"
        @click="toggleParameters(element.id)"
      >
        <div class="collapse__icon" v-if="!store.isSuperset"/>
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
        v-if="activeId === element.id"
        :exercise-id="element.id"
      />
    </TransitionSlideY>
  </div>
</template>