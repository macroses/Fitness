<script setup>
import { EFFORTS } from '@/constants/EFFORTS'
import { workoutStore } from '@/stores/workout'
import { useEventsStore } from '@/stores/userEvents'

const store = workoutStore()
const eventsStore = useEventsStore()

const getEffortColor = effort => EFFORTS.filter(el => el.id === effort).map(item => item.color)

const deleteSetHandler = (setId) => store.deleteSet(setId)
</script>

<template>
  <div>
    <div
      v-if="eventsStore.combinedResults.length"
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
            v-for="result in eventsStore.combinedResults"
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
                @click="deleteSetHandler(result.setId)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
