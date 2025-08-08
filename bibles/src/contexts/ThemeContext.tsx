'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Check for saved theme preference or default to system preference
      const savedTheme = localStorage.getItem('ui-theme') as Theme
      if (savedTheme) {
        return savedTheme
      }
      // Default to system preference
      return 'system'
    }
    // Default to system theme during SSR
    return 'system'
  })

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('light', 'dark')

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
        // Keep cookie in sync so SSR can choose a class next navigation
        document.cookie = `ui-theme=system; path=/; max-age=31536000`
        return
      }

      root.classList.add(theme)
      // Persist cookie so server can SSR the correct theme
      document.cookie = `ui-theme=${theme}; path=/; max-age=31536000`
    }
  }, [theme])

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem('ui-theme', newTheme)
    if (typeof document !== 'undefined') {
      document.cookie = `ui-theme=${newTheme}; path=/; max-age=31536000`
    }
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 