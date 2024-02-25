<script setup>
import { computed, readonly, ref } from 'vue'
import ProgramsList from '@/components/ProgramsList/ProgramsList.vue'
import CustomProgram from '@/components/CustomProgram/CustomProgram.vue'
import ProgramItemModal from '@/components/ProgramItemModal/ProgramItemModal.vue'

const activeTabId = ref(0)
const activeProgram = ref(null)

const getActiveTab = id => (activeTabId.value = id)

const tabs = readonly([
  { id: 0, tabTitle: 'All programs', icon: 'folder-open' },
  { id: 1, tabTitle: 'Custom program', icon: 'pen-to-square' }
])

const getProgramId = program => {
  activeProgram.value = program
}

const closeModal = () => (activeProgram.value = null)

const activeTab = computed(() => {
  switch (activeTabId.value) {
    case 0:
      return {
        component: CustomProgram,
        emits: {}
      }
    case 1:
      return {
        component: ProgramsList,
        emits: { 'get-program-id': getProgramId }
      }
  }
})
</script>

<template>
  <div class="container">
    <Tabs
      :tabs="tabs"
      @activeTab="getActiveTab"
    />
    <component
      :is="activeTab.component"
      @get-program-id="activeTab.emits['get-program-id']"
    />
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
