import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getProfileColumn, updateProfile } from '@/composables/profile.js'
import dayjs from 'dayjs'
import { uid } from 'uid'
import { chosenDateStore } from '@/stores/chosenDate.js'

const BODY_PARAMS = 'body_params'

export const bodyParamsStore = defineStore('bodyParams', () => {
  const dateStore = chosenDateStore()

  const bodyParams = ref([])
  const activeBodyField = ref(JSON.parse(localStorage.getItem('bodyParams'))?.[0].id)
  const eventsLoading = ref(false)

  const fetchEventHandler = async () => {
    await getProfileColumn(bodyParams, eventsLoading, BODY_PARAMS)
  }

  const addParam = (params, activeParam, inputValue) => {
    const existingParam = params.find(param => param.label === activeParam.label)

    if (existingParam) {
      existingParam.value = inputValue.value

      return
    }

    params.push({
      label: activeParam.label,
      value: inputValue.value
    })
  }

  const pushBodyParamsToBase = async (inputValue, activeParam, isLoading) => {
    const existingData = bodyParams.value.find(item =>
      dayjs(item.date).isSame(dateStore.date, 'day')
    )

    if (existingData) {
      addParam(existingData.params, activeParam, inputValue)
    } else {
      const collectedData = {
        id: uid(15),
        date: dateStore.date,
        params: []
      }
      addParam(collectedData.params, activeParam, inputValue)
      bodyParams.value.push(collectedData)
    }

    try {
      await updateProfile(null, isLoading, BODY_PARAMS, bodyParams.value)
    } catch (error) {
      console.error(error)
    }
  }

  const activeParam = computed(() => {
    return JSON.parse(localStorage.getItem('bodyParams')).find(
      param => param.id === activeBodyField.value
    )
  })

  const filteredParamsByProp = computed(() => {
    // отфильтровали по типу (вес, рост итд)
    const resultArray = bodyParams.value?.filter(item => {
      return item.params.some(param => param.label === activeParam.value?.label)
    })

    return resultArray
      ?.map(item => ({
        date: item.date,
        params: item.params.filter(
          param => param.label === activeParam.value?.label
        )
      }))
      .sort((a, b) => dayjs(b.date) - dayjs(a.date))
  })

  const aggregateData = (data, numPoints) => {
    const aggregatedData = []
    const interval = Math.ceil(data.length / numPoints)

    for (let i = 0; i < numPoints; i++) {
      const startIndex = i * interval
      const endIndex = Math.min((i + 1) * interval, data.length)

      if (startIndex < endIndex) {
        const intervalData = data.slice(startIndex, endIndex)
        const average =
          intervalData.reduce((sum, item) => sum + Number(item.y), 0) /
          intervalData.length

        aggregatedData.push({
          x: intervalData[Math.floor(intervalData.length / 2)].x,
          y: average
        })
      }
    }

    return aggregatedData
  }

  const calculateTableCellContent = computed(() => {
    return filteredParamsByProp.value.map((param, index) => {
      const currentValue = param.params[0].value
      const nextValue = filteredParamsByProp.value[index + 1]?.params[0].value
      const isPositive =
        currentValue !== undefined && currentValue > (nextValue || 0)
      const isNegative =
        index !== 0 &&
        currentValue !== undefined &&
        currentValue < (nextValue || 0)
      const sign = isPositive
        ? 'arrow-up-right'
        : isNegative
        ? 'arrow-down-right'
        : ''

      return {
        content: currentValue !== undefined ? currentValue : '',
        date: param.date,
        sign: sign
      }
    })
  })

  return {
    bodyParams,
    fetchEventHandler,
    pushBodyParamsToBase,
    activeBodyField,
    activeParam,
    filteredParamsByProp,
    calculateTableCellContent,
    aggregateData
  }
})
