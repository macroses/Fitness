import { supabase } from '@/lib/supabaseClient'

const getProfile = async (userData, isLoading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    isLoading.value = true
    const { user } = session

    const { data, error, status } = await supabase
      .from('profiles')
      .select(Object.keys(userData).join(','))
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      for (const key in userData) {
        if (data.hasOwnProperty(key)) {
          userData[key] = data[key]
        }
      }
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

const updateProfile = async (userData, isLoading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    isLoading.value = true
    const { user } = session

    const updates = {
      id: user.id,
      ...userData,
      updated_at: new Date()
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

const signOut = async loading => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

export { getProfile, updateProfile, signOut }
