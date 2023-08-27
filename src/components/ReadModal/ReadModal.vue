<script setup>
import { EFFORTS } from '@/constants/EFFORTS'

const props = defineProps({
  readableEvent: {
    type: Object,
    default: () => {},
    required: true
  }
})
const emit = defineEmits(['toEditPage', 'closeReadModal'])

const toEditPage = event => emit('toEditPage', event)
const closeReadModal = () => emit('closeReadModal')
</script>

<template>
  <Modal
    width="500px"
    withoutFooter
    @close="closeReadModal"
  >
    <template #modal-header>
      <div class="read-event__header">
        <div class="read-event__header-title">{{ readableEvent.title }}</div>
        <div class="read-event__header-date">({{ readableEvent.date.format('DD.MM.YYYY') }})</div>
        <button
          class="read-event__edit"
          @click="toEditPage(readableEvent)"
        >
          <Icon icon-name="pen-to-square" width="12px"/>
          edit
        </button>
      </div>
    </template>
    <template #modal-body>
      <div class="read-event__total">
        <Icon icon-name="weight-hanging" width="13px"/>
        <span>Total tonnage</span>
        - {{ readableEvent.tonnage / 1000 }} T
      </div>
      <ul>
        <li
          v-for="exercise in readableEvent.exercisesParamsCollection"
          :key="exercise.exerciseId"
        >
          <div class="exercise__title">
            <div class="exercise__title-value">{{ exercise.exerciseName }}</div> -
            <Icon icon-name="weight-hanging" width="15px"/>
            {{ (exercise.setTonnage) / 1000 }} T
          </div>
          <div class="read-event__table-parent">
            <table class="read-event__table">
              <thead>
              <tr>
                <th>Effort</th>
                <th>Weight</th>
                <th>Repeats</th>
                <th>
                  <div class="read-event__rm">
                    1 RM
                    <Icon icon-name="circle-question" width="14px"/>
                  </div>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="set in exercise.sets"
                  :key="set.setId"
                  class="read-event__list"
              >
                <td>
                  <div
                    :style="{
                        background: EFFORTS[set.effort].color,
                        color: set.effort === 4 && '#fff'
                      }"
                    class="read-event__effort"
                  >
                    {{ EFFORTS[set.effort].text }}
                  </div>
                </td>
                <td>{{ set.weight }}</td>
                <td>{{ set.repeats }}</td>
                <td>
                  {{ Math.round(set.weight * (1 + 0.025 * set.repeats)) }} kg
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </template>
  </Modal>
</template>

<style src="./style.css" />