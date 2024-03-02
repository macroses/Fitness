<script setup>
import { onMounted } from 'vue'
import { useEventsStore } from '@/stores/userEvents'
import toggleColorTheme from '@/composables/useColorTheme'
import { cacheExercises } from '@/composables/cacheExercises'
import { tableSubscriber } from '@/composables/tableSubscriber'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'
import { checkNetworkStatus } from '@/helpers/isOnline.js'

const userEvents = useEventsStore()

toggleColorTheme()

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

  checkNetworkStatus()

  if (!localStorage.getItem('bodyParams')) {
    localStorage.setItem('bodyParams', JSON.stringify(BODY_PARAMS))
  }
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
