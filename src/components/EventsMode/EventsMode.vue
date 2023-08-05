<script setup>
import dayjs from 'dayjs'
import { chosenDateStore } from '@/stores/chosenDate'

const dateStore = chosenDateStore()
</script>

<template>
  <div class="group">
    <Button
      @click="$emit('workoutMode')"
    >
      Create workout
    </Button>
    <Button>Program</Button>
    <Button :disabled="dateStore.date > dayjs()">
      Body parameters
    </Button>
  </div>
</template>
