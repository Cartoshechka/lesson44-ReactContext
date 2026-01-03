import { memo } from 'react'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import styles from './UserProfile.module.css'

const UserProfile = memo(() => {
  const { users, selectedUser } = useUser()
  const { theme } = useTheme()

  const user = users.find((u) => u.id === selectedUser)

  if (!selectedUser || !user) {
    return (
      <div className={`${styles.container} ${styles[theme]} ${styles.empty}`}>
        <p>👆 Select a user from the list</p>
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <h2 className={styles.title}>📋 Detailed Information</h2>
      <div className={styles.details}>
        <p className={styles.field}>
          <strong>Name:</strong> {user.name}
        </p>
        <p className={styles.field}>
          <strong>Position:</strong> {user.role}
        </p>
        <p className={styles.field}>
          <strong>Email:</strong> {user.email}
        </p>
        <p className={styles.field}>
          <strong>ID:</strong> {user.id}
        </p>
      </div>
    </div>
  )
})

UserProfile.displayName = 'UserProfile'

export default UserProfile
