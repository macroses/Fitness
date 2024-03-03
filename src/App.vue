<script setup>
import { onMounted } from 'vue'
import { useEventsStore } from '@/stores/userEvents'
import toggleColorTheme from '@/composables/useColorTheme'
import { cacheExercises } from '@/composables/cacheExercises'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'
import { checkNetworkStatus } from '@/helpers/isOnline.js'
import { useQuery } from '@tanstack/vue-query'

import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const userEvents = useEventsStore()

toggleColorTheme()

onMounted(async () => {
  cacheExercises('exercisesCache')
  checkNetworkStatus()

  if (!localStorage.getItem('bodyParams')) {
    localStorage.setItem('bodyParams', JSON.stringify(BODY_PARAMS))
  }

  setTimeout(() => {
    useQuery({ queryKey: ['events'], queryFn: userEvents.fetchEventHandler() })
  }, 0)
})
</script>

<template>
  <VueQueryDevtools />
  <Header />
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
