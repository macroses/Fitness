<script setup>
import { uid } from 'uid'
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  }
})

const uniqueId = uid(10)
const isChecked = computed(() => props.value === props.modelValue)

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="radio-parent">
    <div class="radio-content">
      <div class="radio">
        <input
          class="radio-component"
          type="radio"
          :id="uniqueId"
          :value="value"
          @input="$emit('update:modelValue', $event.target.value)"
          :checked="isChecked"
        />
        <span class="radio-effect" :class="{ active: isChecked }" />
      </div>

      <label :for="uniqueId" class="radio-label">{{ label }}</label>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
