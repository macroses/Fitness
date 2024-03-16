import { ref } from 'vue'
import { gsap } from 'gsap'

export default function useSwipe () {
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  const handleTouchMove = (event, element) => {
    const swipeDistance = event.touches[0].clientX - touchStartX.value

    if (swipeDistance < 0) {
      gsap.to(element, { x: 0, duration: 0.1, ease: 'none' })
    } else {
      gsap.to(element, {
        x: swipeDistance,
        duration: 0.1,
        ease: 'none'
      })
    }
  }

  const handleTouchStart = event => (touchStartX.value = event.touches[0].clientX)

  const handleTouchEnd = (event, element, closeAction) => {
    touchEndX.value = event.changedTouches[0].clientX
    const swipeDistance = touchEndX.value - touchStartX.value

    if (swipeDistance >= 100) {
      closeAction()
    } else {
      gsap.to(element, { x: 0, duration: 0.1, ease: 'none' })
    }
  }

  return { handleTouchStart, handleTouchMove, handleTouchEnd }
}