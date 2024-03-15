import { supabase } from '@/lib/supabaseClient.js'
import { toast } from 'vue3-toastify'

const login = async (mail, pass, loading) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: mail,
      password: pass
    })

    if (error) throw error

  } catch (error) {
    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
  } finally {
    loading.value = false
  }
}

async function signInWithGitHub () {
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
}

export { login, signInWithGitHub }