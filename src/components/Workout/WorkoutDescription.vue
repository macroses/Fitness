<script setup>
import { workoutStore } from '@/stores/modules/workout'

const store = workoutStore()
const getColor = color => (store.color = color)
</script>

<template>
  <div class="workout__description">
    <div class="workout__name">
      <Input
        v-model.trim="store.title"
        :value="store.title"
        label-placeholder="Workout name"
        label-fade
        @clear="store.title = null"
        enterkeyhint="next"
      />
      <DropdownColor @drop-color="getColor" />
    </div>
  </div>
</template>
