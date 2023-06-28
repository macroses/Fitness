<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import Calendar from '@/components/Calendar/Calendar.vue'

// const dataExercises = ref([])
//
// const getExercises = async () => {
//   try {
//     let { data: exercises, error } = await supabase.from('exercises').select('*')
//
//     if (error) throw error
//
//     dataExercises.value = exercises
//   } catch (e) {
//     console.log(e.message)
//   }
// }
//
// getExercises()
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout">
        <Calendar />
        <div />
        <div />
        <div />
      </div>
    </div>
  </main>
</template>
