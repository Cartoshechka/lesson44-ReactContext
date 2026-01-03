import { memo } from 'react'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import UserCard from './UserCard'
import styles from './UserList.module.css'

const UserList = memo(() => {
  const { users } = useUser()
  const { theme } = useTheme()

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <h2 className={styles.title}>User List ({users.length})</h2>
      <div className={styles.grid}>
        {users.map((user) => (
          <UserCard key={user.id} userId={user.id} />
        ))}
      </div>
    </div>
  )
})

UserList.displayName = 'UserList'

export default UserList
