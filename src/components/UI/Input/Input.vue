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
  small: {
    type: Boolean,
    default: false
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
  noClear: {
    type: Boolean,
    default: false
  },
  enterkeyhint: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['focus', 'blur', 'update:modelValue', 'clear'])

const inp = ref(null)

const inpFocus = () => {
  inp.value.select()
  emit('focus')
}

const clear = () => {
  inp.value.focus()
  emit('clear')
}

const modelValue = defineModel({
  type: [String, Number, null],
  required: true
})

const handleInput = (event) => {
  if (props.type !== 'number') {
    return
  }

  event.target.value = event.target.value
    .replace(/[a-zA-Zа-яА-Я]/g, '')
    .replace(',', '.')

  let value = event.target.value.replace(/,/g, '.')

  const firstDotIndex = value.indexOf('.')
  if (firstDotIndex !== -1) {
    const beforeDot = value.substring(0, firstDotIndex + 1)
    const afterDot = value.substring(firstDotIndex + 1)
    event.target.value = beforeDot + afterDot.replace(/\./g, '')
  }
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
        :class="{ small: small }"
        :inputmode="mode"
        :id="uniqueId"
        v-model="modelValue"
        @focus="inpFocus"
        @blur="$emit('blur')"
        @input="handleInput"
        autocomplete="new-password"
        :enterkeyhint
      />
      <label
        v-if="labelPlaceholder"
        :for="uniqueId"
        class="input-label"
        :class="{
          'input-label--hidden': modelValue && !labelFade,
          'input-label--fade': labelFade,
          'input-has-value': labelFade && modelValue
        }"
        >{{ labelPlaceholder }}</label
      >
      <button
        v-if="modelValue && !noClear"
        class="input-clear"
        @click="clear"
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

<style src="./style.css" />
