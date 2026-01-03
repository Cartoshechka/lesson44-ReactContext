import {
  createContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
  useContext,
} from 'react'
import type { User, UserContextType } from '../types'

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Frontend Developer',
    email: 'john.smith@example.com',
  },
  {
    id: 2,
    name: 'Emily Johnson',
    role: 'UI/UX Designer',
    email: 'emily.j@example.com',
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Backend Developer',
    email: 'michael.b@example.com',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    role: 'Product Manager',
    email: 'sarah.w@example.com',
  },
  {
    id: 5,
    name: 'David Miller',
    role: 'DevOps Engineer',
    email: 'david.m@example.com',
  },
]

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const selectUser = useCallback((userId: number): void => {
    setSelectedUser(userId)
  }, [])

  const addUser = useCallback((user: Omit<User, 'id'>): void => {
    setUsers((prev) => [...prev, { ...user, id: Date.now() }])
  }, [])

  const value = useMemo<UserContextType>(
    () => ({
      users,
      selectedUser,
      selectUser,
      addUser,
    }),
    [users, selectedUser, selectUser, addUser],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Кастомный хук с проверкой
export const useUser = (): UserContextType => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
