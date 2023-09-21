<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import BodyParamsChart from '@/components/BodyParams/BodyParamsChart/BodyParamsChart.vue'
import { chosenDateStore } from '../stores/chosenDate.js'
import { FILTER_LIST } from '@/constants/FILTER_LIST.js'
import { bodyParamsStore } from '@/stores/bodyParams.js'
import draggable from 'vuedraggable'
import ParamsTable from '@/components/BodyParams/ParamsTable/ParamsTable.vue'

const paramsStore = bodyParamsStore()
const dateStore = chosenDateStore()

const activeListItem = ref(null)
const isLoading = ref(false)
const inputValue = ref(null)
const filterType = ref(0)
const isCalendarVisible = ref(false)
const draggableList = ref(null)
const paramsLocalStorage = ref(JSON.parse(localStorage.getItem('bodyParams')))

const blankCanvas = document.createElement('canvas');
blankCanvas.classList.add('pseudo')
blankCanvas.style.opacity = '0';

const setActiveField = id => paramsStore.activeBodyField = id

const submitBodyParams = async () => {
  if (!inputValue.value) return

  await paramsStore.pushBodyParamsToBase(inputValue, paramsStore.activeParam, isLoading)
  inputValue.value = null
}

const getDate = date => {
  dateStore.date = date
  isCalendarVisible.value = false
}

const getFilter = filter => filterType.value = filter.id

onMounted(async () => await paramsStore.fetchEventHandler())

const handleDragEnd = () => {
  localStorage.setItem('bodyParams', JSON.stringify(paramsLocalStorage.value))
  document.querySelector('.pseudo').remove()
}

const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
}

function handleDragStart(event) {
  event.dataTransfer.setDragImage(blankCanvas, 0, 0);
  document.body.appendChild(blankCanvas)
}

const calculateTableCellContent = computed(() => {
  return paramsStore.filteredParamsByProp.map((param, index) => {
    const currentValue = param.params[0].value
    const nextValue = paramsStore.filteredParamsByProp[index + 1]?.params[0].value
    const isPositive = currentValue !== undefined && currentValue > (nextValue || 0)
    const isNegative = index !== 0 && currentValue !== undefined && currentValue < (nextValue || 0)
    const sign = isPositive ? 'arrow-up-right' : (isNegative ? 'arrow-down-right' : '')

    return {
      content: currentValue !== undefined ? currentValue : '',
      date: param.date,
      sign: sign
    }
  })
})
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
                draggable="true"
                @dragstart="handleDragStart"
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
            <Calendar
              @get-date="getDate"
              is-after-days-off
            />
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
            :label-placeholder="paramsStore.activeParam.unit"
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
              <ParamsTable :params="calculateTableCellContent"/>
            </div>
          </div>
          <BodyParamsChart
            :filter="filterType"
            :last-param="calculateTableCellContent[0]"
            :unit="paramsStore.activeParam.unit"
          />
        </div>
        <div v-else class="empty">pusto</div>
      </div>
    </div>
  </div>
</template>
