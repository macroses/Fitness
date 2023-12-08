<script setup>
import { reactive, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  multiselectList: {
    type: Array,
    default: () => [],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  isSingleSelect: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['getSelectedItems', 'removeSelectedItem'])
const isDropdownVisible = ref(false)
const multiselectDropdown = ref(null)

const state = reactive({
  selectedItems: [],
  matchedItems: props.multiselectList
})

const selectItem = (item) => {
  isDropdownVisible.value = false

  if (!state.selectedItems.includes(item)) {
    if (props.isSingleSelect) {
      state.selectedItems = [item]
      emit('getSelectedItems', state.selectedItems)

      return
    }

    state.selectedItems.push(item)
    state.matchedItems = state.matchedItems.filter(matchedItem => matchedItem !== item)
    emit('getSelectedItems', state.selectedItems)
  }
}

const removeItem = (item) => {
  if (props.isSingleSelect) {
    state.selectedItems = state.selectedItems.filter(selectedItem => selectedItem !== item)
    emit('removeSelectedItem', item)

    return
  }

  state.selectedItems = state.selectedItems.filter(selectedItem => selectedItem !== item)
  state.matchedItems.unshift(item)
}

watch(() => props.disabled, () => {
  state.selectedItems = []
  isDropdownVisible.value = false
})

onClickOutside(multiselectDropdown, () => isDropdownVisible.value = false)
</script>

<template>
  <div
    :class="{ 'multiselect--disabled': disabled }"
    class="multiselect"
  >
    <div
      class="multiselect__value"
      @click="isDropdownVisible = !isDropdownVisible"
    >
      <div
        v-if="!state.selectedItems.length"
        class="multiselect__placeholder"
      >
        {{ label }}
        <Icon
          icon-name="angle-down"
          width="13px"
        />
      </div>
      <div
        class="multiselect__item"
        v-for="item in state.selectedItems"
        :key="item"
      >
        {{ item.value }}
        <Icon
          icon-name="xmark"
          width="13px"
          @click="removeItem(item)"
        />
      </div>
    </div>
    <ul
      ref="multiselectDropdown"
      v-if="isDropdownVisible"
      class="multiselect__dropdown"
    >
      <li
        class="multiselect__dropdown-item"
        v-for="item in state.matchedItems"
        :key="item.id"
        @click.stop="selectItem(item)"
      >
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<style scoped src="./style.css" />