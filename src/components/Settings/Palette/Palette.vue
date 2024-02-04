<script setup>
import ColorTheme from '@/components/ColorTheme/ColorTheme.vue'

const palette = [
  { id: 0, value: 'Default', color: '26 92 255' },
  { id: 1, value: 'Red', color: '255 69 58' },
  { id: 2, value: 'Orange', color: '196 84 0' },
  { id: 3, value: 'Yellow', color: '168 141 6' },
  { id: 4, value: 'Green', color: '37 158 67' },
  { id: 5, value: 'Teal', color: '100 210 255' },
  { id: 6, value: 'Indigo', color: '94 92 230' },
  { id: 7, value: 'Purple', color: '191 90 242' },
  { id: 8, value: 'Brown', color: '162 132 94' }
]

const changeColorTheme = color => {
  document.documentElement.style.setProperty('--accent-color', color)
  localStorage.setItem('palette-color', color)
}
</script>

<template>
  <div class="settings__content-item">
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
</template>

<style src="./style.css" />
