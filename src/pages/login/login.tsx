import { useEffect, useState } from 'react'
import styles from './login.module.css'
import PageNavigation from '../../components/navigation/page-navigation/page-navigation'
import { useAuthContext } from '../../context/contexts'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/button'

export default function Login() {
	const [email, setEmail] = useState('jack@example.com')
	const [password, setPassword] = useState('qwerty')
	const { login, isAuthenticated } = useAuthContext()
	const navigate = useNavigate()

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (email && password) login(email, password)
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/app', { replace: true })
		}
	}, [isAuthenticated, navigate])

	return (
		<main className={styles.login}>
			<PageNavigation />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	)
}
