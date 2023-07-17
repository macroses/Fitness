<script setup>
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers'
import { workoutStore } from '@/stores/workout'
import { EFFORTS } from '@/constants/EFFORTS'
import ChosenExerciseSets from '@/components/ChosenExercisesList/ChosenExerciseSets/ChosenExerciseSets.vue'

defineProps({
  exerciseId: {
    type: Number,
    required: true
  }
})

const store = workoutStore()

const addEffortType = effortId => store.effort = effortId

const addSetHandler = exerciseId => store.addSet(exerciseId)
</script>

<template>
  <div class="chosen-exercises__form-parent">
    <div class="chosen-exercises__form">
      <div class="sets-params">
        <div class="group">
          <Input
            v-model.number="store.weight"
            label-fade
            label-placeholder="Weight (kg)"
            @clear="store.weight = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Input
            v-model.number="store.repeats"
            label-fade
            label-placeholder="Repeats"
            @clear="store.repeats = null"
            @keydown="useOnlyNumbers($event)"
          />
        </div>
        <div class="group efforts">
          <div class="chosen-exercises__effort">
            <button
              v-for="(effort, index) in EFFORTS"
              :key="effort.id"
              class="button__effort-type"
              :class="{ active: index === store.effort }"
              :style="{ backgroundColor: effort.color }"
              @click="addEffortType(effort.id)"
            >
              {{ effort.text }}
            </button>
          </div>
          <Button
            class="chosen-exercises__add"
            @click="addSetHandler(exerciseId)"
          >
            <Icon
              icon-name="plus"
              width="20px"
            />
          </Button>
        </div>
      </div>
      <ChosenExerciseSets :exercise-id="exerciseId" />
    </div>
  </div>
</template>