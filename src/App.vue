<script setup>
import { ref } from 'vue'
import { cacheExercises } from '@/composables/cacheExercises'

const dataExercises = ref([])
const loadingExercise = ref(false)

cacheExercises(dataExercises, loadingExercise)

</script>

<template>
  <Header />
  <!--  {{loadingExercise}}-->
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
