<script setup>
import { readonly, ref } from 'vue'

const activeTabId = ref(0)

const tabs = readonly([
  { id: 0, tabTitle: 'All', icon: 'folder' },
  { id: 1, tabTitle: 'Favorites', icon: 'star' },
  { id: 2, tabTitle: 'Recent', icon: 'clock-rotate-left' }
])

const lottieAnimation = ref(null)
const direction = ref('reverse')

const toggleDirectionEnter = () => {
  lottieAnimation.value.setDirection('forward')
  play()
  direction.value = 'forward'
}

const toggleDirectionLeave = () => {
  pause()
  lottieAnimation.value.setDirection('reverse')
  play()
  direction.value = 'reverse'
}

const play = () => {
  lottieAnimation.value.play()
}
const pause = () => {
  lottieAnimation.value.pause()
}


const getActiveTab = id => activeTabId.value = id

</script>

<template>
  <div class="container">
    <Tabs
      :tabs="tabs"
      @activeTab="getActiveTab"
    />
    <Vue3Lottie
      ref="lottieAnimation"
      animation-link="lottie/folder.json"
      :height="200"
      :width="200"
      @mouseenter="toggleDirectionEnter"
      @mouseleave="toggleDirectionLeave"
      :auto-play="false"
      :loop="false"
    />
  </div>
</template>