<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { EFFORTS } from '@/constants/EFFORTS'
import { workoutStore } from '@/stores/workout'
import { useEventsStore } from '@/stores/userEvents'
import { chosenDateStore } from '@/stores/chosenDate'

const props = defineProps({
  exerciseId: {
    type: Number,
    required: true
  }
})

const store = workoutStore()
const eventsStore = useEventsStore()
const dateStore = chosenDateStore()

const getExerciseSets = exerciseId => {
  const exerciseParams = store.exercisesParamsCollection.find(item => item.exerciseId === exerciseId)
  return exerciseParams ? exerciseParams.sets : []
}

const getEffortColor = effort => EFFORTS.filter(el => el.id === effort).map(item => item.color)

const deleteSetHandler = (exerciseId, setId) => store.deleteSet(exerciseId, setId)

const previousResults = computed(() => {
  const userWorkouts = eventsStore.events.filter(workout => dayjs(workout.date) < dateStore.date) // Filter workouts with date before current date

  const previousSets = []
  for (const workout of userWorkouts.reverse()) { // Reverse the array to start with the latest workout
    const exerciseParams = workout.exercisesParamsCollection.find(item => item.exerciseId === props.exerciseId)
    if (exerciseParams && exerciseParams.sets.length > 0) {
      previousSets.push(...exerciseParams.sets)
      break
    }
  }

  return previousSets
})

const combinedResults = computed(() => {
  const previous = previousResults.value.slice();
  const exerciseSets = getExerciseSets(props.exerciseId)

  const combined = exerciseSets.map((set, index) => {
    const prevSet = previous[index] || {}

    return {
      setId: set.setId,
      weight: set.weight,
      repeats: set.repeats,
      prevWeight: prevSet.weight ?? null,
      prevRepeats: prevSet.repeats ?? null,
      effort: set.effort
    }
  })

  if (previous.length > exerciseSets.length) {
    for (let i = exerciseSets.length; i < previous.length; i++) {
      const prevSet = previous[i];
      combined.push({
        setId: null,
        weight: null,
        repeats: null,
        prevWeight: prevSet.weight,
        prevRepeats: prevSet.repeats,
        effort: prevSet.effort
      })
    }
  }

  return combined
});

</script>

<template>
  <div>
    <div
      v-if="combinedResults.length"
      class="table-parent"
    >
      <table>
        <thead v-once>
          <tr>
            <td />
            <td>Weight</td>
            <td>Repeats</td>
            <td />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="result in combinedResults"
            :key="result.setId"
          >
            <td
              style="width: 10px"
              :style="{ background: getEffortColor(result.effort) }"
            />

            <td>
              {{ result.weight }}
              <span
                v-if="!result.weight"
                class="prev-result"
              >{{ result.prevWeight }}</span>
              <span
                v-if="result.prevWeight && result.weight"
                class="prev-result__grow"
                :style="Math.sign(result.weight - result.prevWeight) === 1 ? 'color: green' : 'color: red'"
              >
                {{ Math.sign(result.weight - result.prevWeight) === 1 ? '+' : '' }}{{ result.weight - result.prevWeight }}
              </span>
            </td>

            <td>
              {{ result.repeats }}
              <span
                v-if="!result.repeats"
                class="prev-result"
              >{{ result.prevRepeats }}</span>
              <span
                v-if="result.prevRepeats && result.repeats"
                class="prev-result__grow"
                :style="Math.sign(result.repeats - result.prevRepeats) === 1 ? 'color: green' : 'color: red'"
              >
                {{ Math.sign(result.repeats - result.prevRepeats) === 1 ? '+' : '' }}{{ result.repeats - result.prevRepeats }}
              </span>
            </td>

            <td v-if="result.setId !== null">
              <button
                class="chosen-exercises__delete"
                @click="deleteSetHandler(exerciseId, result.setId)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
