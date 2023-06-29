<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const workoutName = ref('')
</script>

<template>
  <div class="workouts__content">
    <div v-if="activeTab === 0" class="workout__description">
      <div class="workout__date">
        Date start <b>{{ dayjs(chosenDate).format('DD.MM.YYYY') }}</b>
      </div>
      <div class="workout__name">
        <Input v-model="workoutName" :value="workoutName" label-placeholder="Workout name" />
      </div>
      <div class="workout__duration"></div>
    </div>
  </div>
</template>
