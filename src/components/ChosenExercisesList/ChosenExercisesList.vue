<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { uid } from 'uid'
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
const handleCheckboxChange = (exercise, isChecked) => {
  if (isChecked) {
    if (!supersetExercises.value.some(ex => ex.id === exercise.id)) {
      supersetExercises.value.push(exercise)
    }
  } else {
    supersetExercises.value = supersetExercises.value.filter(ex => ex.id !== exercise.id)
  }

  const exercisePositions = {}
  supersetExercises.value.forEach((ex, index) => (exercisePositions[ex.id] = index))

  store.exercises.sort((a, b) => {
    const aIndex = exercisePositions[a.id] ?? Infinity
    const bIndex = exercisePositions[b.id] ?? Infinity
    return aIndex - bIndex
  })
}

const merged = () => {
  const addedExerciseIds = supersetExercises.value.map(ex => ex.id)

  store.exercises = store.exercises.filter(ex => !addedExerciseIds.includes(ex.id))

  store.supersets.push({
    supersetId: uid(10),
    superset: [...supersetExercises.value]
  })

  supersetExercises.value = []
  store.isSuperset = false
}

const splitSuperset = (supersetId) => {
  const supersetIndex = store.supersets.findIndex((item) => item.supersetId === supersetId)

  if (supersetIndex === -1) return

  const exercisesToMove = store.supersets[supersetIndex].superset

  store.exercises.push(...exercisesToMove)
  store.supersets.splice(supersetIndex, 1)
}

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
      @click="splitSuperset(superset.supersetId)"
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
      @click="merged"
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
                @update:modelValue="value => handleCheckboxChange(element, value)"
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

<!--  <div-->
<!--    v-if="!store.exercises.length && !store.supersets.length"-->
<!--    class="chosen-exercises__empty"-->
<!--  >-->
<!--    <div class="chosen-exercises__img-wr">-->
<!--      <img-->
<!--        src="/Folder.svg"-->
<!--        alt="add exercises"-->
<!--        width="100"-->
<!--        height="100"-->
<!--      >-->
<!--    </div>-->
<!--    <span>Add exercises</span>-->
<!--  </div>-->
</template>

<style src="./style.css" />
