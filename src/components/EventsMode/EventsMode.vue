<script setup>
import dayjs from 'dayjs'
import { chosenDateStore } from '@/stores/chosenDate'

const dateStore = chosenDateStore()
</script>

<template>
  <div class="group home">
    <Button
      @click="$emit('workoutMode')"
    >
      Create workout
    </Button>
    <Button>Program</Button>
    <Button
      is-link
      :disabled="dateStore.date > dayjs()"
      path="/body-parameters"
    >
      Body parameters
    </Button>
  </div>
</template>
