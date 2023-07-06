<script setup>
import { ref, computed } from 'vue'

defineProps({
  tabs: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['activeTab'])

const activeTab = ref(0)
const tabRect = ref(null)
const tabsLine = ref(null)

const changeActiveTab = (index) => {
  activeTab.value = index
  emit('activeTab', activeTab.value)
}

const tabStyle = computed(() => {
  if (tabRect.value && activeTab.value !== null) {
    const activeTabRect = tabRect.value[activeTab.value].getBoundingClientRect()
    const parentRect = tabsLine.value.parentNode.getBoundingClientRect()
    const width = `${activeTabRect.width}px`
    const left = `${activeTabRect.left - parentRect.left}px`
    return `width: ${width}; left: ${left};`
  }
  return ''
})
</script>

<template>
  <div class="tabs-parent">
    <ul class="tabs">
      <li
        ref="tabRect"
        v-for="(tab, index) in tabs"
        :key="tab.id"
        class="tabs__item"
        :class="{ active: activeTab === index }"
        @click="changeActiveTab(index)"
      >
        {{ tab.tabTitle }}
      </li>
    </ul>
    <div ref="tabsLine" class="tabs-line" :style="tabStyle" />
  </div>
</template>

<style src="./style.css"></style>
