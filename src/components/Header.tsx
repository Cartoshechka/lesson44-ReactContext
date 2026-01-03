import { memo } from 'react'
import { useTheme } from '../context/ThemeContext'
import styles from './Header.module.css'

const Header = memo(() => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <h1 className={styles.title}>👥 User Management</h1>
      <button
        onClick={toggleTheme}
        className={`${styles.themeButton} ${styles[`themeButton_${theme}`]}`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  )
})

Header.displayName = 'Header'

export default Header
