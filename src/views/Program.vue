<script setup>
import { readonly, ref } from 'vue'
import ProgramsList from '@/components/ProgramsList/ProgramsList.vue'
import CustomProgram from '@/components/CustomProgram/CustomProgram.vue'

const activeTabId = ref(0)

const getActiveTab = id => activeTabId.value = id

const tabs = readonly([
  { id: 0, tabTitle: 'All programs', icon: 'lottie/folder.json', size: 18 },
  { id: 1, tabTitle: 'Custom program', icon: 'lottie/edit.json', size: 24 }
])
</script>

<template>
  <div class="container">
    <Tabs
      :tabs="tabs"
      @activeTab="getActiveTab"
    />
    <ProgramsList v-if="activeTabId === 0"/>
    <CustomProgram  v-if="activeTabId === 1"/>
  </div>
</template>