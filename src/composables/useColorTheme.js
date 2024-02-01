import { onMounted, ref } from 'vue'

const toggleColorTheme = () => {
  const userTheme = ref('prefer')

  const getTheme = () => {
    return (
      document.cookie.replace(
        /(?:(?:^|.*;\s*)user-theme\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      ) || null
    )
  }

  const setTheme = (theme = 'prefer') => {
    document.cookie = `user-theme=${theme}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
    userTheme.value = theme
    document.documentElement.className = theme
  }

  const getMediaPreference = () => {
    const hasDarkPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    if (hasDarkPreference) {
      return 'prefer'
    }
  }

  const toggleTheme = theme => setTheme(theme)

  onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference()
    setTheme(initUserTheme)
  })

  return { toggleTheme, userTheme }
}

export default toggleColorTheme
