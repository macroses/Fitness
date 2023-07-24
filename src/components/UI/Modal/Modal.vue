<script setup>
import ButtonClose from '@/components/UI/ButtonClose/ButtonClose.vue'

defineProps({
  width: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<template>
  <Teleport to="body">
    <div class='modal-layer' @click.self="close">
      <div class='modal' :style='{ maxWidth: width }'>
        <div class='modal__header'>
          <ButtonClose @click="close"/>
          <slot name='modal-header'></slot>
        </div>
        <div class='modal__body'>
          <slot name='modal-body'></slot>
        </div>
        <div class='modal__footer'>
          <slot name='modal-footer'></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped src="./style.css" />