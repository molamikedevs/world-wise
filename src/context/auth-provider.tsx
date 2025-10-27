import React from 'react'
import { AuthContext } from './contexts'
import { FAKE_USER } from '../utils'
import { User } from '../types'



interface State {
	user: User | null
	isAuthenticated: boolean
}

type Action = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' }

const INITIAL_STATE: State = {
	user: null,
	isAuthenticated: false,
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload, isAuthenticated: true }
		case 'LOGOUT':
			return { ...state, user: null, isAuthenticated: false }
		default:
			throw new Error('Unknown action type')
	}
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [{ user, isAuthenticated }, dispatch] = React.useReducer(
		reducer,
		INITIAL_STATE
	)

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
