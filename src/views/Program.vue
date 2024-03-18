<script setup>
import { ref } from 'vue'

const activeProgram = ref(null)

const getProgramId = program => {
  activeProgram.value = program
}

const closeModal = () => (activeProgram.value = null)
</script>

<template>
  <div class="container">
    <ProgramsList @get-program-id="getProgramId"/>
    <Modal
      v-if="activeProgram"
      width="700px"
      @close="closeModal"
      @confirm=""
    >
      <template #modal-header>
        {{ activeProgram.title }}
      </template>
      <template #modal-body>
        <ProgramItemModal :program="activeProgram" />
      </template>
    </Modal>
  </div>
</template>
