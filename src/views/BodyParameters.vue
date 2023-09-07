<script setup>
import { computed, ref } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import { useEventsStore } from '@/stores/userEvents.js'
import BodyParamsChart from '@/components/BodyParamsChart/BodyParamsChart.vue'
import { chosenDateStore } from '../stores/chosenDate.js'
import { FILTER_LIST } from '@/constants/FILTER_LIST.js'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'
import dayjs from 'dayjs'

const userEvents = useEventsStore()
const dateStore = chosenDateStore()

const activeListItem = ref(null)
const blockMove = ref(null)
const isLoading = ref(false)
const inputValue = ref(null)
const filterType = ref(0)

const setActiveField = id => userEvents.activeBodyField = id

const tabStyle = computed(() => {
  if (activeListItem.value) {
    const activeLiRect = activeListItem.value[userEvents.activeBodyField].getBoundingClientRect()
    const parentRect = blockMove.value.parentNode.getBoundingClientRect()
    const top = `${activeLiRect.top - parentRect.top}px`

    return `top: ${top}`
  }

  return ''
})

const submitBodyParams = async () => {
  await userEvents.pushBodyParamsToBase(inputValue, userEvents.activeParam, isLoading)
  inputValue.value = null
}

const getFilter = filter => {
  console.log(filter)
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
              v-for="param in BODY_PARAMS"
              :key="param.id"
              class="body-params__aside-item"
              :class="{ active: param.id === userEvents.activeParam.id }"
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
          {{ userEvents.activeParam.label }}
        </h1>
        <form
          class="body-params__form"
          @submit.prevent="submitBodyParams"
        >
          <Input
            v-model.number="inputValue"
            mode="decimal"
            :label-placeholder="userEvents.activeParam.label"
            @clear="inputValue = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Button>Submit</Button>
        </form>

        <div class="body-params__content-wrap">
          <div class="body-params__data">
            <Dropdown
              :dropdown-list="FILTER_LIST"
              @active-value="getFilter"
            />

            <div class="body-params__table-parent">
              <table class="body-params__table">
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="param in userEvents.filteredParamsByProp" :key="param.id">
                    <td>{{ dayjs(param.date).format('DD.MM.YYYY') }}</td>
                    <td>{{ param.params[0].value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <BodyParamsChart
            :filter="filterType"
          />
        </div>
      </div>
    </div>
  </div>
</template>
