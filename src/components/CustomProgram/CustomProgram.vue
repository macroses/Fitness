<script setup>
import { musclesGroups } from '@/constants/MUSCLES.js'
import MultiSelect from '@/components/UI/MultiSelect/MultiSelect.vue'
import { reactive, ref } from 'vue'

const programData = reactive({
  name: '',
  musclesGroups: [],
  trainingFrequency: [],
  programDuration: {
    start: '',
    end: ''
  }
})

const musclesGroupsList = ref(JSON.parse(JSON.stringify(musclesGroups)))

const removeMuscleItem = item => {
  item.selected = false
  programData.musclesGroups = programData.musclesGroups.filter((muscle) => muscle.id !== item.id)
}

const addMuscleGroup = item => {
  if (programData.musclesGroups.some((muscle) => muscle.id === item.id)) return

  item.selected = true
  programData.musclesGroups.push(item)
}
</script>

<template>
  <div class="custom-program">
    <div class="custom-program__form">
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          Program name
        </div>
        <Input
          v-model="programData.name"
          @clear="programData.name = ''"
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          Muscle groups in program
        </div>
        <MultiSelect
          :multiselect-list="musclesGroupsList"
          label="Muscles groups"
          @remove-items="removeMuscleItem"
          @get-items="addMuscleGroup"
          :chosen-items="programData.musclesGroups"
        />
      </div>
      <div class="custom-program__item">
        <div class="custom-program__item-title">
          Training frequency
        </div>
<!--        <MultiSelect-->
<!--          :multiselect-list="WEEK"-->
<!--          label="Days of the week"-->
<!--        />-->
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
    <div class="custom-program__details">
      {{ programData }}
    </div>
  </div>
</template>

<style scoped src="./style.css" />