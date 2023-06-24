<script setup>
import { onBeforeUnmount, ref } from 'vue'

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

const btn = ref(null)

const buttonPress = (e) => {
  const offset = btn.value.getBoundingClientRect()
  const newX = e.clientX - offset.left
  const newY = e.clientY - offset.top
  const color = getComputedStyle(btn.value).backgroundColor
  let size = 0
  let opacity = 0.25

  const btnClick = () => {
    size += 8
    opacity -= 0.008
    btn.value.style.background = `${color} radial-gradient(circle at ${newX}px ${newY}px, rgba(1,8,22,${opacity}) ${size}%, transparent ${
      size + 2
    }%) no-repeat`
    if (size <= 300) {
      requestAnimationFrame(btnClick)
    } else {
      btn.value.style.background = ''
    }
  }
  btnClick()
}

onBeforeUnmount(() => {
  btn.value.style.background = ''
})
</script>

<template>
  <button
    v-if="!isLink"
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
