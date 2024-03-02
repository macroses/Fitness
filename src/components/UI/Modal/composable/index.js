import { gsap } from 'gsap'
import { getCurrentInstance, ref } from 'vue'

const touchStartY = ref(0)
const touchEndY = ref(0)

export const useSwipeModal = (ref) => {
  const { emit } = getCurrentInstance()

  const handleTouchMove = event => {
    const swipeDistance = event.touches[0].clientY - touchStartY.value

    if (swipeDistance < 0) {
      gsap.to(ref.value, { y: 0, duration: 0.1, ease: 'none' })
    } else {
      gsap.to(ref.value, {
        y: swipeDistance,
        duration: 0.1,
        ease: 'none'
      })
    }
  }

  const handleTouchStart = event => (touchStartY.value = event.touches[0].clientY)

  const handleTouchEnd = event => {
    touchEndY.value = event.changedTouches[0].clientY
    const swipeDistance = touchEndY.value - touchStartY.value

    if (swipeDistance >= 100) {
      emit('close')
    } else {
      gsap.to(ref.value, { y: 0, duration: 0.25, ease: 'none' })
    }
  }

  return {
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd
  }
}

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

  return {
    animateBeforeClose
  }
}