<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => ([])
  }
})

const emit = defineEmits(['activeTab'])

const activeTab = ref(0)

const changeActiveTab = index => {
  activeTab.value = index
  emit('activeTab', activeTab.value)
}
</script>

<template>
  <div class="tabs-parent">
    <ul class="tabs">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.id"
        class="tabs__item"
        :class="{ active: activeTab === index }"
        @click="changeActiveTab(index)"
      >
        <Icon
          :icon-name="tab.icon"
          width="15px"
        />
        {{ tab.tabTitle }}
      </li>
    </ul>
  </div>
</template>

<style src="./style.css"></style>
