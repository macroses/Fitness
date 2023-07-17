import { supabase } from '@/lib/supabaseClient'

const pushWorkout = async (userData, isLoading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    isLoading.value = true
    const { user } = session

    const updated = {
      userId: user.id,
      ...userData
    }

    const { data, error } = await supabase.from('workouts').insert(updated)

    if (error) throw new Error(error.message)

  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

// const updateProfile = async (userData, isLoading) => {
//   const {
//     data: { session }
//   } = await supabase.auth.getSession()
//
//   try {
//     isLoading.value = true
//     const { user } = session
//
//     const updates = {
//       id: user.id,
//       ...userData,
//       updated_at: new Date()
//     }
//
//     console.log(userData.updated_at)
//
//     const { error } = await supabase.from('profiles').upsert(updates)
//
//     if (error) throw error
//   } catch (error) {
//     console.log(error.message)
//   } finally {
//     isLoading.value = false
//   }
// }

export { pushWorkout }
