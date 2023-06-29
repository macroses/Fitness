<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { supabase } from '@/lib/supabaseClient'

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

const activeTab = ref(0)
const chosenDate = ref(dayjs())

const getActiveTab = (value) => {
  activeTab.value = value
}

const getDate = (date) => {
  chosenDate.value = date
}

const tabs = [
  { id: 0, tabTitle: 'Workout' },
  { id: 1, tabTitle: 'Program' },
  { id: 2, tabTitle: 'Body Parameters' }
]
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout">
        <Calendar @get-date="getDate" />
        <div class="workouts">
          <Tabs :tabs="tabs" @activeTab="getActiveTab" />
        </div>
        <div />
        <div />
      </div>
    </div>
  </main>
</template>
