<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'

const router = useRouter()
const formState = reactive({
  email: null,
  password: null,
  confirmPassword: null,
  errorMessage: null
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
      router.push('/login')
    } catch (error) {
      formState.errorMessage = error.message
      setTimeout(() => {
        formState.errorMessage = null
      }, 5000)
    }

    return
  }

  setTimeout(() => {
    formState.errorMessage = null
  }, 5000)

  formState.errorMessage = 'Password do not match'
}
</script>

<template>
  <form
    class="form__auth"
    @submit.prevent="register"
  >
    <div
      class="form__error"
      v-if="formState.errorMessage"
    >
      {{ formState.errorMessage }}
    </div>
    <h1 class="form__header">
      Register
    </h1>
    <Input
      v-model="formState.email"
      label-placeholder="Email"
      width="350px"
    />
    <Input
      type="password"
      v-model="formState.password"
      label-placeholder="Password"
      width="350px"
    />
    <Input
      type="password"
      v-model="formState.confirmPassword"
      label-placeholder="Password"
      width="350px"
    />

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
