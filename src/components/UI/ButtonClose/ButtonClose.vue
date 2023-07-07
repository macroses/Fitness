<script setup>
import Icon from '@/components/UI/Icon/Icon.vue'

defineProps({
  leftPosition: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="{ left: leftPosition }" />
</template>

<style scoped src="./style.css" />
