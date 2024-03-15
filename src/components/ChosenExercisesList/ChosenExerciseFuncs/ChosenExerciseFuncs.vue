<script setup>
import { ref } from 'vue'
import { workoutStore } from '@/stores/modules/workout'
import { onBeforeEnter, onEnter, onLeave } from '@/components/ChosenExercisesList/ChosenExerciseFuncs/composable'
import { onClickOutside } from '@vueuse/core'

defineProps({
  element: {
    type: Object,
    default: () => {},
    required: true
  }
})

const store = workoutStore()
const isExerciseChartVisible = ref(false)
const chart = ref(null)

const toggleChart = () => isExerciseChartVisible.value = !isExerciseChartVisible.value

onClickOutside(chart, () => {
  setTimeout(() => {
    isExerciseChartVisible.value = false
  }, 100)
})
</script>

<template>
  <div class="chosen-exercises__item-name">
    <div
      class="collapse__icon"
      v-if="!store.isSuperset"
    />
    <div class="chosen-exercises__item-value">
      {{ element.name }}
    </div>
  </div>
  <div class="chosen-exercises__item-funcs">
    <div class="chosen-exercises__item-chart">
      <Button
        transparent
        size="small"
        class="chosen-exercises__item-chart-btn"
        @click.stop="toggleChart"
      >
        <Icon
          icon-name="chart-light"
          width="20px"
        />
      </Button>
      <Transition
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <ChosenExerciseChart
          v-if="isExerciseChartVisible"
          ref="chart"
          :exerciseId="element.id"
          @close="toggleChart"
        />
      </Transition>
    </div>
    <div
      v-if="!store.isSuperset"
      class="chosen-exercises__item-tonnage"
    >
      {{ (store.getSetTonnage(element.id) / 1000).toFixed(2) }} T
    </div>
    <button
      v-if="!store.isSuperset"
      @click="store.deleteExercise(element.id)"
      class="chosen-exercises__delete"
    >
      <Icon
        icon-name="xmark"
        width="14px"
      />
    </button>
  </div>
</template>
