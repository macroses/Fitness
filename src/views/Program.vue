<script setup>
import { ref } from 'vue'
import ProgramsList from '@/components/ProgramsList/ProgramsList.vue'
import ProgramItemModal from '@/components/ProgramItemModal/ProgramItemModal.vue'

const activeTabId = ref(0)
const activeProgram = ref(null)

const getProgramId = program => {
  activeProgram.value = program
}

const closeModal = () => (activeProgram.value = null)

// const activeTab = computed(() => {
//   switch (activeTabId.value) {
//     case 0:
//       return {
//         component: CustomProgram,
//         emits: {}
//       }
//     case 1:
//       return {
//         component: ProgramsList,
//         emits: { 'get-program-id': getProgramId }
//       }
//   }
// })
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
