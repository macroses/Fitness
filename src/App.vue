<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { cacheExercises } from '@/composables/cacheExercises'
import { useEventsStore } from '@/stores/userEvents'

const dataExercises = ref([])
const loadingExercise = ref(false)
const userEvents = useEventsStore()

onBeforeMount(async () => {
  await userEvents.fetchEventHandler()
  cacheExercises('exercisesCache', dataExercises, loadingExercise)
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
