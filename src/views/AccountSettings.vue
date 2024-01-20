<script setup>
import { ref } from 'vue'
import ColorTheme from '@/components/ColorTheme/ColorTheme.vue'
import Cookies from 'js-cookie'

const activeTab = ref(0)
const transitionName = ref('')

const tabs = [
  { id: 0, value: 'Account' },
  { id: 1, value: 'UI' }
]

const palette = [
  { id: 0, value: 'Default', color: '26 92 255' },
  { id: 1, value: 'Red', color: '255 69 58' },
  { id: 2, value: 'Orange', color: '196 84 0' },
  { id: 3, value: 'Yellow', color: '168 141 6' },
  { id: 4, value: 'Green', color: '48 209 88' },
  { id: 5, value: 'Teal', color: '100 210 255' },
  { id: 6, value: 'Indigo', color: '94 92 230' },
  { id: 7, value: 'Purple', color: '191 90 242' },
  { id: 8, value: 'Brown', color: '162 132 94' }
]

const changeColorTheme = color => {
  document.documentElement.style.setProperty('--accent-color', color)
  Cookies.set('palette-color', color)
}

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
            <Button> Delete </Button>
          </div>
          <div
            v-else-if="activeTab === 1"
            class="settings__content-item"
          >
            <div class="settings__content-subject">
              <h2 class="settings__content-header">Color theme</h2>
              <ColorTheme />
            </div>
            <div class="settings__content-subject">
              <h2 class="settings__content-header">Palette</h2>
              <ul class="palette-list">
                <li
                  v-for="{ id, color, value } in palette"
                  :key="id"
                  class="palette-item"
                  @click="changeColorTheme(color)"
                >
                  <div
                    :style="`background-color: rgb(${color})`"
                    class="palette-item__color"
                  ></div>
                  <span class="palette-item__name">{{ value }}</span>
                </li>
              </ul>
            </div>
          </div>
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

.palette-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.palette-item {
  display: flex;
  gap: 8px;
  cursor: pointer;

  &:hover .palette-item__color {
    scale: 1.1;
  }
}

.palette-item__color {
  width: 24px;
  height: 24px;
  border-radius: 9px;
  transition: scale 0.25s ease-in-out;
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
