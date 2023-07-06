<script setup>
import { ref } from 'vue'
import ExercisesList from '@/components/ExercisesList/ExercisesList.vue'
import WorkoutDescription from '@/components/Workout/WorkoutDescription.vue'

const step = ref(0)
</script>

<template>
  <div class="workouts__content">
    <WorkoutDescription
      v-if="step === 0"
      @clickBtn="step = 1"
    />
    <ExercisesList v-if="step === 1" />
  </div>
</template>
