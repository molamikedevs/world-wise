import { ReactNode, useEffect } from 'react'
import { useAuthContext } from '../context/city-context'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated } = useAuthContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated, navigate])
	return <>{isAuthenticated ? children : null}</>
}
