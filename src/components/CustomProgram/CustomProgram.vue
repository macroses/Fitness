<script setup>
import { musclesGroups } from '@/constants/MUSCLES.js'
import { WEEK } from '@/constants/WEEK.js'
import MultiSelect from '@/components/UI/MultiSelect/MultiSelect.vue'

// дни недели на dayjs

const getStartDate = date => {
  console.log(date)
}

const maskDate = (event) => {
  let value = event.target.value;
  value = value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2");
  event.target.value = value;
}
</script>

<template>
  <div class="custom-program">
    <div class="custom-program__form">
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          <Icon icon-name="file-signature" width="15px"/>
          Program name
        </div>
        <Input
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          <Icon icon-name="folder-heart" width="15px"/>
          Muscle groups in program
        </div>
        <MultiSelect
          :multiselect-list="musclesGroups"
          label="Muscles groups"
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          <Icon icon-name="arrows-rotate" width="15px"/>
          Training frequency
        </div>
        <MultiSelect
          :multiselect-list="WEEK"
          label="Days of the week"
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          <Icon icon-name="calendar-arrow-down" width="15px"/>
          Program duration
        </div>
        <div class="calendar-period">
          <Input type="date" pattern="\d{1}-\d{1}-\d{1}"/>
          <Input type="date" />
        </div>
      </div>
    </div>
    <div class="custom-program__details"></div>
  </div>
</template>

<style scoped src="./style.css" />