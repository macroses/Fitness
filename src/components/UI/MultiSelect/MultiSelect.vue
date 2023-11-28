<script setup>
// это компонент мультиселекта. Допиши его так, чтобы он принимал массив объектов вида:
// { id: 0, value: "Biceps" },
// { id: 1, value: "Triceps" },
// и т.д.
// При клике на элемент списка он должен добавляться в список выбранных элементов.
// При клике на выбранный элемент он должен удаляться из списка выбранных элементов.

import { ref } from 'vue'

defineProps({
  multiselectList: {
    type: Array,
    default: () => [],
    required: true
  }
})

const selectedItems = ref([])
const pushItem = item => selectedItems.value.push(item)
</script>

<template>
  <div class="multiselect">
    <div class="multiselect__value">
      <span
        v-for="item in selectedItems"
        :key="item.id"
        class="multiselect__item"
      >
        {{ item.value }}
      </span>
    </div>
    <div class="multiselect__parent">
      <ul class="multiselect__list">
        <li
          v-for="item in multiselectList"
          :key="item.id"
          class="multiselect__item"
          @click="pushItem(item)"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped src="./style.css" />