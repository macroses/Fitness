<script setup>
import { ref } from 'vue'
import Icon from '@/components/UI/Icon/Icon.vue'
import { workoutStore } from '@/stores/workout'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { onClickOutside } from '@vueuse/core'

gsap.registerPlugin(CSSPlugin)

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

const toggleChart = () => {
  isExerciseChartVisible.value = !isExerciseChartVisible.value
}

const onBeforeEnter = el => {
  el.style.scale = 0.5
  el.style.transformOrigin = '300px 0'
}

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    scale: 1.05,

    onComplete: () => {
      gsap.to(el, {
        duration: 0.1,
        scale: 1,
        onComplete: done
      })
    }
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    scale: 1.05,
    onComplete: () => {
      gsap.to(el, {
        duration: 0.1,
        scale: 0,
        onComplete: done
      })
    }
  })
}

onClickOutside(chart, () => {
  isExerciseChartVisible.value = false
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
