<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { signOut } from '@/composables/profile'
import { getSession } from '@/composables/getSession'
import router from '@/router'
import { useEventsStore } from '@/stores/userEvents/userEvents.js'
import { temporaryWorkoutStore } from '@/stores/temporaryWorkout.js'

const { session } = getSession()

const loading = ref(true)
const userMenu = ref(null)
const isDropdownVisible = ref(false)
const userEvents = useEventsStore()
const useTemporaryWorkout = temporaryWorkoutStore()
let scrollPosition = ref(0)

const checkScroll = () => scrollPosition.value = window.pageYOffset || document.documentElement.scrollTop

const handleSignOut = async () => {
  await signOut(loading)
  isDropdownVisible.value = false
  userEvents.events = []
  localStorage.removeItem('workouts')
  localStorage.removeItem('bodyParams')
  router.push('/login')
}
const redirectToPage = page => {
  router.push(page)
  isDropdownVisible.value = false
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  useTemporaryWorkout.loadFromLocalStorage()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

onClickOutside(userMenu, () => (isDropdownVisible.value = false))
</script>

<template>
  <header
    class="header"
    :class="{ scrolled: scrollPosition > 0 }"
  >
    <div class="container">
      <div class="header__wrap">
        <RouterLink
          to="/"
          class="header__logo"
        >
          Plinx
        </RouterLink>
        <div class="header__user">
          <TemporaryWorkout
            v-if="useTemporaryWorkout.temporaryWorkout"
          />
          <Avatar
            v-if="session"
            @click="isDropdownVisible = true"
          />
          <div
            ref="userMenu"
            class="user-dropdown__content"
            :class="{ 'user-menu--visible': isDropdownVisible }"
          >
            <ul class="user-dropdown">
              <li
                @click="redirectToPage('/settings')"
                class="user-dropdown__item"
              >
                <Icon
                  icon-name="gear"
                  width="20px"
                />
                Settings
              </li>
              <li
                @click="handleSignOut"
                class="user-dropdown__item"
              >
                <Icon
                  icon-name="right-from-bracket"
                  width="20px"
                />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style src="./style.css"></style>
