<script setup>
import { uid } from 'uid'
import { computed, ref } from 'vue'

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
  },
  checked: {
    type: Boolean,
    default: false
  }
})

const checkFromProps = ref(props.checked)

const uniqueId = uid(10)
const isChecked = computed(() => {
  checkFromProps.value = false
  return props.value === props.modelValue
})

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
          :checked="checkFromProps || isChecked"
        >
        <span
          class="radio-effect"
          :class="{ active: isChecked || checkFromProps }"
        />
      </div>

      <label
        :for="uniqueId"
        class="radio-label"
      >{{ label }}</label>
    </div>
  </div>
</template>

<style src="./style.css"></style>
