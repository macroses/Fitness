<script setup>
import { gsap } from 'gsap'

const onBeforeEnter = el => {
  el.style.gridTemplateRows = '0'
}

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    gridTemplateRows: '1fr',
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    gridTemplateRows: '0fr',
    alpha: 0,
    onComplete: done
  })
}

</script>

<template>
  <Transition
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </Transition>
</template>
