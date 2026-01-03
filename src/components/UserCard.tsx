import { memo } from 'react'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import styles from './UserCard.module.css'

interface UserCardProps {
  userId: number
}

const UserCard = memo(({ userId }: UserCardProps) => {
  const { users, selectUser, selectedUser } = useUser()
  const { theme } = useTheme()

  const user = users.find((u) => u.id === userId)

  if (!user) return null

  const isSelected = selectedUser === userId

  const handleClick = (): void => {
    selectUser(userId)
  }

  const cardClasses = `${styles.card} ${styles[theme]} ${
    isSelected ? styles.selected : ''
  }`

  return (
    <div onClick={handleClick} className={cardClasses}>
      <h3 className={styles.name}>{user.name}</h3>
      <p className={styles.info}>
        <strong>Position:</strong> {user.role}
      </p>
      <p className={styles.info}>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  )
})

UserCard.displayName = 'UserCard'

export default UserCard
