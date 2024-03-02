import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const checkNetworkStatus = () => {
  const isOnline = ref(navigator.onLine)

  window.addEventListener('online', () => handleConnectionChange(true))
  window.addEventListener('offline', () => handleConnectionChange(false))

  const handleConnectionChange = newStatus => {
    isOnline.value = newStatus

    if (newStatus) {
      toast.success('Connection restored', { position: toast.POSITION.TOP_RIGHT })

      return
    }

    toast.error('Connection lost', { position: toast.POSITION.TOP_RIGHT })
  }
}