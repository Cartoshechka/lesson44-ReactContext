import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'
import Header from './components/Header'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import { useTheme } from './context/ThemeContext'
import styles from './App.module.css'

const AppContent = () => {
  const { theme } = useTheme()

  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          <UserList />
          <UserProfile />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
