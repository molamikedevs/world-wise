import React from 'react'
import { FAKE_USER } from '../utils'
import { useAuthReducer } from '../hooks/useAuthReducer'
import { AuthContext } from './city-context'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { dispatch: dispatch, user, isAuthenticated } = useAuthReducer()

	function login(email: string, password: string) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: 'LOGIN', payload: FAKE_USER })
		}
	}

	function logout() {
		dispatch({ type: 'LOGOUT' })
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	)
}
