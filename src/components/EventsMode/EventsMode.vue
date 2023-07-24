<script setup>
import { chosenDateStore } from '@/stores/chosenDate'
import dayjs from 'dayjs'

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
    <Button :disabled='dateStore.date > dayjs()'>Body parameters</Button>
  </div>
</template>
