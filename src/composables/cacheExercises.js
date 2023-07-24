import { getCollection } from '@/composables/getCollection'

const cacheExercises = async (cacheKey, dataExercises, loading) => {
  const cachedData = sessionStorage.getItem(cacheKey)

  if (!cachedData) {
    await getAndCacheCollection()
  }

  async function getAndCacheCollection() {
    const dataExercises = await getCollection('exercises', '*', loading)
    sessionStorage.setItem(cacheKey, JSON.stringify(dataExercises))
  }
}

export { cacheExercises }
