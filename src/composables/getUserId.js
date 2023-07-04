import { onMounted, ref } from 'vue'

export const getUserId = () => {
  const authTokenRegex = /.*auth-token$/
  const userId = ref(null)
  let timeout

  onMounted(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (authTokenRegex.test(key)) {
        timeout = setTimeout(() => {
          userId.value = JSON.parse(localStorage.getItem(key)).user.id
        }, 50)
        break
      }
    }
  })

  clearTimeout(timeout)
  return { userId }
}
