<script setup>
import { computed, reactive, ref } from 'vue'
import { uid } from 'uid'
import { exerciseLevelData, forceType, musclesGroups } from '@/components/CreateExercise/constants/constants.js'
import { toast } from 'vue3-toastify'
import { userExercisesStore } from '@/stores/userExercises.js'

const userExercises = userExercisesStore()

const newExercise = reactive({
  id: uid(10),
  name: '',
  muscles: [],
  type: 'Compound',
  main_muscle: null,
  equip: '',
  load_type: 'strength',
  level: 'Beginner',
  description: '',
  force_type: null
})

const isLoading = ref(false)

const addMainMuscleGroup = muscle => newExercise.main_muscle = muscle[0].value

const addHelpersMuscleGroup = muscle => newExercise.muscles = muscle.map(item => item.value)

const isCreateAvailable = computed(() => newExercise.name && newExercise.main_muscle)

const sendNewExercise = () => {
  if (!isCreateAvailable.value) {
    toast.error('Please, fill all required fields')

    return
  }

  userExercises.pushExerciseToBase(isLoading, newExercise)
  toast.success('Exercise created')
}

</script>

<template>
  <Modal
    width="600px"
    @close="$emit('close')"
    @confirm="sendNewExercise"
  >
    <template #modal-header>
      Create exercise
    </template>
    <template #modal-body>
      <Loading v-if="isLoading"/>
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
              @remove-selected-item="newExercise.main_muscle = ''"
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
          <h3 class="creating-modal__item-title">Description</h3>
          <TextArea
            v-model="newExercise.description"
            :maxlength="500"
            placeholder="Write description"
          />
        </div>
      </div>
    </template>
    <template #modal-footer>
      <Button
        type="button"
        @click="$emit('close')"
        bordered
      >
        Cancel
      </Button>
      <Button
        type="button"
        @click="sendNewExercise"
        :disabled="!isCreateAvailable"
      >
        Create
      </Button>
    </template>
  </Modal>
</template>

<style scoped src="./style.css" />