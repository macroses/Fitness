<script setup>
import dayjs from 'dayjs'
import { chosenDateStore } from '@/stores/chosenDate'

const dateStore = chosenDateStore()
</script>

<template>
  <div class="group home">
    <Button
      bordered
      @click="$emit('workoutMode')"
    >
      Workout
    </Button>
    <Button
      is-link
      bordered
      path="/program"
      >Program</Button
    >
    <Button
      is-link
      bordered
      :disabled="dateStore.date > dayjs()"
      path="/body-parameters"
    >
      Parameters
    </Button>
  </div>
</template>
