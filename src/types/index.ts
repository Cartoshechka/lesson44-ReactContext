// Типы для пользователя
export interface User {
  id: number
  name: string
  role: string
  email: string
}

// Типы для контекста темы
export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Типы для контекста пользователей
export interface UserContextType {
  users: User[]
  selectedUser: number | null
  selectUser: (userId: number) => void
  addUser: (user: Omit<User, 'id'>) => void
}
