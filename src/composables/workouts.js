import dayjs from 'dayjs'
import { supabase } from '@/lib/supabaseClient'

const pushEvent = async (tableName, userData, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const updated = {
      user_id: user.id,
      ...userData
    }

    const { error } = await supabase.from(tableName).insert(updated)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const getWorkouts = async (userData, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true

    const { user } = session

    const { data: workouts, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)

    userData.value = workouts.map(workout => ({
      ...workout,
      date: dayjs(workout.date)
    }))
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const deleteEvent = async (tableName, nameOfId, id, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq(nameOfId, id)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const updateEvent = async (tableName, nameOfId, eventId, updatedObject, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const { error } = await supabase
      .from(tableName)
      .update(updatedObject)
      .eq(nameOfId, eventId)
      .eq('user_id', user.id)
      .select()

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const updateSeveralRows = async (tableName, rowsArray, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const { error } = await supabase
      .from(tableName)
      .update(rowsArray)
      .eq('user_id', user.id)
      .select()

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

export { pushEvent, getWorkouts, deleteEvent, updateEvent, updateSeveralRows }
