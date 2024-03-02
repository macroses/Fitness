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
      <Icon
        icon-name="fluent--dumbbell"
        width="25px"
      />
      <span>Workout</span>
    </Button>
    <Button
      is-link
      bordered
      path="/program"
    >
      <Icon
        icon-name="computer"
        width="25px"
      />
      <span>Program</span>
    </Button>
    <Button
      is-link
      bordered
      :disabled="dateStore.date > dayjs()"
      path="/body-parameters"
    >
      <Icon
        icon-name="pen-ruler"
        width="20px"
      />
      <span>Parameters</span>
    </Button>
  </div>
</template>
