<script setup>
import { computed, watch } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers'
import { workoutStore } from '@/stores/modules/workout'
import { useEventsStore } from '@/stores/modules/userEvents/userEvents'
import { EFFORTS } from '@/constants/EFFORTS'

const props = defineProps({
  exerciseId: {
    type: Number,
    required: true
  }
})

const store = workoutStore()
const eventsStore = useEventsStore()

const addEffortType = effortId => (store.effort = effortId)
const addSetHandler = exerciseId => store.addSet(exerciseId)
const isCurrentRepeatsMoreThanLast = computed(() => {
  return store.getSetRepeats(props.exerciseId) > eventsStore.getTotalPreviousRepeats
})

const progressPercentage = computed(() => {
  if (store.getSetRepeats(props.exerciseId) === 0) {
    return -100
  }

  const total = eventsStore.getTotalPreviousRepeats;
  const current = store.getSetRepeats(props.exerciseId)
  return (current / total) * 100
})

watch(
  () => store.repeats,
  newValue => {
    if (newValue < 1) store.repeats = null
  }
)
</script>

<template>
  <div class="chosen-exercises__form-parent">
    <div class="chosen-exercises__form">
      <div class="sets-params">
        <div class="group">
          <Input
            v-model.number="store.weight"
            mode="decimal"
            label-fade
            label-placeholder="Weight (kg)"
            @clear="store.weight = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Input
            v-model.number="store.repeats"
            mode="decimal"
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
              :style="{
                backgroundColor: effort.color,
                color: effort.id === 4 && '#fff'
              }"
              @click="addEffortType(effort.id)"
            >
              {{ effort.text }}
            </button>
          </div>
          <Button
            :disabled="!store.repeats"
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
      <div
        class="chosen-exercises__total-repeats"
        :class="{ done: isCurrentRepeatsMoreThanLast }"
      >
        <div class="chosen-exercises__total-current">
          Total repeats:
          <span>
            {{ store.getSetRepeats(exerciseId) }}
          </span>
        </div>
        <div class="chosen-exercises__total-previous">
          Total previous:
          <span>{{ eventsStore.getTotalPreviousRepeats }}</span>
        </div>
        <div
          class="chosen-exercises__total-progress"
          :style="{background: `linear-gradient(to right, rgba(51, 176, 29, 0.59) ${progressPercentage}%, rgba(254, 64, 1, 0.91) 100%)`}"
        />
      </div>
    </div>
  </div>
</template>
