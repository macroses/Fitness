<script setup>
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { onMounted, onUnmounted, ref } from 'vue'
import ButtonClose from '@/components/UI/ButtonClose/ButtonClose.vue'
import Button from '@/components/UI/Button/Button.vue'
import { animateBeforeCloseWrapper } from '@/components/UI/Modal/composable'

defineProps({
  width: {
    type: String,
    required: true
  },
  confirmLabel: {
    type: String,
    default: ''
  },
  withoutFooter: {
    type: Boolean,
    default: false
  },
  isConfirmActive: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'confirm'])

const modalLayer = ref(null)
const modalContent = ref(null)

const { animateBeforeClose } = animateBeforeCloseWrapper(modalContent, modalLayer)

gsap.registerPlugin(CSSPlugin)

onMounted(() => {
  const timeline = gsap.timeline()
  timeline.from(modalLayer.value, { autoAlpha: 0, duration: 0.25 })

  if (window.innerWidth < 768) {
    timeline.from(modalContent.value, {
      y: '1000',
      duration: 0.25,
      ease: 'power2'
    })
  } else {
    timeline.from(modalContent.value, {
      autoAlpha: 0,
      scale: 0.8,
      y: '-100',
      duration: 0.25,
      ease: 'power2'
    })
  }

  timeline.play()

  document.body.style.overflow = 'hidden'
})

const confirm = () => {
  animateBeforeClose()
  emit('confirm')
  document.body.style.overflow = 'visible'
}

onUnmounted(() => {
  document.body.style.overflow = 'visible'
})
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div
        ref="modalLayer"
        class="modal__layer"
        @click.self="animateBeforeClose"
      />
      <div
        ref="modalContent"
        class="modal__content"
        :style="{ maxWidth: width }"
      >
        <div class="modal__header">
          <ButtonClose @click="animateBeforeClose" />
          <slot name="modal-header" />
        </div>
        <div class="modal__body">
          <slot name="modal-body" />
        </div>
        <div
          v-if="!withoutFooter"
          class="modal__footer"
        >
          <div class="group">
            <slot name="modal-footer" />
            <Button
              v-if="confirmLabel"
              :disabled="!isConfirmActive"
              @click="confirm"
            >
              {{ confirmLabel }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped src="./style.css" />
