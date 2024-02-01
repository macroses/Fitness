import { defineStore } from 'pinia'
import { ref } from 'vue'

export const themeStore = defineStore('theme', () => {
  const theme = ref('light')

  const getThemeCookie = () => {
    const name = 'user_theme='
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieArray = decodedCookie.split(';')

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim()
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length)
      }
    }

    return null
  }

  const setThemeCookie = theme => {
    document.cookie = `user_theme=${theme}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`
  }

  const toggleTheme = () => {
    const currentTheme = getThemeCookie()
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setThemeCookie(newTheme)
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(newTheme)
    theme.value = newTheme
  }

  const applySavedTheme = () => {
    const savedTheme = getThemeCookie()
    if (savedTheme) {
      document.body.classList.add(savedTheme)
      theme.value = savedTheme
    }
  }

  applySavedTheme()

  return {
    theme,
    toggleTheme,
    applySavedTheme
  }
})
