import { useState, memo, type FormEvent } from 'react'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import styles from './AddUserForm.module.css'

interface AddUserFormProps {
  isOpen: boolean
  onClose: () => void
}

const AddUserForm = memo(({ isOpen, onClose }: AddUserFormProps) => {
  const { addUser } = useUser()
  const { theme } = useTheme()

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name || !role || !email) return

    addUser({ name, role, email })

    // Сброс формы и закрытие меню
    setName('')
    setRole('')
    setEmail('')
    onClose()
  }

  return (
    <div
      className={`${styles.menu} ${isOpen ? styles.open : ''} ${styles[theme]}`}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>Add New User</h3>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Developer"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit User
          </button>
        </form>
      </div>
    </div>
  )
})

AddUserForm.displayName = 'AddUserForm'

export default AddUserForm
