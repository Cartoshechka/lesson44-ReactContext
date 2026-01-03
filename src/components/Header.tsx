import { memo, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import AddUserForm from './AddUserForm'
import styles from './Header.module.css'

const Header = memo(() => {
  const { theme, toggleTheme } = useTheme()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <h1 className={styles.title}>👥 User Management</h1>
      <div className={styles.actions}>
        <div className={styles.addUserContainer}>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`${styles.addButton} ${styles[`addButton_${theme}`]}`}
          >
            {isFormOpen ? '✕ Close Form' : '➕ Add User'}
          </button>
          <AddUserForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        </div>
        <button
          onClick={toggleTheme}
          className={`${styles.themeButton} ${styles[`themeButton_${theme}`]}`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  )
})

Header.displayName = 'Header'

export default Header
