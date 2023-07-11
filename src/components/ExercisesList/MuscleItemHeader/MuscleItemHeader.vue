<script setup>
defineProps({
  muscleItem: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits('selectMuscle')
const selectMuscle = index => {
  emit('selectMuscle', index)
}
</script>

<template>
  <div class="muscles__item-header">
    {{ muscleItem.muscle }}
    <div class="muscle__item-length">
      {{ muscleItem.exercises.length }}
      <div class="muscles__item-img" />
    </div>
    <div class="collapse__icon" />
  </div>
</template>
