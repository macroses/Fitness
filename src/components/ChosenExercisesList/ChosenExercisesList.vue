<script setup>
import { computed, ref, watch } from 'vue'
import { workoutStore } from '@/stores/modules/workout'

const store = workoutStore()
const activeExerciseId = ref(null)
const supersetExercises = ref([])
const checkboxStates = ref({})

const toggleParameters = id => {
  activeExerciseId.value === id ? (activeExerciseId.value = null) : (activeExerciseId.value = id)

  store.effort = 0
  store.weight = null
  store.repeats = null
  store.openedExerciseId = activeExerciseId.value
}

const handleCheckbox = (exerciseId, isChecked) => {
  checkboxStates.value[exerciseId] = isChecked
  store.checkExercisesForSuperset(supersetExercises, exerciseId, isChecked)
}

const handleMerge = () => store.mergeToSuperset(supersetExercises)

const handleSplit = supersetId => store.splitToExercises(supersetId)

const isExerciseVisible = computed(() => {
  return store.supersetsArray.length || store.exercisesParamsCollection.length
})

watch(() => store.isSuperset, () => (activeExerciseId.value = null))
</script>

<template>
  <div
    v-if="isExerciseVisible"
    class="chosen-exercises__wrap"
  >
    <div
      v-for="group in store.supersetsArray"
      :key="group.superset"
      class="chosen-exercises__supersets"
      :class="{ 'superset-mode': store.isSuperset }"
    >
      <span class="superset-legend">Superset</span>
      <Button
        v-if="!activeExerciseId"
        bordered
        is-only-icon
        @click="handleSplit(group.superset)"
        class="btn-split"
      >
        <Icon
          icon-name="split"
          width="20px"
        />
      </Button>
      <ul>
        <li
          v-for="element in group.exercises"
          :key="element.id"
          class="chosen-exercises__item"
        >
          <div
            class="chosen-exercises__item-top"
            :class="{
              active: activeExerciseId === element.id,
              superset: store.isSuperset
            }"
          >
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
                <div class="chosen-exercises__item-value">
                  {{ element.name }}
                </div>
              </div>
            </div>
          </div>
          <TransitionSlideY>
            <SetExerciseForm
              v-if="activeExerciseId === element.id"
              :exercise-id="element.id"
            />
          </TransitionSlideY>
        </li>
      </ul>
    </div>

    <div
      v-if="store.filteredCacheExercises.length"
      class="chosen-exercises__filtered"
    >
      <Button
        v-if="store.isSuperset"
        bordered
        is-only-icon
        :disabled="supersetExercises.length < 2"
        @click="handleMerge"
        class="btn-merge"
      >
        <Icon
          icon-name="merge"
          width="18px"
        />
      </Button>
      <TransitionGroup
        tag="ul"
        name="fade"
        class="chosen-exercises"
        :class="{ 'superset-mode': store.isSuperset }"
      >
        <li
          v-for="element in store.filteredCacheExercises"
          :key="element.id"
          class="chosen-exercises__item"
          tabindex="0"
        >
          <div
            class="chosen-exercises__item-top"
            :class="{
              active: activeExerciseId === element.id,
              superset: store.isSuperset
            }"
          >
            <Checkbox
              v-if="store.isSuperset"
              v-model:checked="checkboxStates[element.id]"
              @input="value => handleCheckbox(element.id, value)"
            />
            <div
              class="chosen-exercises__item-header"
              :class="{ disabledExercise: store.isSuperset }"
              @click="toggleParameters(element.id)"
            >
              <ChosenExerciseFuncs :element />
            </div>
          </div>
          <TransitionSlideY>
            <SetExerciseForm
              v-if="activeExerciseId === element.id"
              :exercise-id="element.id"
            />
          </TransitionSlideY>
        </li>
      </TransitionGroup>
    </div>
  </div>

  <div
    v-if="!store.exercisesParamsCollection.length"
    class="chosen-exercises__empty"
  >
    <span>To save the workout, add at least one exercise</span>
  </div>
</template>

<style src="./style.css" />
