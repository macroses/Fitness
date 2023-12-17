<script setup>
import { musclesGroups } from '@/constants/MUSCLES.js'
import { WEEK } from '@/constants/WEEK.js'
import MultiSelect from '@/components/UI/MultiSelect/MultiSelect.vue'
</script>

<template>
  <div class="custom-program">
    <div class="custom-program__form">
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          Program name
        </div>
        <Input
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          Muscle groups in program
        </div>
        <MultiSelect
          :multiselect-list="musclesGroups"
          label="Muscles groups"
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          Training frequency
        </div>
        <MultiSelect
          :multiselect-list="WEEK"
          label="Days of the week"
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          Program duration
        </div>
        <div class="calendar-period">
          <Input type="date"/>
          <Input type="date" />
        </div>
      </div>
    </div>
    <div class="custom-program__details"></div>
  </div>
</template>

<style scoped src="./style.css" />