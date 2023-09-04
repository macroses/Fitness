<script setup>
import { computed, readonly, ref } from 'vue'
import { uid } from 'uid'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
// import { updateProfile } from '@/composables/profile.js'
import { useEventsStore } from '@/stores/userEvents.js'
import { chosenDateStore } from '@/stores/chosenDate.js'

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
    return `top: ${top};`
  }
  return ''
})

const submitBodyParams = async () => {
  const currentDate = dateStore.date;
  const existingDataIndex = userEvents.bodyParams.findIndex(item => item.date === currentDate);

  if (existingDataIndex !== -1) {
    // Дата уже существует в массиве, найдем параметр с таким же label
    const existingParamIndex = userEvents.bodyParams[existingDataIndex].params.findIndex(param => param.label === activeParam.value.label);

    if (existingParamIndex !== -1) {
      // Параметр с таким label уже существует, обновим его значение
      userEvents.bodyParams[existingDataIndex].params[existingParamIndex].value = inputValue.value;
    } else {
      // Параметр с таким label не существует, добавим новый объект параметра
      userEvents.bodyParams[existingDataIndex].params.push({
        label: activeParam.value.label,
        value: inputValue.value
      });
    }
  } else {
    // Дата не существует в массиве, добавим новый объект данных
    const collectedData = {
      id: uid(15),
      date: currentDate,
      params: [
        {
          label: activeParam.value.label,
          value: inputValue.value
        }
      ]
    };

    userEvents.bodyParams.push(collectedData);
  }

  inputValue.value = null;
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
        <Loading v-if="isLoading" />
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

        <div class="body-params__chart" />
      </div>
    </div>
  </div>
</template>
