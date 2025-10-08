import { ref, watch, onMounted } from 'vue'

export const useDarkMode = () => {
  const isDark = ref(false)

  // Initialize dark mode from localStorage or system preference
  const initDarkMode = () => {
    if (process.client) {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) {
        isDark.value = saved === 'true'
      } else {
        // Check system preference
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      applyDarkMode()
    }
  }

  // Apply dark mode to document
  const applyDarkMode = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (process.client) {
      localStorage.setItem('darkMode', isDark.value.toString())
    }
    applyDarkMode()
  }

  // Set dark mode explicitly
  const setDarkMode = (dark: boolean) => {
    isDark.value = dark
    if (process.client) {
      localStorage.setItem('darkMode', isDark.value.toString())
    }
    applyDarkMode()
  }

  // Watch for system preference changes
  const watchSystemPreference = () => {
    if (process.client) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if user hasn't manually set a preference
        if (localStorage.getItem('darkMode') === null) {
          isDark.value = e.matches
          applyDarkMode()
        }
      }
      mediaQuery.addEventListener('change', handleChange)
      
      // Cleanup function
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }

  // Initialize on mount
  onMounted(() => {
    initDarkMode()
    watchSystemPreference()
  })

  // Watch for changes and apply them
  watch(isDark, () => {
    applyDarkMode()
  })

  return {
    isDark: readonly(isDark),
    toggleDarkMode,
    setDarkMode,
    initDarkMode
  }
}
