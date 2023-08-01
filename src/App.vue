<script setup>
import { onBeforeMount } from 'vue'
import { cacheExercises } from '@/composables/cacheExercises'
import { useEventsStore } from '@/stores/userEvents'

const userEvents = useEventsStore()

onBeforeMount(async () => {
  await userEvents.fetchEventHandler()
  cacheExercises('exercisesCache')
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
