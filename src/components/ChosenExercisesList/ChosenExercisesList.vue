<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { workoutStore } from '@/stores/workout'
import Checkbox from '@/components/UI/Checkbox/Checkbox.vue'

const store = workoutStore()
const activeExerciseId = ref(null)
const supersetExercises = ref([])
const isMerged = ref(false);

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
  if (isChecked) {
    if (!supersetExercises.value.includes(exerciseId)) {
      supersetExercises.value.push(exerciseId);
    }
  } else {
    supersetExercises.value = supersetExercises.value.filter(id => id !== exerciseId);
  }

  const exercisePositions = {};
  supersetExercises.value.forEach((id, index) => exercisePositions[id] = index);

  store.exercises.sort((a, b) => {
    const aIndex = exercisePositions[a.id] ?? Infinity;
    const bIndex = exercisePositions[b.id] ?? Infinity;
    return aIndex - bIndex;
  });
}

watch(() => store.isSuperset, val => {
  if (val) activeExerciseId.value = null
  else supersetExercises.value.length = 0
})
</script>

<template>
  <button>merge to superset</button>
  <draggable
    v-if="store.exercises.length"
    v-model="store.exercises"
    tag="ul"
    handle=".chosen-exercises__item-header"
    class="chosen-exercises"
    :item-key="item => item.id"
  >
    <template #item="{ element }">
      <TransitionGroup tag="li" name="fade" class='chosen-exercises__element'>
        <div
          :key="element.id"
          class="chosen-exercises__item"
          tabindex="0"
        >
          <div
            class='chosen-exercises__item-top'
            :class="{
            active: activeExerciseId === element.id,
            superset: store.isSuperset
          }"
          >
            <Checkbox
              v-if="store.isSuperset"
              :modelValue="supersetExercises.includes(element.id)"
              @update:modelValue="value => handleCheckboxChange(element.id, value)"
            />
            <div
              class="chosen-exercises__item-header"
              :class="{disabledExercise : store.isSuperset}"
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
              v-if="activeExerciseId === element.id"
              :exercise-id="element.id"
            />
          </TransitionSlideY>
        </div>
      </TransitionGroup>
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
