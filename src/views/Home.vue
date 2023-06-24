<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const date = ref(dayjs())
const selectedValue = ref(dayjs())

const onSelect = value => {
  date.value = value
  selectedValue.value = value
}
const onPanelChange = value => {
  date.value = value
}
</script>

<template>
  <main>
    <div class="container">
      <div class="main-plate">
        <div class="main-plate__left">
          <!--          <div class="calendar">-->
          <!--            <a-alert-->
          <!--              :message="`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`"-->
          <!--            />-->
          <!--            <a-calendar-->
          <!--              :value="date"-->
          <!--              @select="onSelect"-->
          <!--              @panelChange="onPanelChange"-->
          <!--            />-->
          <!--          </div>-->
        </div>
        <div class="main-plate__right" />
      </div>
    </div>
  </main>
</template>
