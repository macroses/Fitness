import { gsap } from 'gsap'
import { getCurrentInstance } from 'vue'

export const animateBeforeCloseWrapper = (content, layer) => {
  const { emit } = getCurrentInstance()

  const unmountTimer = () => {
    setTimeout(() => {
      emit('close')
    }, 500)
  }

  const animateBeforeClose = () => {
    const timeline = gsap.timeline()
    timeline.to(content.value, {
      autoAlpha: 0,
      y: '+100',
      duration: 0.5,
      ease: 'power2'
    })
    timeline.to(layer.value, { autoAlpha: 0, duration: 0.5 }, 0)
    timeline.play()

    unmountTimer()
    clearTimeout(unmountTimer)
  }

  document.body.style.overflow = 'visible'

  return {
    animateBeforeClose
  }
}