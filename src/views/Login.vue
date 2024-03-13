<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'
import { useEventsStore } from '@/stores/userEvents/userEvents.js'
import { login, signInWithGitHub } from '@/composables/authorization.js'

const router = useRouter()
const formState = reactive({
  email: null,
  password: null,
  errorMessage: null
})

const userEvents = useEventsStore()
const loading = ref(false)

const loginEmail = async () => {
  await login(formState.email, formState.password, loading)
  await userEvents.fetchEventHandler()
  router.push('/')
}

const isButtonDisabled = computed(() => Boolean(formState.errorMessage))

const githubAuth = async () => {
  await signInWithGitHub(loading)
  router.push('/')
}
</script>

<template>
  <form
    class="form__auth"
    @submit.prevent="loginEmail"
  >
    <h1 class="form__header">Login</h1>
    <Input
      v-model="formState.email"
      label-placeholder="Email"
      type="email"
    />
    <Input
      type="password"
      v-model="formState.password"
      label-placeholder="Password"
    />

    <div class="social-auth">
      <Button
        type="button"
        @click="githubAuth"
        transparent
      >
        <Icon
          icon-name="github"
          width="28px"
        />
      </Button>
    </div>

    <div class="form__submit">
      <Button
        type="submit"
        :loading="loading"
        :disabled="isButtonDisabled"
      >
        Submit
      </Button>
      <p>
        Do not have an account?
        <RouterLink
          to="/register"
          class="form-redirect"
        >
          Register
        </RouterLink>
      </p>
    </div>
  </form>
</template>
