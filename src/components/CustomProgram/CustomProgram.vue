<script setup>
import MultiSelect from '@/components/UI/MultiSelect/MultiSelect.vue'
import { musclesGroups } from '@/constants/MUSCLES.js'
// не жалеть времени на создание этого раздела!!!!

const getSelectedMuscles = (muscles) => {
  console.log(muscles)
}
</script>

<template>
  <div class="custom-program">
    <div class="custom-program__params">
      <div class="custom-program__form">
        <div class="custom-program__form-item">
          <Input label-placeholder="Program name"/>
        </div>
        <div class="custom-program__form-item">
          <MultiSelect
            :multiselect-list="musclesGroups"
            label="Choose muscles"
            @get-selected-items="getSelectedMuscles"
          />
        </div>
        <div class="custom-program__form-item">Периодичность тренировок в программе (пн, ср, пт)</div>
        <div class="custom-program__form-item">Продолжительность программы (например от текущей даты до 3 месяцев)</div>
        <div class="custom-program__form-item"></div>
        <div class="custom-program__form-item"></div>
        <div class="custom-program__form-item"></div>
        <div class="custom-program__form-item"></div>
        <div class="custom-program__form-item"></div>
        <div class="custom-program__form-item"></div>
        <div class="custom-program__form-item"></div>
        <div class="custom-program__form-item"></div>
      </div>
    </div>
    <div class="custom-program__details"></div>
  </div>
</template>

<style scoped src="./style.css" />