<script setup>
import { reactive, watch } from 'vue'
import { uid } from 'uid'
import {
  musclesGroups,
  exerciseLevelData,
  forceType
} from "@/components/CreateExercise/constants/constants.js";

const newExercise = reactive({
  id: uid(10),
  name: '',
  muscles: [],
  type: 'Compound',
  main_muscle: null,
  equip: '',
  load_type: null,
  level: 'Beginner',
  description: '',
  force_type: null
})

const addMainMuscleGroup = async muscle => {
  newExercise.main_muscle = muscle[0].value
}

const addHelpersMuscleGroup = async muscle => {
  newExercise.muscles = muscle
}

watch(newExercise, (val) => {
  console.log(val)
})
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
              default-checked
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
              :default-checked="item.id === 0"
            />
          </GroupInputs>
        </div>
        <div class="creating-modal__item">
          <h3 class="creating-modal__item-title">Equipment</h3>
          <Input
            v-model="newExercise.equip"
            label-placeholder="like barbell, dumbbell, etc."
            label-fade
            @clear="newExercise.equip = ''"
          />
        </div>
        <div class="creating-modal__item">
          <h3 class="creating-modal__item-title">Force type</h3>
          <GroupInputs>
            <Radio
              v-for="item in forceType"
              :key="item.id"
              v-model="newExercise.force_type"
              :label="item.value"
              name="forceType"
              :value="item.value"
              :default-checked="item.id === 0"
            />
          </GroupInputs>
        </div>
        <div class="creating-modal__item">
          <h3 class="creating-modal__item-title">Short description</h3>
          <GroupInputs>
            <Radio
              v-for="item in forceType"
              :key="item.id"
              v-model="newExercise.force_type"
              :label="item.value"
              name="forceType"
              :value="item.value"
              :default-checked="item.id === 0"
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