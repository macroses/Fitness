<script setup>
import { computed, ref } from 'vue'
import AccountSettings from '@/components/Settings/AccountSettings/AccountSettings.vue'
import Palette from '@/components/Settings/Palette/Palette.vue'
import Calculators from '@/components/Settings/Calculators/Calculators.vue'

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

// const deleteUserAccount = async () => {
//   const { data, error } = await supabase.auth.admin.deleteUser(
//     '715ed5db-f090-4b8c-a067-640ecee36aa0'
//   )
// }
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
          <component :is="tabContent" />
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
