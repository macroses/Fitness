import { onMounted, ref } from 'vue'
import { getCollection } from '@/composables/getCollection'

const cacheExercises = dataExercises => {
  const cacheKey = 'exercisesCache'
  const loading = ref(false)

  onMounted(async () => {
    const cachedData = sessionStorage.getItem(cacheKey)

    if (cachedData) {
      dataExercises.value = JSON.parse(cachedData)
    } else {
      await getAndCacheCollection()
    }
  })

  const getAndCacheCollection = async () => {
    await getCollection('exercises', '*', loading, dataExercises)
    sessionStorage.setItem(cacheKey, JSON.stringify(dataExercises.value))
  }
}

export { cacheExercises }
