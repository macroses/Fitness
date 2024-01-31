<script setup>
import { computed, ref } from 'vue'
import AccountSettings from '@/components/Settings/AccountSettings/AccountSettings.vue'
import Palette from '@/components/Settings/Palette/Palette.vue'
import Calculators from '@/components/Settings/Calculators/Calculators.vue'

const activeTab = ref(0)
const transitionName = ref('')
const isSidebarOpen = ref(false)

const tabs = [
  { id: 0, value: 'Account', icon: 'user-alien' },
  { id: 1, value: 'UI', icon: 'palette' },
  { id: 2, value: 'Calculators', icon: 'calculator'}
]

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
            {{ tab.value }}
          </button>
        </li>
      </ul>
      <div class="settings__content">
        <Button
          transparent
          @click="isSidebarOpen = true"
        >
          <Icon
            icon-name="gear"
            width="18px"
          />
        </Button>
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
