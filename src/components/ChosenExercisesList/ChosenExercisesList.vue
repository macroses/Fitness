<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { workoutStore } from '@/stores/workout'
import Checkbox from '@/components/UI/Checkbox/Checkbox.vue'

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

const handleCheckbox = (exercise, isChecked) => store.checkSupersetExercises(supersetExercises, exercise, isChecked)

const handleMerge = () => store.mergeExerciseToSuperset(supersetExercises)

const handleSplit = (supersetId) => store.splitSupersetToExercise(supersetId)

watch(() => store.isSuperset, val => val && (activeExerciseId.value = null))
</script>

<template>
  <div
    v-for="superset in store.supersets"
    :key="superset.supersetId"
    class="chosen-exercises__supersets"
    :class="{ 'superset-mode': store.isSuperset }"
  >
    <Button
      transparent
      v-if="!activeExerciseId"
      @click="handleSplit(superset.supersetId)"
      class="btn-split"
    >
      <Icon
        icon-name="split"
        width="25px"
      />
    </Button>
    <template
      v-for="exercises in superset.superset"
      :key="exercises.id"
    >
      <div class="chosen-exercises__element">
        <div class="chosen-exercises__item">
          <div
            class="chosen-exercises__item-top"
            :class="{
              active: activeExerciseId === exercises.id,
              superset: store.isSuperset,
            }"
          >
            <div
              class="chosen-exercises__item-header"
              :class="{ disabledExercise: store.isSuperset }"
              @click="toggleParameters(exercises.id)"
            >
              <div
                class="collapse__icon"
                v-if="!store.isSuperset"
              />
              <div class="chosen-exercises__item-name">
                {{ exercises.name }}
              </div>
            </div>
          </div>
          <TransitionSlideY>
            <SetExerciseForm
              v-if="activeExerciseId === exercises.id"
              :exercise-id="exercises.id"
            />
          </TransitionSlideY>
        </div>
      </div>
    </template>
  </div>

  <div v-if="store.exercises.length" class='chosen-exercises__wrap'>
    <Button
      v-if="store.isSuperset"
      @click="handleMerge"
      class="btn-merge"
      :disabled="supersetExercises.length < 2"
    >
      <Icon
        icon-name="merge"
        width="25px"
      />
    </Button>
    <draggable
      v-model="store.exercises"
      tag="ul"
      handle=".chosen-exercises__item-header"
      class="chosen-exercises"
      :class="{ 'superset-mode': store.isSuperset }"
      :item-key="item => item.id"
    >
      <template #item="{ element }">
        <TransitionGroup
          tag="li"
          name="fade"
          class="chosen-exercises__element"
        >
          <div
            :key="element.id"
            class="chosen-exercises__item"
            tabindex="0"
          >
            <div
              class="chosen-exercises__item-top"
              :class="{
              active: activeExerciseId === element.id,
              superset: store.isSuperset,
            }"
            >
              <Checkbox
                v-if="store.isSuperset"
                :model-value="supersetExercises.includes(element)"
                @update:modelValue="value => handleCheckbox(element, value)"
              />
              <div
                class="chosen-exercises__item-header"
                :class="{ disabledExercise: store.isSuperset }"
                @click="toggleParameters(element.id)"
              >
                <div
                  class="collapse__icon"
                  v-if="!store.isSuperset"
                />
                <div class="chosen-exercises__item-name">
                  {{ element.name }}
                </div>
                <div v-if="!store.isSuperset" class="chosen-exercises__item-tonnage">
                  {{ store.getSetTonnage(element.id) / 1000 }} T
                </div>
                <button
                  v-if="!store.isSuperset"
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
  </div>

  <div
    v-if="!store.exercises.length && !store.supersets.length"
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
