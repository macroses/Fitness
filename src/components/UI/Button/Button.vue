<script setup>
defineProps({
  full: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  },
  transparent: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  isLink: {
    type: Boolean,
    default: false
  },
  path: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button
    v-if="!isLink"
    class="button"
    :disabled="disabled"
    :class="{
      'button--large': size === 'large',
      'button--sm': size === 'small',
      'button--disabled': disabled,
      'button--bordered': bordered,
      'button--loading': loading,
      'button--transparent': transparent
    }"
  >
    <slot />
    <div v-if="loading" class="loading" />
  </button>
  <RouterLink
    v-else
    :to="path"
    ref="btn"
    @click="buttonPress"
    class="button"
    :disabled="disabled"
    :class="{
      'button--large': size === 'large',
      'button--sm': size === 'small',
      'button--disabled': disabled,
      'button--bordered': bordered,
      'button--loading': loading
    }"
  >
    <slot />
    <div v-if="loading" class="loading" />
  </RouterLink>
</template>

<style scoped src="./style.css"></style>
