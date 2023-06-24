import { supabase } from '@/lib/supabaseClient'

const getProfile = async (session, username, website, avatar_url, loading) => {
  try {
    loading.value = true
    const { user } = session.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select('username, website, avatar_url')
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      website.value = data.website
      avatar_url.value = data.avatar_url
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const updateProfile = async (session, username, website, avatar_url, loading) => {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date()
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
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
