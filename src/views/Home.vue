<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { uid } from 'uid'
import { workoutStore } from '@/stores/workout'
import router from '@/router'
import { getUserId } from '@/composables/getUserId'

const workoutsStore = workoutStore()
const chosenDate = ref(dayjs())

const { userId } = getUserId()
const workoutId = ref(uid(20))

const getDate = date => {
  chosenDate.value = date
  workoutsStore.date = date
}

const toWorkoutMode = () => {
  console.log(userId.value)
  workoutsStore.userId = userId.value
  workoutsStore.workoutId = workoutId.value
  router.push(`/workout/${userId.value}/${workoutId.value}`)
}
</script>

<template>
  <main>
    {{ userId }}
    <div class="container">
      <div class="main__layout">
        <div class="main__layout-left">
          <Calendar @get-date="getDate" />

          <div class="group">
            <Button @click="toWorkoutMode">
              Create workout
            </Button>
            <Button>Program</Button>
            <Button>Body parameters</Button>
          </div>

          <div class="events">
            <div class="events__empty">
              Today there are no events
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
