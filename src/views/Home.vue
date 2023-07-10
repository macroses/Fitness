<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { gsap } from 'gsap'
import { workoutStore } from '@/stores/workout'
import AsideExercise from '@/components/AsideExercise/AsideExercise.vue'
import { exerciseStore } from '@/stores/exercise'
import Button from '@/components/UI/Button/Button.vue'
import WorkoutDescription from '@/components/Workout/WorkoutDescription.vue'
import ExercisesList from '@/components/ExercisesList/ExercisesList.vue'
import ChosenExercisesList from '@/components/ChosenExercisesList/ChosenExercisesList.vue'

const workoutsStore = workoutStore()
const exercisesStore = exerciseStore()

const chosenDate = ref(dayjs())
const workoutMode = ref(false)

const getDate = (date) => {
  chosenDate.value = date
  workoutsStore.date = date
}

const beforeEnter = (el) => {
  el.style.transform = 'translateX(-60px)'
  el.style.opacity = 0.3
}
const enter = (el) => {
  gsap.to(el, {
    duration: 1,
    opacity: 1,
    ease: 'expo',
    translateX: 0
  })
}

const afterEnter = () => {}
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout" :class="{ 'workout-mode': workoutMode }">
        <div class="main__layout-left">
          <Calendar @get-date="getDate" />

          <div v-if="!workoutMode" class="group">
            <Button @click="workoutMode = true"> Create workout </Button>
            <Button>Program</Button>
            <Button>Body parameters</Button>
          </div>
          <div v-if="!workoutMode" class="events">
            <div class="events__empty">Today there are no events</div>
          </div>
          <template v-if="workoutMode">
            <WorkoutDescription v-if="workoutMode" />
            <ChosenExercisesList />
          </template>
        </div>
        <div class="main__layout-right">
          <transition appear @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <ExercisesList v-if="workoutMode" />
          </transition>
        </div>
      </div>
    </div>
  </main>

  <transition name="slide-left">
    <AsideExercise v-if="exercisesStore.exercise" />
  </transition>
  <transition>
    <div v-if="exercisesStore.exercise" class="aside-layout" />
  </transition>
</template>
