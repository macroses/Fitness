<script setup></script>

<template>
  <fieldset class="group-inputs">
    <slot />
  </fieldset>
</template>

<style>
.group-inputs {
  display: flex;
  gap: 12px;
  padding: 0;
  border: 0;
}
</style>
