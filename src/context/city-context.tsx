import { createContext, useContext } from 'react'
import { CityContextType } from '../types'

export const CityContext = createContext<CityContextType | undefined>(undefined)

export function useCityContext() {
	const context = useContext(CityContext)
	if (context === undefined) {
		throw new Error('useCityContext must be used within a CityProvider')
	}
	return context
}
