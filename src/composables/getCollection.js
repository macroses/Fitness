import { supabase } from '@/lib/supabaseClient'

const getCollection = async (table, column, loading, arrayContainer) => {
  try {
    loading.value = true
    const { data: array, error } = await supabase.from(table).select(column)

    if (error) throw error

    return array
  } catch (e) {
    console.log(e.message)
  }
}

export { getCollection }
