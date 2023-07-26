<script setup>
import { onMounted, ref } from 'vue'
import { getProfileColumn, updateProfile } from '@/composables/profile'

defineProps({
  exercises: {
    type: Array,
    required: true
  },
  favorites: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['showChosenExercises'])
const favoriteIds = ref([])
const isFavoriteLoading = ref(false)

const showExercise = exercise => emit('showChosenExercises', exercise)

const toggleToFavoriteExercise = async (id) => {
  favoriteIds.value.includes(id)
    ? favoriteIds.value = favoriteIds.value.filter((favoriteId) => favoriteId !== id)
    : favoriteIds.value.push(id)

  await updateProfile(
    null,
    isFavoriteLoading,
    'favorite_exercises',
    favoriteIds.value,
  )
}

const isFavorite = id => {
  return favoriteIds.value.includes(id)
}

onMounted(async () => {
  await getProfileColumn(
    favoriteIds,
    isFavoriteLoading,
    'favorite_exercises'
  )
})
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
        <button type='button' class='favorite-icon' @click.stop="toggleToFavoriteExercise(exercise.id)">
          <Icon :icon-name="isFavorite(exercise.id) ? 'star-fill' : 'star'" width='15px'/>
        </button>
      </li>
    </ul>
  </div>
</template>
