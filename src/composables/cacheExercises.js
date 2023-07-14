import { onMounted, ref } from 'vue'
import { getCollection } from '@/composables/getCollection'

const cacheExercises = (dataExercises, loading) => {
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
    await getCollection('exercises', '*', loading, dataExercises)
    sessionStorage.setItem(cacheKey, JSON.stringify(dataExercises.value))
  }
}

export { cacheExercises }
