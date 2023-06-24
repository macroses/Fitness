<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import Header from '@/components/Header/Header.vue'
import router from '@/router'

const session = ref(null)

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
    if (!session.value) {
      router.push('/login')
    }
  })
})
</script>

<template>
  <Header />
  <RouterView />
</template>
