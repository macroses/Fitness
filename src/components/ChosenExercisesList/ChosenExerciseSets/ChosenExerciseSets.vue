<script setup>
import { EFFORTS } from '@/constants/EFFORTS'
import { workoutStore } from '@/stores/workout'

defineProps({
  exerciseId: {
    type: Number,
    required: true
  }
})

const store = workoutStore()

const getExerciseSets = exerciseId => {
  const exerciseParams = store.exercisesParamsCollection.find(item => item.exerciseId === exerciseId)
  return exerciseParams ? exerciseParams.sets : []
}

const getEffortColor = effort => EFFORTS.filter(el => el.id === effort).map(item => item.color)

const deleteSetHandler = (exerciseId, setId) => store.deleteSet(exerciseId, setId)
</script>

<template>
  <div
    v-if="getExerciseSets(exerciseId).length"
    class="table-parent"
  >
    <table>
      <thead>
        <tr>
          <td />
          <td>Weight</td>
          <td>Repeats</td>
          <td />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="set in getExerciseSets(exerciseId)"
          :key="set.setId"
        >
          <td
            style="width: 10px"
            :style="{ background: getEffortColor(set.effort) }"
          />
          <td>{{ set.weight ?? '-' }}</td>
          <td>{{ set.repeats ?? '-' }}</td>
          <td>
            <button
              class="chosen-exercises__delete"
              @click="deleteSetHandler(exerciseId, set.setId)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped src="./style.css" />
