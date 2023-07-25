<script setup>

defineProps({
  exercises: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['showChosenExercises'])

const showExercise = exercise => {
  emit('showChosenExercises', exercise)
}
</script>

<template>
  <div class="exercises-wr">
    <ul class="exercises">
      <li
        v-for="exercise in exercises"
        :key="exercise.id"
        class="exercises__item"
        @click="showExercise(exercise)"
      >
        {{ exercise.name }}
        <Icon icon-name='star' width='20px'/>
      </li>
    </ul>
  </div>
</template>
