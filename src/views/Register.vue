<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'

const router = useRouter()
const formState = reactive({
  email: null,
  password: null,
  confirmPassword: null
})

const loading = ref(false)

const register = async () => {
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
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
    }

    return
  }
  toast.error('Password do not match', { position: toast.POSITION.TOP_CENTER })
}


  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
</script>

<template>
  <form
    class="form__auth"
    @submit.prevent="register"
  >
    <h1 class="form__header">
      Register
    </h1>
    <Input
      v-model="formState.email"
      label-placeholder="Email"
    />
    <Input
      type="password"
      v-model="formState.password"
      label-placeholder="Password"
    />
    <Input
      type="password"
      v-model="formState.confirmPassword"
      label-placeholder="Password"
      width="350px"
    />

    <button type='button' @click="signInWithGitHub">github</button>

    <div class="form__submit">
      <Button
        type="submit"
        :loading="loading"
      >
        Submit
      </Button>
      <p>
        Already registered?
        <RouterLink
          to="/login"
          class="form-redirect"
        >
          Login
        </RouterLink>
      </p>
    </div>
  </form>
</template>
