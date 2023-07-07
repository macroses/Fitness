<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { exerciseStore } from '@/stores/exercise'
import BodySvg from '@/components/BodySvg/BodySvg.vue'
import ButtonClose from '@/components/UI/ButtonClose/ButtonClose.vue'

const store = exerciseStore()
const asideExercise = ref(null)

onClickOutside(asideExercise, () => (store.exercise = null))
</script>

<template>
  <div
    ref="asideExercise"
    class="aside"
    :class="{ active: store.exercise }"
  >
    <ButtonClose
      left-position
      @click="store.exercise = null"
    >
      close
    </ButtonClose>
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
</template>

<style src="./style.css" />
