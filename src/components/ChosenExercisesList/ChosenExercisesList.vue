<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { workoutStore } from '@/stores/workout'
import ChosenExerciseItem from '@/components/ChosenExercisesList/ChosenExerciseItem/ChosenExerciseItem.vue'

const store = workoutStore()
const isMerged = ref(false);
const activeExerciseId = ref(null)

const toggleParameters = id => {
  activeExerciseId.value === id
    ? activeExerciseId.value = null
    : activeExerciseId.value = id

  store.effort = 0
  store.weight = null
  store.repeats = null
  store.openedExerciseId = activeExerciseId.value
}

const mergeToSuperset = () => {
  for (const exercise of store.exercises) {
    store.supersetExercises.includes(exercise.id)
      ? exercise.supersetMerged = true
      : exercise.supersetMerged = false
  }
  store.isSuperset = false;
  isMerged.value = true
}

watch(() => store.isSuperset, val => {
  if (val) activeExerciseId.value = null
  else store.supersetExercises.length = 0
})
</script>

<template>
  <Button @click="mergeToSuperset">
    <Icon icon-name='merge' width='20px'/>
  </Button>

  <div
    v-for="element in store.exercises"
    :key="element.id"
    :class="['chosen-exercises__element', { 'superset-merged': element.supersetMerged }]"
  >
    <ChosenExerciseItem
      v-if="element.supersetMerged"
      :element='element'
      :active-id="activeExerciseId"
      @toggle-parameters='toggleParameters'
    />
  </div>
  <draggable
    v-if="store.exercises.length"
    v-model="store.exercises"
    tag="ul"
    handle=".chosen-exercises__item-header"
    class="chosen-exercises"
    :item-key="item => item.id"
  >
    <template #item="{ element }">
      <TransitionGroup
        v-if="!element.supersetMerged"
        tag="li"
        name="fade"
        class='chosen-exercises__element'
        :class="{ 'superset-merged': element.supersetMerged }"
      >
        <ChosenExerciseItem
          :element='element'
          :key="element.id"
          :active-id="activeExerciseId"
          @toggle-parameters='toggleParameters'
        />
      </TransitionGroup>
    </template>
  </draggable>


<!--  <div-->
<!--    v-else-->
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
