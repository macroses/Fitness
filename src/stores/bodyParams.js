import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getProfileColumn, updateProfile } from '@/composables/profile.js'
import dayjs from 'dayjs'
import { uid } from 'uid'
import { BODY_PARAMS } from '@/constants/BODY_PARAMS.js'

export const bodyParamsStore = defineStore('bodyParams', () => {
  const bodyParams = ref(null)
  const activeBodyField = ref(0)
  const eventsLoading = ref(false)

  const fetchEventHandler = async () => {
    await getProfileColumn(
      bodyParams,
      eventsLoading,
      'body_params'
    )
  }

  const pushBodyParamsToBase = async (inputValue, activeParam, isLoading) => {
    const existingData = bodyParams.value.find(item => dayjs(item.date).isSame(dateStore.date, 'day'))

    if (existingData) {
      // Дата уже существует в массиве
      const hasExistingParam = existingData.params.some(param => param.label === activeParam.value.label)

      if (hasExistingParam) {
        // Параметр с таким label уже существует, обновим его значение
        existingData.params.find(param => param.label === activeParam.value.label).value = inputValue.value
      } else {
        // Параметр с таким label не существует, добавим новый объект параметра
        existingData.params.push({
          label: activeParam.value.label,
          value: inputValue.value
        })
      }
    } else {
      // Дата не существует в массиве, добавим новый объект данных
      const collectedData = {
        id: uid(15),
        date: dateStore.date,
        params: [{
          label: activeParam.value.label,
          value: inputValue.value
        }]
      }

      bodyParams.value.push(collectedData)
    }

    await updateProfile(
      null,
      isLoading,
      'body_params',
      bodyParams.value
    )
  }

  const activeParam = computed(() => BODY_PARAMS.find(param => param.id === activeBodyField.value))

  const filteredParamsByProp = computed(() => {
    // отфильтровали по типу (вес, рост итд)
    const resultArray = bodyParams.value?.filter(item => {
      return item.params.some(param => param.label === activeParam.value?.label)
    })

    return resultArray?.map(item => ({
      id: item.id,
      date: item.date,
      params: item.params.filter(param => param.label === activeParam.value?.label)
    }))
      .sort((a, b) => dayjs(b.date) - dayjs(a.date))
  })

  return {
    bodyParams,
    fetchEventHandler,
    pushBodyParamsToBase,
    filteredParamsByProp
  }
})