<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import toggleColorTheme from '@/composables/useColorTheme'
import { cacheExercises } from '@/composables/cacheExercises'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'
import { checkNetworkStatus } from '@/helpers/isOnline.js'
import { supabase } from '@/lib/supabaseClient.js'
import { useEventsStore } from '@/stores/userEvents.js'

toggleColorTheme()
const userEvents = useEventsStore()
const user = ref(null)

onMounted(async () => {
  cacheExercises('exercisesCache')
  checkNetworkStatus()

  const { data: { session } } = await supabase.auth.getSession()

  if (session?.user) {
    user.value = session.user
  }

  if (!localStorage.getItem('bodyParams')) {
    localStorage.setItem('bodyParams', JSON.stringify(BODY_PARAMS))
  }
})

watchEffect(async () => {
  if (user.value) {
    await userEvents.fetchEventHandler()
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
