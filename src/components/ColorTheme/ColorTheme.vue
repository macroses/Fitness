<script setup>
import toggleColorTheme from '@/composables/useColorTheme/useColorTheme.js'

const { userTheme, toggleTheme } = toggleColorTheme()
</script>

<template>
  <div class="switcher-box">
    <GroupInputs>
      <Radio
        v-model="userTheme"
        label="Light"
        name="theme"
        value="light-theme"
        @click="toggleTheme('light-theme')"
      />
      <Radio
        v-model="userTheme"
        label="Dark"
        name="theme"
        value="dark-theme"
        @click="toggleTheme('dark-theme')"
      />
      <Radio
        v-model="userTheme"
        label="System"
        name="theme"
        value="prefer"
        @click="toggleTheme('prefer')"
      />
    </GroupInputs>
  </div>
</template>
