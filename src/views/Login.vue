<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'

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

    loading.value = false
    if (error) throw error
    router.push('/')
  } catch (error) {
    formState.errorMessage = error.message
  }

  setTimeout(() => {
    formState.errorMessage = null
  }, 3000)
}

const isButtonDisabled = computed(() => Boolean(formState.errorMessage))
</script>

<template>
  <form class="form__auth" @submit.prevent="login">
    <transition name="clip">
      <Notification v-if="formState.errorMessage" :message="formState.errorMessage" error />
    </transition>

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

<style scoped>
.clip-enter-active,
.clip-leave-active {
  transition: all 0.25s ease;
}

.clip-enter-from {
  clip-path: circle(0% at 80% 35%);
}

.clip-leave-to {
  max-height: 0;
  clip-path: circle(0% at 80% 35%) !important;
}
</style>
