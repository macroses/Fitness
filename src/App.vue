<script setup>
// import { getUserId } from '@/composables/getUserId'
import { ref } from 'vue'
import { cacheExercises } from '@/composables/cacheExercises'

// const { userId } = getUserId()

const dataExercises = ref([])
cacheExercises(dataExercises)
</script>

<template>
  <Header />
  <RouterView />
</template>
