<script setup>
import { onMounted, ref } from 'vue'
import { useEventsStore } from '@/stores/userEvents'
import toggleColorTheme from '@/composables/useColorTheme'
import { cacheExercises } from '@/composables/cacheExercises'
import { tableSubscriber } from '@/composables/tableSubscriber'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'
import { toast } from 'vue3-toastify'

const userEvents = useEventsStore()
toggleColorTheme()
const isOnline = ref(navigator.onLine)

onMounted(async () => {
  cacheExercises('exercisesCache')
  await userEvents.fetchEventHandler()

  tableSubscriber('workouts-channel', '*', 'public', 'workouts', 'workouts')

  if (!localStorage.getItem('bodyParams')) {
    localStorage.setItem('bodyParams', JSON.stringify(BODY_PARAMS))
  }

  const savedColor = localStorage.getItem('palette-color')
  if (savedColor) {
    document.documentElement.style.setProperty('--accent-color', savedColor)
  }
})

window.addEventListener('online', () => handleConnectionChange(true))
window.addEventListener('offline', () => handleConnectionChange(false))

const handleConnectionChange = newStatus => {
  isOnline.value = newStatus
  const message = newStatus ? 'Connection restored' : 'Connection lost'

  toast.success(message, { position: toast.POSITION.TOP_RIGHT })
}
</script>

<template>
  <Header />
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
