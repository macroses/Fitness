<script setup>
import { EFFORTS } from '@/constants/EFFORTS'
import { workoutStore } from '@/stores/workout'
import { computed } from 'vue'
import { useEventsStore } from '@/stores/userEvents'
import { chosenDateStore } from '@/stores/chosenDate'
import dayjs from 'dayjs'

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
      prevWeight: prevSet.weight ?? '-',
      prevRepeats: prevSet.repeats ?? '-',
      effort: set.effort,
    }
  })

  if (previous.length > exerciseSets.length) {
    for (let i = exerciseSets.length; i < previous.length; i++) {
      const prevSet = previous[i];
      combined.push({
        setId: null,
        weight: '-',
        repeats: '-',
        prevWeight: prevSet.weight,
        prevRepeats: prevSet.repeats,
        effort: prevSet.effort,
      })
    }
  }

  return combined
});

</script>

<template>
  <div>
    {{ previousResults }}
    <div v-if="combinedResults.length" class="table-parent">
      <table>
        <thead>
        <tr>
          <td />
          <td>Weight</td>
          <td>Repeats</td>
          <td>Previous Weight</td>
          <td>Previous Repeats</td>
          <td />
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in combinedResults" :key="result.setId">
          <td style="width: 10px" :style="{ background: getEffortColor(result.effort) }" />
          <td>{{ result.weight }}</td>
          <td>{{ result.repeats }}</td>
          <td>{{ result.prevWeight }}</td>
          <td>{{ result.prevRepeats }}</td>
          <td v-if="result.setId !== null">
            <button class="chosen-exercises__delete" @click="deleteSetHandler(exerciseId, result.setId)" />
          </td>
          <td v-else />
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
