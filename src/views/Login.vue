<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'
import { toast } from 'vue3-toastify'

const router = useRouter()
const formState = reactive({
  email: null,
  password: null,
  errorMessage: null
})

const loading = ref(false)

const login = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password
    })

    if (error) throw error
    router.push('/')
  } catch (error) {
    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
  } finally {
    loading.value = false
  }
}

const isButtonDisabled = computed(() => Boolean(formState.errorMessage))
</script>

<template>
  <form class="form__auth" @submit.prevent="login">
    <h1 class="form__header">Login</h1>
    <Input v-model="formState.email" value="" label-placeholder="Email" width="350px" />
    <Input
      type="password"
      v-model="formState.password"
      label-placeholder="Password"
      width="350px"
    />

    <div class="form__submit">
      <Button type="submit" :loading="loading" :disabled="isButtonDisabled"> Submit </Button>
      <p>
        Do not have an account?
        <RouterLink to="/register" class="form-redirect"> Register </RouterLink>
      </p>
    </div>
  </form>
</template>
