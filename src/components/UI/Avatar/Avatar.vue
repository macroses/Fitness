<script setup>
import Icon from '@/components/UI/Icon/Icon.vue'
</script>

<template>
  <div class="avatar-content">
    <Button
      bordered
      is-only-icon
      class="avatar"
      aria-label="User Avatar"
      aria-pressed="false"
    >
      <Icon
        icon-name="user-alien"
        width="15px"
      />
    </Button>
  </div>
</template>

<style src="./style.css"></style>
