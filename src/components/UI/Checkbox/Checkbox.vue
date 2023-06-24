<script setup>
import { uid } from 'uid'
import { computed } from 'vue'

// <Checkbox label="test checkbox" v-model="testCheckbox" />

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const uniqueId = uid(10)
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="checkbox-parent">
    <div class="checkbox-content">
      <div class="checkbox">
        <input
          class="checkbox-component"
          type="checkbox"
          :id="uniqueId"
          v-model="model"
          :checked="modelValue"
        />
        <div class="checkbox-effect" :class="{ active: modelValue }">
          <div class="checkbox-icon">
            <div class="line1"></div>
            <div class="line2"></div>
          </div>
        </div>
      </div>

      <label :for="uniqueId" class="checkbox-label">{{ label }}</label>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
