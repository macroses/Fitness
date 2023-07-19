import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const pushEvent = async userData => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    const { user } = session

    const updated = {
      user_id: user.id,
      ...userData
    }

    const { error } = await supabase.from('workouts').insert(updated)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
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

    userData.value = workouts
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const deleteEvent = async (tableName, nameOfId, id, loading) => {
  const status = ref(0)

  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    status.value = 1
    loading.value = true
    const { user } = session

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq(nameOfId, id)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)
    status.value = 2
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }

  return { status }
}

export { pushEvent, getWorkouts, deleteEvent }
