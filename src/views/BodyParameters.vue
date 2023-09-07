<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import BodyParamsChart from '@/components/BodyParamsChart/BodyParamsChart.vue'
import { chosenDateStore } from '../stores/chosenDate.js'
import { FILTER_LIST } from '@/constants/FILTER_LIST.js'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'
import { bodyParamsStore } from '@/stores/bodyParams.js'
import dayjs from 'dayjs'

const paramsStore = bodyParamsStore()
const dateStore = chosenDateStore()

const activeListItem = ref(null)
const blockMove = ref(null)
const isLoading = ref(false)
const inputValue = ref(null)
const filterType = ref(0)
const isCalendarVisible = ref(false)

const setActiveField = id => paramsStore.activeBodyField = id

const tabStyle = computed(() => {
  if (activeListItem.value) {
    const activeLiRect = activeListItem.value[paramsStore.activeBodyField].getBoundingClientRect()
    const parentRect = blockMove.value.parentNode.getBoundingClientRect()
    const top = `${activeLiRect.top - parentRect.top}px`

    return `top: ${top}`
  }

  return ''
})

const submitBodyParams = async () => {
  await paramsStore.pushBodyParamsToBase(inputValue, paramsStore.activeParam, isLoading)
  inputValue.value = null
}

const getDate = date => {
  dateStore.date = date
  isCalendarVisible.value = false
}

const getFilter = filter => filterType.value = filter.id

onMounted(async () => await paramsStore.fetchEventHandler())
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
              :class="{ active: param.id === paramsStore.activeParam.id }"
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
        <!---->
        <div class="body-params__calendar">
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
        </div>
        <!--        -->
        <h1 class="body-params__header">
          {{ paramsStore.activeParam.label }}
        </h1>
        <form
          class="body-params__form"
          @submit.prevent="submitBodyParams"
        >
          <Input
            v-model.number="inputValue"
            mode="decimal"
            :label-placeholder="paramsStore.activeParam.label"
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
                  <tr v-for="param in paramsStore.filteredParamsByProp" :key="param.id">
                    <td>{{ dayjs(param.date).format('DD.MM.YYYY') }}</td>
                    <td>{{ param.params[0].value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <BodyParamsChart :filter="filterType" />
        </div>
      </div>
    </div>
  </div>
</template>
