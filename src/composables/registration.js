import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()

const registration = async (formState, loading) => {
  if (formState.password === formState.confirmPassword) {
    try {
      loading.value = true
      const { error } = await supabase.auth.signUp({
        email: formState.email,
        password: formState.password
      })

      loading.value = false
      if (error) throw error
      router.push('/')
    } catch (error) {
      toast.error(error.message, { position: toast.POSITION.TOP_CENTER })
    }

    return
  }
  toast.error('Password do not match', { position: toast.POSITION.TOP_CENTER })
}

export { registration }
