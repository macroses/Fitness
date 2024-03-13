<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

const props = defineProps({
  buttons: {
    type: Array,
    default: () => []
  },
  isFlexible: {
    type: Boolean,
    default: false
  }
})

const activeButton = ref(0)

const shadowBtn = ref(null)
const buttonItem = ref(null)
const tabStyle = ref(null)

const activateButton = index => (activeButton.value = index)

const calculateTabStyle = () => {
  if (buttonItem.value && shadowBtn.value) {
    const activeButtonRect = buttonItem.value[activeButton.value].getBoundingClientRect()
    const parentRect = shadowBtn.value.parentNode.getBoundingClientRect()
    const width = `${activeButtonRect.width}px`
    const left = `${activeButtonRect.left - parentRect.left - 1}px`

    tabStyle.value = `width: ${width}; left: ${left};`
  }
}

watchEffect(calculateTabStyle)

onMounted(() => window.addEventListener('resize', calculateTabStyle))
onUnmounted(() => window.removeEventListener('resize', calculateTabStyle))
</script>

<template>
  <div
    class="button-group"
    :class="{ 'button-group--flexible': isFlexible }"
  >
    <button
      ref="buttonItem"
      v-for="(item, index) in buttons"
      :key="item.id"
      class="button-group__item"
      :class="{ active: item.id === activeButton }"
      @click="$emit('getButton', item.id); activateButton(index)"
    >
      {{ item.value }}
    </button>
    <div
      ref="shadowBtn"
      class="shadow-btn"
      :style="tabStyle"
    />
  </div>
</template>

<style scoped src="./style.css" />
