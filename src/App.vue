<script setup>
import { onMounted } from 'vue'
import { useEventsStore } from '@/stores/userEvents'
import { cacheExercises } from '@/composables/cacheExercises'
import { tableSubscriber } from '@/composables/tableSubscriber'

const userEvents = useEventsStore()

onMounted(async () => {
  cacheExercises('exercisesCache')
  await userEvents.fetchEventHandler()

  tableSubscriber(
    'workouts-channel',
    '*',
    'public',
    'workouts',
    'workouts'
  )
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
