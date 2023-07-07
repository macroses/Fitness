<script setup>
import Header from '@/components/Header/Header.vue'
import { getUserId } from '@/composables/getUserId'

const { userId } = getUserId()
</script>

<template>
  <Header />
  <RouterView />
</template>
