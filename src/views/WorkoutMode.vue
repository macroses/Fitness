<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import dayjs from 'dayjs'
import { onBeforeRouteLeave } from 'vue-router'
import { workoutStore } from '@/stores/modules/workout'
import { exerciseStore } from '@/stores/exercise'
import router from '@/router'
import { chosenDateStore } from '@/stores/chosenDate'
import { useEventsStore } from '@/stores/modules/userEvents/userEvents'
import { temporaryWorkoutStore } from '@/stores/modules/temporaryWorkout'

const workoutsStore = workoutStore()
const exercisesStore = exerciseStore()
const dateStore = chosenDateStore()
const userEvents = useEventsStore()
const useTemporaryWorkout = temporaryWorkoutStore()
const chosenDate = ref(dayjs())
const isCalendarVisible = ref(false)
const isWorkoutWasSaved = ref(false)
const isBackToMainPage = ref(false)

const getDate = date => {
  chosenDate.value = date
  dateStore.date = date
  isCalendarVisible.value = false
}

const backToMainPage = () => {
  isBackToMainPage.value = true

  router.push('/')
}

const workoutToBase = async () => {
  if (workoutsStore.isWorkoutEdit) {
    await userEvents.updateEventHandler()
    isWorkoutWasSaved.value = true
    router.push('/')
    return
  }

  await userEvents.pushEventHandler()
  isWorkoutWasSaved.value = true
  workoutsStore.$reset()
  router.push('/')
}

const workoutSaveText = computed(() => {
  return workoutsStore.isWorkoutEdit
    ? 'Update workout'
    : 'Save workout'
})

const isWorkoutSaveAvailable = computed(() => {
  return workoutsStore.exercisesParamsCollection.length && workoutsStore.title
})

const isTemporaryWorkoutAvailable = computed(() => {
  return !isWorkoutWasSaved.value
    && workoutsStore.exercisesParamsCollection.length
    && workoutsStore.title
    && !workoutsStore.isWorkoutEdit
    && !isBackToMainPage.value
})

const saveToLocalStorage = () => {
  if (isTemporaryWorkoutAvailable.value) {
    useTemporaryWorkout.temporaryWorkout = {
      title: workoutsStore.title,
      color: workoutsStore.color,
      date: dateStore.date,
      workoutId: workoutsStore.workoutId,
      exercisesParamsCollection: workoutsStore.exercisesParamsCollection,
      tonnage: workoutsStore.tonnage
    }

    useTemporaryWorkout.saveToLocalStorage()
  }
}

onBeforeRouteLeave(() => {
  saveToLocalStorage()
  localStorage.removeItem('wId')
  workoutsStore.$reset()
})

onBeforeUnmount(() => {
  window.addEventListener('beforeunload', saveToLocalStorage)
  localStorage.removeItem('wId')
})
</script>

<template>
  <main>
    <div class="container">
      <div class="main__layout workout-mode">
        <Loading
          large
          v-if="userEvents.eventsLoading"
        />
        <Transition
          name="slideFromRight"
          appear
        >
          <div class="main__layout-left">
            <div class="exercises-list__wr">
              <div class="user-workout">
                <WorkoutDescription />
                <div
                  class="calendar-wr"
                  :class="{ hidden: !isCalendarVisible }"
                >
                  <Calendar @get-date="getDate" />
                  <div
                    v-if="!isCalendarVisible"
                    class="calendar-chosen-date"
                  >
                    {{ dateStore.date.format('DD MMMM YYYY') }}
                    <span>{{ dateStore.date.format('dddd') }}</span>
                  </div>
                  <Button
                    bordered
                    is-only-icon
                    class="hide-calendar__button"
                    :class="{ active: isCalendarVisible }"
                    @click="isCalendarVisible = !isCalendarVisible"
                  >
                    <Icon
                      width="20px"
                      :icon-name="
                      isCalendarVisible
                        ? 'calendar-arrow-up'
                        : 'calendar-arrow-down'
                    "
                    />
                  </Button>
                </div>
                <div class="user-workout__funcs">
                  <div class="total-tonnage">
                    Total tonnage:&nbsp;
                    <b>{{ workoutsStore.tonnage / 1000 }} T</b>
                  </div>
                  <Checkbox
                    v-if="workoutsStore.filteredCacheExercises.length > 1"
                    v-model:checked="workoutsStore.isSuperset"
                    label="Supersets"
                  />
                </div>
                <ChosenExercisesList />
              </div>





              <div class="group">
                <Button
                  bordered
                  full
                  @click="backToMainPage"
                >
                  Back
                </Button>
                <Button
                  full
                  @click="workoutToBase"
                  :disabled="!isWorkoutSaveAvailable"
                >
                  {{ workoutSaveText }}
                </Button>
              </div>
            </div>
          </div>
        </Transition>

        <Transition
          name="slideFromLeft"
          appear
        >
          <div class="main__layout-right">
            <div class="exercises-list__wr">
              <ExercisesList />
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <AsideExercise v-if="exercisesStore.exercise" />
  </main>
</template>

<style>
.slideFromRight-enter-from,
.slideFromRight-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}
.slideFromRight-enter-active,
.slideFromRight-leave-active {
  transition: all 0.3s ease;
}

.slideFromLeft-enter-from,
.slideFromLeft-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.8);
}
.slideFromLeft-enter-active,
.slideFromLeft-leave-active {
  transition: all 0.3s ease;
}
</style>
