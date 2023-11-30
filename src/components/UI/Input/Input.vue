<script setup>
import { uid } from 'uid'
import { ref } from 'vue'

const uniqueId = uid(10)

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  min: {
    type: String,
    default: ''
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
  mode: {
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

const emit = defineEmits(['focus', 'blur', 'update:modelValue', 'clear'])

const inp = ref(null)

const inpFocus = () => {
  inp.value.select()
  emit('focus')
}
</script>

<template>
  <div
    class="input-parent"
    :style="{ width: width }"
  >
    <div class="input-content">
      <input
        ref="inp"
        class="input-component"
        :type="type"
        :inputmode="mode"
        :id="uniqueId"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        @focus="inpFocus"
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
        @click="$emit('clear'); inp.focus()"
        type="button"
      >
        <Icon
          icon-name="xmark"
          width="14px"
        />
      </button>
    </div>
  </div>
</template>

<style src="./style.css"></style>
