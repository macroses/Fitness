<script setup>
import { computed, ref } from 'vue'
import AccountSettings from '@/components/Settings/AccountSettings/AccountSettings.vue'
import Palette from '@/components/Settings/Palette/Palette.vue'
import Calculators from '@/components/Settings/Calculators/Calculators.vue'
import { onClickOutside } from '@vueuse/core'

const activeTab = ref(0)
const transitionName = ref('')
const isSidebarOpen = ref(false)
const sidebar = ref(null)

const tabs = [
  { id: 0, value: 'Account', icon: 'user-alien' },
  { id: 1, value: 'UI', icon: 'palette' },
  { id: 2, value: 'Calculators', icon: 'calculator'}
]

const changeTab = id => {
  transitionName.value = activeTab.value < id ? 'slideDown' : 'slideUp'
  activeTab.value = id
  closeAside()
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

const openAside = () => {
  isSidebarOpen.value = true
  document.body.classList.add('blured')
}

const closeAside = () => {
  isSidebarOpen.value = false
  document.body.classList.remove('blured')
}

onClickOutside(sidebar, () => closeAside())
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
          v-for="(tab, index) in tabs"
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
