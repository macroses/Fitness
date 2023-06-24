<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { signOut } from '@/composables/profile'
import { getSession } from '@/composables/getSession'
import Avatar from '@/components/UI/Avatar/Avatar.vue'
import Icon from '@/components/UI/Icon/Icon.vue'
import router from '@/router'

const { session } = getSession()

const loading = ref(true)
const userMenu = ref(null)
const isDropdownVisible = ref(false)

const handleSignOut = async () => {
  await signOut(loading)
  isDropdownVisible.value = false
}
const redirectToAccount = () => {
  router.push('/account')
  isDropdownVisible.value = false
}

onClickOutside(userMenu, () => (isDropdownVisible.value = false))
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrap">
        <RouterLink
          to="/"
          class="header__logo"
        >
          <img
            src="/Sports.svg"
            alt="logo"
          >
        </RouterLink>

        <div class="header__user">
          <nav class="header__nav">
            <RouterLink to="/docs">
              Docs
            </RouterLink>
            <RouterLink to="/">
              Blog
            </RouterLink>
          </nav>
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
                @click="redirectToAccount"
                class="user-dropdown__item"
              >
                <Icon
                  icon-name="person"
                  width="20px"
                />
                Account
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

<style scoped src="./style.css"></style>
