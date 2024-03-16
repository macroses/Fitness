<script setup>
import { ref } from 'vue'

const props = defineProps({
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  hideConfirm: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '250px',
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const dialog = ref(null)
const visible = ref(false)

const cancel = () => {
  dialog.value.close()
  emit('cancel')
}

const confirm = () => {
  dialog.value.close()
  emit('confirm')
}

const showConfirmDialog = () => {
  dialog.value.showModal()
  visible.value = true
}

defineExpose({
  show: showConfirmDialog,
  close: (returnVal) => dialog.value.close(returnVal),
  visible
})

</script>

<template>
  <dialog
    ref="dialog"
    :style="{ maxWidth: props.width }"
    @click="cancel"
  >
    <form
      v-if="visible"
      method="dialog"
      @click.stop
    >
      <p class="dialog__content-message">
        <slot name="confirmMessage" />
      </p>
      <slot />
      <div v-if="!props.hideConfirm || props.showCancel">
        <slot name="footer" />
        <slot name="actionButtons">
          <div class="dialog__buttons">
            <Button
              v-if="props.showCancel"
              value="false"
              bordered
              @click.prevent="cancel"
            >
              {{ props.cancelText }}
            </Button>
            <Button
              v-if="!props.hideConfirm"
              value="true"
              @click.prevent="confirm"
            >
              {{ props.confirmText }}
            </Button>
          </div>
        </slot>
      </div>
    </form>
  </dialog>
</template>

<style scoped src="./style.css"/>