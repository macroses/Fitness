<script setup>
import dayjs from 'dayjs'
import { workoutStore } from '@/stores/workout'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'

const store = workoutStore()
const getColor = color => (store.labelColor = color)
</script>

<template>
  <div class="workout__description">
    <div class="workout__date">
      {{ dayjs(store.date).format('DD.MM.YYYY') }}
      <div class="workout__color">
        <DropdownColor @drop-color="getColor" />
      </div>
    </div>
    <div class="workout__name">
      <Input
        v-model="store.title"
        :value="store.title"
        label-placeholder="Workout name"
        label-fade
      />
    </div>
    <Button
      :disabled="!store.title"
      @click="$emit('clickBtn')"
    >
      Choose exercises
    </Button>
  </div>
</template>
