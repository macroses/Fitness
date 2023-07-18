<script setup>
import { onMounted, ref, computed } from 'vue'
import dayjs from 'dayjs'
import { uid } from 'uid'
import { workoutStore } from '@/stores/workout'
import router from '@/router'
import { getUserId } from '@/composables/getUserId'
import { deleteEvent, getWorkouts } from '@/composables/workouts'
import Loading from '@/components/UI/Loading/Loading.vue'
import { chosenDateStore } from '@/stores/chosenDate'

const workoutsStore = workoutStore()
const dateStore = chosenDateStore()
const chosenDate = ref(dayjs())
const events = ref([])
const eventsLoading = ref(false)

const { user_id } = getUserId()
const workoutId = ref(uid(50))

const getDate = date => {
  chosenDate.value = date
  dateStore.date = date
}

const filteredEvents = computed(() => events.value.filter(event => dayjs(event.date).format('YYYY-MM-DD') === chosenDate.value.format('YYYY-MM-DD')))

const toWorkoutMode = () => {
  workoutsStore.workoutId = workoutId.value
  router.push(`/workout/${workoutId.value}`)
}

const deleteHandler = async workoutId => {
  await deleteEvent('workouts', 'workoutId', workoutId, eventsLoading)
  await getWorkouts(events, eventsLoading)
}

onMounted(async () => await getWorkouts(events, eventsLoading))
</script>

<template>
  <main>
    <div class="container">
      <Loading
        v-if="eventsLoading"
        large
      />
      <div class="main__layout">
        <div class="main__layout-left">
          <Calendar
            @get-date="getDate"
            :events="events"
          />

          <div class="group">
            <Button @click="toWorkoutMode">
              Create workout
            </Button>
            <Button>Program</Button>
            <Button>Body parameters</Button>
          </div>

          <div class="events">
            <ul
              v-if="filteredEvents.length"
              class="events__list"
            >
              <li
                v-for="event in filteredEvents"
                :key="event.id"
                class="events__item"
              >
                {{ event.title || 'without name' }}
                {{ event.workoutId }}
                <button @click="deleteHandler(event.workoutId)">
                  delete
                </button>
              </li>
            </ul>
            <div
              v-else
              class="events__empty"
            >
              Today there are no events
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
