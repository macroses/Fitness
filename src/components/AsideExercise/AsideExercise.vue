<script setup>
import { onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { exerciseStore } from '@/stores/exercise'
import BodySvg from '@/components/BodySvg/BodySvg.vue'
import ButtonClose from '@/components/UI/ButtonClose/ButtonClose.vue'
import Button from '@/components/UI/Button/Button.vue'
import { workoutStore } from '@/stores/workout'

const store = exerciseStore()
const workoutsStore = workoutStore()
const asideExercise = ref(null)
const asideLayout = ref(null)

const addExerciseToWorkout = exercise => {
  workoutsStore.addExerciseToWorkout(exercise)
  store.exercise = null
}

gsap.registerPlugin(CSSPlugin)

onMounted(() => {
  const t1 = gsap.timeline()
  t1.from(asideLayout.value, { autoAlpha: 0, duration: 0.25 })
  t1.from(asideExercise.value, { autoAlpha: 0, x: '+100', duration: 0.25, ease: 'sine' })
  t1.play()
})

onClickOutside(asideExercise, () => (store.exercise = null))
</script>

<template>
  <div class="aside-container">
    <div
      ref="asideLayout"
      class="aside-layout"
    />
    <div
      ref="asideExercise"
      class="aside"
    >
      <ButtonClose
        left-position
        @click="store.exercise = null"
      >
        close
      </ButtonClose>
      <Button
        class="button_to-workout"
        @click="addExerciseToWorkout(store.exercise)"
      >
        Add to workout
      </Button>
      <div class="aside__content">
        <div class="exercise-description">
          <div class="title">
            Name
          </div>
          <div class="value">
            {{ store.exercise.name }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Muscle targeted
          </div>
          <div class="value">
            {{ store.exercise.main_muscle }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Other muscles
          </div>
          <div class="value">
            {{ store.exercise.helpers ? store.exercise.helpers.join(', ') : 'Not set' }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            The muscles involved
          </div>
          <div class="body-svg">
            <BodySvg
              :body-part="store.exercise?.main_muscle"
              :secondary-part="store.exercise?.helpers"
            />
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Mechanic type
          </div>
          <div class="value">
            {{ store.exercise.type }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Type
          </div>
          <div class="value">
            {{ store.exercise.load }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Equipment
          </div>
          <div class="value">
            {{ store.exercise.equip }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Force
          </div>
          <div class="value">
            {{ store.exercise.force }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Level of proficiency
          </div>
          <div class="value">
            {{ store.exercise.level }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./style.css" />
