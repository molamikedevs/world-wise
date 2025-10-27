import { useAuthContext } from '../context/contexts'
import styles from './user.module.css'

export default function User() {
	const { logout, user } = useAuthContext()

	const { name, avatar } = user || {}

	if (!user) {
		return null
	}

	function handleClick() {
		logout()
	}

	return (
		<div className={styles.user}>
			<img src={avatar} alt={name} />
			<span>Welcome, {name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	)
}
