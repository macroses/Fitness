import { supabase } from '@/lib/supabaseClient'

const getExercises = async (tableName, loading) => {
  try {
    loading.value = true
    const { data: exercises, error } = await supabase.from('exercises').select('*')

    if (error) throw error

    dataExercises.value = exercises
  } catch (e) {
    console.log(e.message)
  } finally {
    loading.value = false
  }
}

export { getExercises }
