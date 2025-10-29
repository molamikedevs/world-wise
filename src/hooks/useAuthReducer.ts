import { useReducer } from "react";
import { AUTH_INITIAL_STATE, AuthAction, AuthState } from '../types'

const reducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload, isAuthenticated: true }
		case 'LOGOUT':
			return { ...state, user: null, isAuthenticated: false }
		default:
			throw new Error('Unknown action type')
	}
}

export const useAuthReducer = () => {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		AUTH_INITIAL_STATE
	)

	return { user, isAuthenticated, dispatch }
}