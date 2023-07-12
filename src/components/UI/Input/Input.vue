<script setup>
import { uid } from 'uid'

const uniqueId = uid(10)

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  labelPlaceholder: {
    type: String,
    default: ''
  },
  labelFade: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: [String, Number]
  },
  modelValue: {
    type: [String, Number]
  }
})
</script>

<template>
  <div
    class="input-parent"
    :style="{ width: width }"
  >
    <div class="input-content">
      <input
        class="input-component"
        :type="type"
        :id="uniqueId"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      >
      <label
        v-if="labelPlaceholder"
        :for="uniqueId"
        class="input-label"
        :class="{
          'input-label--hidden': modelValue && !labelFade,
          'input-label--fade': labelFade,
          'input-has-value': labelFade && modelValue,
        }"
      >{{ labelPlaceholder }}</label>
      <button
        v-if="modelValue"
        class="input-clear"
        @click="$emit('clear')"
        type="button"
      >
        <Icon
          icon-name="xmark"
          width="18px"
        />
      </button>
    </div>
  </div>
</template>

<style src="./style.css"></style>
