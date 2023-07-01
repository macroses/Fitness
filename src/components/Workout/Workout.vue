<script setup>
import dayjs, { Dayjs } from 'dayjs'
import { ref } from 'vue'
import DropdownColor from '@/components/UI/DropdownColor/DropdownColor.vue'
import Input from '@/components/UI/Input/Input.vue'
import Button from '@/components/UI/Button/Button.vue'
import ExercisesList from '@/components/ExercisesList/ExercisesList.vue'

const workoutName = ref('')

defineProps({
  chosenDate: {
    type: Dayjs,
    default: () => dayjs()
  }
})
</script>

<template>
  <div class="workouts__content">
    <div class="workout__description">
      <div class="workout__date">
        {{ dayjs(chosenDate).format('DD.MM.YYYY') }}
        <div class="workout__color">
          <DropdownColor />
        </div>
      </div>
      <div class="workout__name">
        <Input
          v-model="workoutName"
          :value="workoutName"
          label-placeholder="Workout name"
          label-fade
        />
      </div>
      <Button :disabled="!workoutName"> Choose exercises </Button>
    </div>

    <ExercisesList />
  </div>
</template>
