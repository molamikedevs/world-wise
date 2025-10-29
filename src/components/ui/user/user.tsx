import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/city-context'
import styles from './user.module.css'

function User() {
	const { user, logout } = useAuthContext()
	const navigate = useNavigate()
	const { name, avatar } = user || {}

	function handleClick() {
		logout()
		navigate('/')
	}

	return (
		<div className={styles.user}>
			<img src={avatar} alt={name} />
			<span>Welcome, {name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	)
}

export default User
