<script setup>
import Button from '@/components/UI/Button/Button.vue'
import ExercisesList from '@/components/ExercisesList/ExercisesList.vue'
import WorkoutDescription from '@/components/Workout/WorkoutDescription.vue'
import { workoutStore } from '@/stores/workout'
import { ref } from 'vue'

const store = workoutStore()

const step = ref(0)
</script>

<template>
  <div class="workouts__content">
    <WorkoutDescription v-if="step === 0" />
    <ExercisesList v-if="step === 1" />
    <Button :disabled="!store.title" @click="step++"> Choose exercises </Button>
  </div>
</template>
