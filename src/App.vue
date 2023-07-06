<script setup>
import Header from '@/components/Header/Header.vue'
import { getUserId } from '@/composables/getUserId'
import AsideExercise from '@/components/AsideExercise/AsideExercise.vue'
import { exerciseStore } from '@/stores/exercise'

const { userId } = getUserId()
const exercisesStore = exerciseStore()
</script>

<template>
  <Header />
  <!--  {{ userId }}-->
  <RouterView />
  <template v-if="exercisesStore.exercise">
    <AsideExercise />
  </template>
</template>
