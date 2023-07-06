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
  clip-path: circle(0% at 80% 35%);
}

.clip-leave-to {
  opacity: 0;
}
</style>
