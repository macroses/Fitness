import { getCollection } from '@/composables/getCollection'

const cacheExercises = async cacheKey => {
  const cachedData = sessionStorage.getItem(cacheKey)

  if (!cachedData || !cachedData[cacheKey]) {
    setTimeout(() => {
      getAndCacheCollection()
    }, 100)
  }

  async function getAndCacheCollection() {
    const dataExercises = await getCollection('exercises', '*')
    sessionStorage.setItem(cacheKey, JSON.stringify(dataExercises))
  }
}

export { cacheExercises }
