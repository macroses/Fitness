<script setup>
import { EFFORTS } from '@/constants/EFFORTS'
import { workoutStore } from '@/stores/workout'
import { useEventsStore } from '@/stores/userEvents'
import { getPrevChangesStyles } from '@/helpers/getPrevChangesStyles'

const store = workoutStore()
const eventsStore = useEventsStore()

const getEffortColor = effort => EFFORTS.filter(el => el.id === effort).map(item => item.color)

const deleteSetHandler = setId => store.deleteSet(setId)
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
              style="width: 15px"
              :style="[
                result.effort
                  ? `background: ${getEffortColor(result.effort)}`
                  : `background: ${getEffortColor(result.prevEffort)}; opacity: 0.5`
              ]"
            />
            <td
              style="width: 10px"
              :style="{
                background: getEffortColor(result.prevEffort),
                borderLeft: '1px solid rgba(26, 92, 255, 0.1)',
              }"
            />

            <td>
              {{ result.weight }}
              <span :class="getPrevChangesStyles(result.weight, result.prevWeight).class">
                {{ getPrevChangesStyles(result.weight, result.prevWeight).value }}
              </span>
            </td>

            <td>
              {{ result.repeats }}
              <span :class="getPrevChangesStyles(result.repeats, result.prevRepeats).class">
                {{ getPrevChangesStyles(result.repeats, result.prevRepeats).value }}
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
