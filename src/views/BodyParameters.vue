<script setup>
import { computed, readonly, ref } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import { useEventsStore } from '@/stores/userEvents.js'
import BodyParamsChart from '@/components/BodyParamsChart/BodyParamsChart.vue'
import { chosenDateStore } from '../stores/chosenDate.js'

const userEvents = useEventsStore()
const dateStore = chosenDateStore()

const activeField = ref(0)
const activeListItem = ref(null)
const blockMove = ref(null)
const isLoading = ref(false)
const inputValue = ref(null)

const setActiveField = id => activeField.value = id

const params = readonly([
  { id: 0, label: 'Weight' },
  { id: 1, label: 'Height' },
  { id: 2, label: 'Fat Percent' }, // процент жира
  { id: 3, label: 'Chest' },
  { id: 4, label: 'Waist' }, // талия
  { id: 5, label: 'Shoulders' },
  { id: 6, label: 'Left Biceps' },
  { id: 7, label: 'Right Biceps' },
  { id: 8, label: 'Left Thigh' }, // бедро
  { id: 9, label: 'Right Thigh' },
  { id: 10, label: 'Left Forearm' }, // предплечье
  { id: 11, label: 'Right Forearm' },
  { id: 12, label: 'Left Calf' }, // голень
  { id: 13, label: 'Right Calf' },
  { id: 14, label: 'Neck' }, // шея
  { id: 15, label: 'Pelvis' } // таз
])

const activeParam = computed(() => params.find(param => param.id === activeField.value))

const tabStyle = computed(() => {
  if (activeListItem.value) {
    const activeLiRect = activeListItem.value[activeField.value].getBoundingClientRect()
    const parentRect = blockMove.value.parentNode.getBoundingClientRect()
    const top = `${activeLiRect.top - parentRect.top}px`

    return `top: ${top}`
  }

  return ''
})

const submitBodyParams = async () => {
  await userEvents.pushBodyParamsToBase(inputValue, activeParam, isLoading)
  inputValue.value = null
}
</script>

<template>
  <div class="container">
    <div class="body-params">
      <div class="body-params__aside">
        <div class="body-params__aside-wrap">
          <ul class="body-params__aside-list">
            <li
              ref="activeListItem"
              v-for="param in params"
              :key="param.id"
              class="body-params__aside-item"
              :class="{ active: param.id === activeParam.id }"
              @click="setActiveField(param.id)"
            >
              <button class="body-params__aside-button">
                {{ param.label }}
              </button>
            </li>
          </ul>
          <div
            ref="blockMove"
            class="body-params__block-move"
            :style="tabStyle"
          />
        </div>
      </div>
      <div class="body-params__content">
        {{ dateStore.date.format('DD MMMM') }}
        <h1 class="body-params__header">
          {{ activeParam.label }}
        </h1>
        <form
          class="body-params__form"
          @submit.prevent="submitBodyParams"
        >
          <Input
            v-model.number="inputValue"
            mode="decimal"
            :label-placeholder="activeParam.label"
            @clear="inputValue = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Button>Submit</Button>
        </form>
<!--        {{ filteredParamsByProp }}-->
        <BodyParamsChart :body-param-type="activeParam"/>
      </div>
    </div>
  </div>
</template>
