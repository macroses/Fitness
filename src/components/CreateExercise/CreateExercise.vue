<script setup>
import { useExercise } from '@/composables/useCreateExercise'
import { exerciseLevelData, forceType } from '@/constants/MUSCLES'

const {
  isCreateExerciseVisible,
  newExercise,
  isLoading,
  musclesGroupsList,
  helpersGroupsList,
  addMainMuscleGroup,
  addHelpersMuscleGroup,
  removeHelpersMuscleGroup,
  isCreateAvailable,
  sendNewExercise
} = useExercise()
</script>

<template>
  <Button
    size="small"
    @click="isCreateExerciseVisible = true"
    class="create-exercise-btn"
  >
    Create exercise
  </Button>
  <Modal
    v-if="isCreateExerciseVisible"
    width="600px"
    @close="isCreateExerciseVisible = false"
    @confirm="sendNewExercise"
    confirm-label="Create"
    :is-confirm-active="isCreateAvailable"
  >
    <template #modal-header> Create exercise </template>
    <template #modal-body>
      <Loading v-if="isLoading" />
      <div class="creating-modal__wr">
        <Input
          v-model="newExercise.name"
          label-placeholder="Exercise name"
          @clear="newExercise.name = ''"
        />
        <div class="creating-modal__item">
          <h3 class="creating-modal__item-title">
            Exercise type {{ isCreateAvailable }}
          </h3>
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
          <h3 class="creating-modal__item-title">
            Main muscle group and helpers
          </h3>
          <div class="creating-modal__muscles">
            <MultiSelect
              label="Main muscle"
              :multiselect-list="musclesGroupsList"
              :chosen-items="newExercise.main_muscle"
              is-single-select
              @remove-items="newExercise.main_muscle = []"
              @get-items="addMainMuscleGroup"
            />
            <MultiSelect
              :disabled="newExercise.type === 'Isolation'"
              label="Helper muscles"
              :multiselectList="helpersGroupsList"
              @remove-items="removeHelpersMuscleGroup"
              @get-items="addHelpersMuscleGroup"
              :chosen-items="newExercise.helpers"
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
          <h3 class="creating-modal__item-title">Description</h3>
          <TextArea
            v-model="newExercise.description"
            :maxlength="500"
            placeholder="Write description"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scoped src="./style.css" />
