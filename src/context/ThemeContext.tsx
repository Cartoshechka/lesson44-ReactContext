import {
  createContext,
  useState,
  useMemo,
  useContext,
  type ReactNode,
  useEffect,
} from 'react'
import type { Theme, ThemeContextType } from '../types'

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

interface ThemeProviderProps {
  children: ReactNode
}

// Ключ для localStorage
const THEME_STORAGE_KEY = 'app-theme'

// Функция для получения сохраненной темы
const getSavedTheme = (): Theme => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    // Проверяем, что значение валидное
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
  } catch (error) {
    console.error('Error reading theme from localStorage:', error)
  }
  // По умолчанию возвращаем светлую тему
  return 'light'
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Инициализируем состояние из localStorage
  const [theme, setTheme] = useState<Theme>(getSavedTheme)

  // Сохраняем тему при каждом изменении
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
  }, [theme])

  const toggleTheme = useMemo(
    () => (): void => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    },
    [],
  )

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
