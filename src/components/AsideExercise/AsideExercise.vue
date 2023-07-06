<script setup>
import { exerciseStore } from '@/stores/exercise'
import BodySvg from '@/components/BodySvg/BodySvg.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const store = exerciseStore()
const asideExercise = ref(null)

onClickOutside(asideExercise, () => (store.exercise = null))
</script>

<template>
  <div ref="asideExercise" class="aside">
    <button @click="store.exercise = null">close</button>
    <BodySvg :body-part="store.exercise?.main_muscle" :secondary-part="store.exercise?.helpers" />
    {{ store.exercise }}
  </div>
</template>

<style src="./style.css" />
