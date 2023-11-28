<script setup>
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { onBeforeRouteLeave } from 'vue-router'
import { workoutStore } from '@/stores/workout'
import { exerciseStore } from '@/stores/exercise'
import router from '@/router'
import { chosenDateStore } from '@/stores/chosenDate'
import { useEventsStore } from '@/stores/userEvents'
import { uid } from 'uid'

const workoutsStore = workoutStore()
const exercisesStore = exerciseStore()
const dateStore = chosenDateStore()
const userEvents = useEventsStore()
const chosenDate = ref(dayjs())
const isCalendarVisible = ref(false)
const isModalVisible = ref(false)
const newExercise = reactive({
  id: uid(10),
  name: '',
  muscles: [],
  type: null,
  main_muscle: null,
  equipment: [],
  load_type: null,
  level: null,
  description: '',
  force_type: null
})

const getDate = date => {
  chosenDate.value = date
  dateStore.date = date
  isCalendarVisible.value = false
}

const workoutToBase = async () => {
  if (workoutsStore.isWorkoutEdit) {
    await userEvents.updateEventHandler()
    router.push('/')
    return
  }

  await userEvents.pushEventHandler()
  workoutsStore.$reset()
  router.push('/')
}

onBeforeRouteLeave(() => {
  localStorage.removeItem('wId')
  workoutsStore.$reset()
})

const musclesGroups = [
  { id: 0, value: "Biceps" },
  { id: 1, value: "Triceps" },
  { id: 2, value: "Forearms" },
  { id: 3, value: "Shoulders" },
  { id: 4, value: "Chest" },
  { id: 5, value: "Back" },
  { id: 6, value: "Abs" },
  { id: 7, value: "Quads" },
  { id: 8, value: "Hamstrings" },
  { id: 9, value: "Calves" },
  { id: 10, value: "Glutes" },
  { id: 11, value: "Cardio" },
  { id: 12, value: "Full body" },
  { id: 13, value: "Other" }
]

const addSelectedMuscleGroup = muscle => {
  // if (newExercise.muscles.includes(muscle)) {
  //   newExercise.muscles = newExercise.muscles.filter(m => m.id !== muscle.id)
  //   return
  // }
  //
  // newExercise.muscles.push(muscle)
  console.log(muscle)
}
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
                class="hide-calendar__button"
                :class="{ active: isCalendarVisible }"
                @click="isCalendarVisible = !isCalendarVisible"
              >
                <Icon
                  width="20px"
                  :icon-name="isCalendarVisible ? 'calendar-arrow-up' : 'calendar-arrow-down'"
                />
              </Button>
            </div>

            <div class="user-workout">
              <WorkoutDescription />
              <div class="user-workout__funcs">
                <div class="total-tonnage">
                  Total tonnage:&nbsp; <b>{{ workoutsStore.tonnage / 1000 }} T</b>
                </div>
                <Checkbox
                  v-if="workoutsStore.filteredCacheExercises.length > 1"
                  v-model="workoutsStore.isSuperset"
                  label="Supersets"
                />
              </div>
              <ChosenExercisesList />
            </div>

            <div class="group">
              <Button
                bordered
                full
                @click="router.push('/')"
              >
                Back
              </Button>
              <Button
                full
                @click="workoutToBase"
              >
                {{ workoutsStore.isWorkoutEdit ? 'Update workout' : 'Save workout' }}
              </Button>
            </div>
          </div>
        </Transition>

        <Transition
          name="slideFromLeft"
          appear
        >
          <div class="main__layout-right">
            <div class="exercises-list__wr">
              <ExercisesList @openCreateModal="isModalVisible = true"/>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <AsideExercise v-if="exercisesStore.exercise" />
    <Modal
      v-if="isModalVisible"
      width="400px"
      @close="isModalVisible = false"
      confirm-label="Create"
    >
      <template #modal-header>
        Create exercise
      </template>
      <template #modal-body>
        <Alert sm>
          You can create your own exercise if you didn't find the one you need in the list. It will appear in the new exercises tab
        </Alert>

<!--        1. id (auto)-->
<!--        2. Exercise name-->
<!--        3. muscles helpers (array of muscles, from null to 3 or may be 5)-->
<!--        4. type (compound, isolation, cardio)-->
<!--        5. main muscle (one muscle)-->
<!--        6. equipment (dumbbells, barbell, bodyweight, machines, cable, kettlebells, bands, other)-->
<!--        7. load type (strength, stretching, distance)-->
<!--        7. level (beginner, intermediate, advanced)-->
<!--        8. description (text)-->
<!--        9. force type (push, pull, static)-->

        <Input
          v-model="newExercise.name"
          label-placeholder="Exercise name"
        />

        {{ newExercise.muscles }}
        <MultiSelect
          :multiselectList="musclesGroups"
        />
      </template>
      <template #modal-footer>

      </template>
    </Modal>
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
  transition: all 0.3s ease
}

.slideFromLeft-enter-from,
.slideFromLeft-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.8);
}
.slideFromLeft-enter-active,
.slideFromLeft-leave-active {
  transition: all 0.3s ease
}
</style>
