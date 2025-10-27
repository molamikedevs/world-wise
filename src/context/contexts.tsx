import { createContext, useContext } from 'react'
import { AuthContextType, CityContextType } from '../types'

export const CityContext = createContext<CityContextType | undefined>(undefined)
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useCityContext() {
	const ctx = useContext(CityContext)
	if (ctx === undefined) {
		throw new Error('useCityContext must be used within a CityProvider')
	}
	return ctx
}


export function useAuthContext() {
	const ctx = useContext(AuthContext)
	if (ctx === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return ctx
}