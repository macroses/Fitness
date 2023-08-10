<script setup>
import { computed, onMounted, readonly, ref } from 'vue'
import { exerciseStore } from '@/stores/exercise'
import SearchExercises from '@/components/SearchExercises/SearchExercises.vue'
import Exercises from '@/components/ExercisesList/Exercises/Exercises.vue'
import MuscleItemHeader from '@/components/ExercisesList/MuscleItemHeader/MuscleItemHeader.vue'
import { getProfileColumn, updateProfile } from '@/composables/profile'

const exercisesStore = exerciseStore()

const activeMuscle = ref(null)
const sessionExercises = ref(JSON.parse(localStorage.getItem('exercisesCache')))
const muscles = ref(null)
const favoriteIds = ref([])
const isFavoriteLoading = ref(false)
const activeTabId = ref(0)

const uniqueMainMuscles = computed(() => {
  const mainMuscles = new Set(sessionExercises.value.map(exercise => exercise.main_muscle))
  return Array.from(mainMuscles)
})

const filteredExercisesByMuscle = computed(() => uniqueMainMuscles.value.map(muscle => ({
  muscle,
  exercises: sessionExercises.value.filter(exercise => exercise.main_muscle === muscle)
})))

const filteredExercisesByFavorite = computed(() => sessionExercises.value.filter(exercise => favoriteIds.value.includes(exercise.id)))

const selectMuscle = index => activeMuscle.value = activeMuscle.value === index ? null : index

const showExercise = exercise => exercisesStore.exercise = exercise

const getFavoriteId = async id => {
  favoriteIds.value.includes(id)
    ? favoriteIds.value = favoriteIds.value.filter(favoriteId => favoriteId !== id)
    : favoriteIds.value.push(id)

  await updateProfile(
    null,
    isFavoriteLoading,
    'favorite_exercises',
    favoriteIds.value
  )
}

onMounted(async () => {
  await getProfileColumn(
    favoriteIds,
    isFavoriteLoading,
    'favorite_exercises'
  )
})

const tabs = readonly([
  { id: 0, tabTitle: 'All', icon: 'folder' },
  { id: 1, tabTitle: 'Favorites', icon: 'star' },
  { id: 2, tabTitle: 'Recent', icon: 'clock-rotate-left' }
])

const getActiveTab = id => activeTabId.value = id
</script>

<template>
  <div class="exercises-list">
    <SearchExercises />
    <Tabs
      :tabs="tabs"
      @activeTab="getActiveTab"
    />
    <Transition
      mode="out-in"
    >
      <keep-alive>
        <ul
          v-if="activeTabId === 0"
          ref="muscles"
          class="muscles"
        >
          <li
            v-for="(item, index) in filteredExercisesByMuscle"
            :key="item.muscle"
            class="muscles__item"
            :class="{ active: activeMuscle === index }"
          >
            <MuscleItemHeader
              :muscle-item="item"
              @click="selectMuscle(index)"
            />
            <Exercises
              :exercises="item.exercises"
              :favorites="favoriteIds"
              @showChosenExercises="showExercise"
              @getFavoriteId="getFavoriteId"
            />
          </li>
        </ul>
        <div v-else-if="activeTabId === 1">
          <Exercises
            v-if="filteredExercisesByFavorite.length"
            :exercises="filteredExercisesByFavorite"
            :favorites="favoriteIds"
            class="active"
            @showChosenExercises="showExercise"
            @getFavoriteId="getFavoriteId"
          />
          <div
            v-else
            class="empty__favorites"
          >
            <img
              src="/Star.webp"
              alt="empty favorites"
              width="170"
              height="93"
            >
            <p>Add a few exercises to favorites</p>
          </div>
        </div>
      </keep-alive>
    </Transition>
  </div>
</template>

<style src="./style.css"></style>
