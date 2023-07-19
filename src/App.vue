<script setup>
import { onMounted, ref } from 'vue'
import { cacheExercises } from '@/composables/cacheExercises'
import { useEventsStore } from '@/stores/userEvents'

const dataExercises = ref([])
const loadingExercise = ref(false)
const userEvents = useEventsStore()

cacheExercises('exercisesCache', dataExercises, loadingExercise)

onMounted(async () => {
  await userEvents.fetchEventHandler()
})
</script>

<template>
  <Header />
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
