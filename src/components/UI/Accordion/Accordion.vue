<script setup>
import { ref } from 'vue'

const isActive = ref(false)
</script>

<template>
  <div class="accordion">
    <button
      class="accordion__header"
      @click="isActive = !isActive"
    >
      <slot name="accordion-header" />
      <span class="collapse__icon"></span>
    </button>
    <div
      class="accordion__wrapper"
      :class="{ active: isActive }"
    >
      <div class="accordion__content">
        <slot name="accordion-body" />
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
