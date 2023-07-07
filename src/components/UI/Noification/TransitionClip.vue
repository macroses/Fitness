<template>
  <transition name="clip">
    <slot />
  </transition>
</template>

<style>
.clip-enter-active,
.clip-leave-active {
  transition: all 0.5s ease;
}

.clip-enter-from {
  transform: translateX(50%);
}

.clip-leave-to {
  opacity: 0;
}
</style>
