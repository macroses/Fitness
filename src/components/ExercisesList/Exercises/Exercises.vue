<script setup>
import { workoutStore } from '@/stores/modules/workout'
import { ref } from 'vue'

const props = defineProps({
  exercises: {
    type: Array,
    required: true
  },
  favorites: {
    type: Array,
    default: () => []
  },
  isCustomExercises: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'showChosenExercises',
  'getFavoriteId',
  'deleteExercise'
])

const workoutsStore = workoutStore()
const confirmDialog = ref(null)
const eventToDelete = ref(null)

const showExercise = exercise => emit('showChosenExercises', exercise)

const toggleToFavoriteExercise = async id => emit('getFavoriteId', id)

const isFavorite = id => props.favorites.includes(id)

const showConfirmDialog = (event) => {
  eventToDelete.value = event
  confirmDialog.value?.show()
}

const confirmDelete = () => {
  if (eventToDelete.value) {
    emit('deleteExercise', eventToDelete.value.id)
    eventToDelete.value = null
  }
}

const isExerciseInWorkout = id => {
  return workoutsStore.exercisesParamsCollection.some(exercise => exercise.exerciseId === id)
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
        <button
          type="button"
          class="exercises__item-add"
          v-if="!isExerciseInWorkout(exercise.id)"
          @click.stop="workoutsStore.addExerciseToWorkout(exercise.id, exercise.name)"
        >
          +
        </button>
        <button
          type="button"
          class="favorite-icon"
          v-if="!isCustomExercises"
          @click.stop="toggleToFavoriteExercise(exercise.id)"
        >
          <Icon
            :icon-name="isFavorite(exercise.id) ? 'star-fill' : 'star'"
            width="15px"
          />
        </button>
        <button
          type="button"
          class="favorite-icon"
          v-else
          @click.stop="showConfirmDialog(exercise)"
        >
          <Icon
            icon-name="trash"
            width="15px"
          />
        </button>
      </li>
    </ul>
    <ConfirmDialog
      ref="confirmDialog"
      showCancel
      width="500px"
      @confirm="confirmDelete"
      confirm-text="Delete"
    >
      <template #confirmMessage>
        Are you sure you want to delete <b>{{ eventToDelete?.name }}</b> exercise?
      </template>
      <div class="exercises__delete-attention">
        <Icon icon-name="triangle-exclamation" width="50px"/>
        <p>If you delete the exercise, all workout history and statistics related to this exercise will be permanently deleted</p>
      </div>
    </ConfirmDialog>
  </div>
</template>
