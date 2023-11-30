<script setup>
import { reactive } from 'vue'
import { uid } from 'uid'

const newExercise = reactive({
  id: uid(10),
  name: '',
  muscles: [],
  type: null,
  main_muscle: null,
  equipment: [],
  load_type: null,
  level: null,
  description: '',
  force_type: null
})

const musclesGroups = [
  { id: 0, value: "Biceps" },
  { id: 1, value: "Triceps" },
  { id: 2, value: "Forearms" },
  { id: 3, value: "Shoulders" },
  { id: 4, value: "Chest" },
  { id: 5, value: "Back" },
  { id: 6, value: "Abs" },
  { id: 7, value: "Quads" },
  { id: 8, value: "Hamstrings" },
  { id: 9, value: "Calves" },
  { id: 10, value: "Glutes" },
  { id: 11, value: "Cardio" },
  { id: 12, value: "Full body" },
  { id: 13, value: "Other" }
]

const addMainMuscleGroup = async muscle => {
  newExercise.main_muscle = muscle[0].value
}

const addHelpersMuscleGroup = async muscle => {
  newExercise.muscles = muscle
}

const exerciseLevelData = [
  { id: 0, value: "Beginner" },
  { id: 1, value: "Intermediate" },
  { id: 2, value: "Professional" }
]
</script>

<template>
  <Modal
    width="600px"
    @close="$emit('close')"
    confirm-label="Create"
  >
    <template #modal-header>
      Create exercise
    </template>
    <template #modal-body>
      <div class="creating-modal__wr">
        <Input
          v-model="newExercise.name"
          label-placeholder="Exercise name"
          @clear="newExercise.name = ''"
        />
        <div class="creating-modal__item">
          <h3 class="creating-modal__item-title">Exercise type</h3>
          <GroupInputs>
            <Radio
              v-model="newExercise.type"
              label="Compound"
              name="loadType"
              value="Compound"
              checked
            />
            <Radio
              v-model="newExercise.type"
              label="Isolation"
              name="loadType"
              value="Isolation"
            />
          </GroupInputs>
        </div>
        <div class="creating-modal__item">
          <h3 class="creating-modal__item-title">Main muscle group and helpers</h3>
          <div class="creating-modal__muscles">
            <MultiSelect
              label="Main muscle"
              :multiselectList="musclesGroups"
              is-single-select
              @get-selected-items="addMainMuscleGroup"
            />
            <MultiSelect
              :disabled="newExercise.type === 'Isolation'"
              label="Helper muscles"
              :multiselectList="musclesGroups"
              @get-selected-items="addHelpersMuscleGroup"
            />
          </div>
        </div>
        <div class="creating-modal__item">
          <h3 class="creating-modal__item-title">Level</h3>
          <GroupInputs>
            <Radio
              v-for="item in exerciseLevelData"
              :key="item.id"
              v-model="newExercise.level"
              :label="item.value"
              name="exerciseLevel"
              :value="item.value"
            />
          </GroupInputs>
        </div>
      </div>
    </template>
    <template #modal-footer>

    </template>
  </Modal>
</template>

<style scoped src="./style.css" />