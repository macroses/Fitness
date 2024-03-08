import { computed, ref } from 'vue'

export const useTemporaryWorkoutComposable = () => {
  const timeLeft = ref(300)

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const isAlert = computed(() => timeLeft.value <= 60)

  const startTimer = () => {
    const startTime = localStorage.getItem('startTime')

    if (!startTime) {
      localStorage.setItem('startTime', Date.now())
    }
  }

  const calculateTimeLeft = () => {
    const startTime = localStorage.getItem('startTime')

    if (startTime) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
      timeLeft.value = 300 - elapsedTime
    }
  }

  return {
    formatTime,
    startTimer,
    calculateTimeLeft,
    isAlert,
    timeLeft
  }
}