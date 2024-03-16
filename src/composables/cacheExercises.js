import { getCollection } from '@/api/getCollection.js'
import { tableSubscriber } from '../api/tableSubscriber.js'

const cacheExercises = async cacheKey => {
  const cachedData = localStorage.getItem(cacheKey)

  !cachedData
    ? await getAndCacheCollection()
    : tableSubscriber('*', 'public', 'exercises', 'exercisesCache')

  async function getAndCacheCollection() {
    const data = await getCollection('exercises', '*')
    localStorage.setItem(cacheKey, JSON.stringify(data))
  }
}

export { cacheExercises }
