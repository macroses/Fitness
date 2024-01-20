<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array
  }
})

const emit = defineEmits(['activeTab'])

const activeTab = ref(0)
const tabRect = ref(null)
const lottieAnimation = ref([])

const changeActiveTab = index => {
  activeTab.value = index
  emit('activeTab', activeTab.value)

  lottieAnimation.value.forEach(el => {
    el.stop()
  })

  lottieAnimation.value[activeTab.value].play()
}

onMounted(async () => {
  setTimeout(() => lottieAnimation.value[activeTab.value].play(), 100)
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
        <Vue3Lottie
          :ref="
            el => {
              lottieAnimation[index] = el
            }
          "
          :animation-link="tab.icon"
          :height="tab.size"
          :width="tab.size"
          :auto-play="false"
          :loop="false"
        />
        {{ tab.tabTitle }}
      </li>
    </ul>
  </div>
</template>

<style src="./style.css"></style>
