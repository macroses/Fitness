<script setup>
import { ref, onMounted, watch, computed, reactive } from 'vue'

const isVisible = ref(false)
const timer = ref(null)

const notificationData = reactive({
  header: computed(() => (props.error ? 'Error' : props.info ? 'Information' : 'Success')),
  iconName: computed(() => (props.error ? 'bug' : props.info ? 'circle-info' : 'circle-check'))
})

const props = defineProps({
  error: {
    type: Boolean,
    default: false
  },
  info: {
    type: Boolean,
    default: false
  },
  success: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  isVisible.value = true
  timer.value = setTimeout(() => {
    isVisible.value = false
  }, 3000)
})

watch(isVisible, val => {
  if (!val) {
    clearTimeout(timer.value)
  }
})
</script>

<template>
  <div
    v-if="isVisible"
    class="notification-parent"
  >
    <div
      class="notification-content"
      :class="{
        'notification--error': error,
        'notification--info': info,
        'notification--success': success,
      }"
    >
      <div class="notification-icon">
        <Icon
          width="20px"
          :icon-name="notificationData.iconName"
        />
      </div>
      <div class="notification-data">
        <div class="notification__header">
          {{ notificationData.header }}
        </div>
        <div class="notification-text">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./style.css"></style>
