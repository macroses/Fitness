<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import BodyParamsChart from '@/components/BodyParamsChart/BodyParamsChart.vue'
import { chosenDateStore } from '../stores/chosenDate.js'
import { FILTER_LIST } from '@/constants/FILTER_LIST.js'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'
import { bodyParamsStore } from '@/stores/bodyParams.js'
import draggable from 'vuedraggable'
import dayjs from 'dayjs'

const paramsStore = bodyParamsStore()
const dateStore = chosenDateStore()

const activeListItem = ref(null)
const isLoading = ref(false)
const inputValue = ref(null)
const filterType = ref(0)
const isCalendarVisible = ref(false)
const draggableList = ref(null)
const paramsLocalStorage = ref(JSON.parse(localStorage.getItem('bodyParams')))

const setActiveField = id => paramsStore.activeBodyField = id

const submitBodyParams = async () => {
  await paramsStore.pushBodyParamsToBase(inputValue, paramsStore.activeParam, isLoading)
  inputValue.value = null
}

const getDate = date => {
  dateStore.date = date
  isCalendarVisible.value = false
}

const getFilter = filter => filterType.value = filter.id

const calculateTableCellContent = computed(() => {
  return paramsStore.filteredParamsByProp.map((param, index) => {
    const currentValue = param.params[0].value;
    const nextValue = paramsStore.filteredParamsByProp[index + 1]?.params[0].value;
    const isPositive = currentValue !== undefined && currentValue > (nextValue || 0);
    const isNegative = index !== 0 && currentValue !== undefined && currentValue < (nextValue || 0);
    const sign = isPositive ? 'angle-up' : (isNegative ? 'angle-down' : '');

    return {
      content: currentValue !== undefined ? currentValue : '',
      class: {
        'positive': isPositive,
        'negative': isNegative
      },
      date: param.date,
      sign: sign
    };
  });
})

onMounted(async () => {
  await paramsStore.fetchEventHandler()

  if(!localStorage.getItem('bodyParams')) {
    localStorage.setItem('bodyParams', JSON.stringify(BODY_PARAMS))
  }
})

const handleDragEnd = () => localStorage.setItem('bodyParams', JSON.stringify(paramsLocalStorage.value))

const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
}
</script>

<template>
  <div class="container">
    <div class="body-params">
      <div class="body-params__aside">
        <div class="body-params__aside-wrap">
          <draggable
            v-model="paramsLocalStorage"
            tag="ul"
            ref="draggableList"
            class="body-params__aside-list"
            handle=".handle-move"
            :item-key="item => item.id"
            v-bind="dragOptions"
            @end="handleDragEnd"
          >
            <template #item="{ element }">
              <li
                ref="activeListItem"
                class="body-params__aside-item"
                :class="{ active: element.id === paramsStore.activeParam.id }"
                @click="setActiveField(element.id)"
              >
                <button class="body-params__aside-button">
                  {{ element.label }}
                </button>
                <Icon
                  icon-name="grip-dots-vertical"
                  width="15px"
                  class="handle-move"
                />
              </li>
            </template>
          </draggable>
        </div>
      </div>
      <div class="body-params__content">
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

        <div
          v-if="paramsStore.filteredParamsByProp.length"
          class="body-params__content-wrap">
          <Dropdown
            :dropdown-list="FILTER_LIST"
            @active-value="getFilter"
          />
          <div class="body-params__data">
            <div class="body-params__table-parent">
              <table class="body-params__table">
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="param in calculateTableCellContent"
                  :key="param.date"
                >
                  <td>{{ dayjs(param.date).format('DD.MM.YYYY') }}</td>
                  <td>
                    <div class="body-params__table-value">
                      {{ param.content }}
                      <Icon
                        :icon-name="param.sign"
                        :class="param.class"
                        width="15px"
                      />
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <BodyParamsChart :filter="filterType" />
        </div>
        <div v-else class="empty">pusto</div>
      </div>
    </div>
  </div>
</template>
