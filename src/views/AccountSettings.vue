<script setup>
import { ref } from 'vue'

const activeTab = ref(0)
const transitionName = ref('')

const tabs = [
  { id: 0, value: 'Account' },
  { id: 1, value: 'UI' },
  { id: 2, value: 'Calculators' }
]

const changeTab = id => {
  transitionName.value = activeTab.value < id ? 'slideDown' : 'slideUp'
  activeTab.value = id
}
</script>

<template>
  <div class="container">
    <div class="settings">
      <div class="settings__aside">
        <ul class="settings__aside-list">
          <li
            v-for="tab in tabs"
            :key="tab.id"
            class="settings__aside-item"
            @click="changeTab(tab.id)"
          >
            {{ tab.value }}
          </li>
        </ul>
      </div>
      <div class="settings__content">
        <Transition
          mode="out-in"
          :name="transitionName"
          appear
        >
          <div
            v-if="activeTab === 0"
            class="settings__content-item"
          >
            <h2 class="settings__content-header">Delete account</h2>
            <Button>Delete</Button>
          </div>
          <Palette v-else-if="activeTab === 1" />
          <Calculators v-else-if="activeTab === 2" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style>
.settings {
  display: grid;
  grid-template-columns: 250px 1fr;
  border-radius: 16px;
  margin-top: 16px;
}

.settings__content-header {
  font-size: 18px;
  margin-bottom: 8px;
}

.settings__content-subject {
  margin-bottom: 24px;
}

.slideUp-enter-active,
.slideUp-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.slideUp-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slideUp-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  overflow: hidden;
}

.slideDown-enter-active,
.slideDown-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.slideDown-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slideDown-leave-to {
  opacity: 0;
  transform: translateY(20px);
  overflow: hidden;
}
</style>
