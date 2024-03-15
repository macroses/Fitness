<script setup>
import { computed, ref } from 'vue'
import SETTINGS_TABS from '@/constants/SETTINGS_TABS'

const activeTab = ref(0)
const transitionName = ref('')
const isSidebarOpen = ref(false)
const sidebar = ref(null)

const changeTab = id => {
  transitionName.value = activeTab.value < id ? 'slideDown' : 'slideUp'
  activeTab.value = id
}

const tabContent = computed(() => {
  switch (activeTab.value) {
    case 0:
      return AccountSettings
    case 1:
      return Palette
    case 2:
      return Calculators
  }
})
</script>

<template>
  <div class="container">
    <div class="settings">
      <ul
        ref="sidebar"
        class="settings__aside-list"
        :class="{ active: isSidebarOpen }"
      >
        <li
          v-for="(tab, index) in SETTINGS_TABS"
          :key="tab.id"
          class="settings__aside-item"
          :class="{ active: activeTab === index }"
        >
          <button
            class="settings__aside-btn"
            @click="changeTab(tab.id)"
          >
            <Icon
              :icon-name="tab.icon"
              width="18px"
            />
            <span class="settings__aside-text">{{ tab.value }}</span>
          </button>
        </li>
      </ul>
      <div class="settings__content">
        <Transition
          mode="out-in"
          :name="transitionName"
        >
          <component :is="tabContent" />
        </Transition>
      </div>
    </div>
  </div>
</template>
