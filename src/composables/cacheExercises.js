import { onMounted } from 'vue'
import { getCollection } from '@/composables/getCollection'

const cacheExercises = (loading, dataExercises) => {
  const cacheKey = 'exercisesCache'

  onMounted(async () => {
    const cachedData = sessionStorage.getItem(cacheKey)

    if (cachedData) {
      dataExercises.value = JSON.parse(cachedData)
    } else {
      await getAndCacheCollection()
    }
  })

  const getAndCacheCollection = async () => {
    loading.value = true
    await getCollection('exercises', '*', loading, dataExercises)
    sessionStorage.setItem(cacheKey, JSON.stringify(dataExercises.value))
    loading.value = false
  }
}

export { cacheExercises }
