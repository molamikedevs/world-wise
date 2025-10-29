import { LatLngTuple } from 'leaflet'

export interface CityProps {
	id: string
	cityName: string
	country: string
	emoji: string
	date: string
	notes: string
	position: {
		lat: number
		lng: number
	}
}

export interface CountriesListProps {
	cities: Array<CityProps>
	isLoading: boolean
}

export interface CityContextType {
	cities: CityProps[] | undefined
	city: CityProps | null
	isLoading: boolean
	error: string | null
	getCityById: (id: string) => void
	createCity: (city: CityProps) => void
	deleteCity: (id: string) => void
}
export interface User {
	name?: string
	email: string
	password: string
	avatar?: string
}
export interface AuthContextType {
	user: User | null
	isAuthenticated: boolean
	login: (email: string, password: string) => void
	logout: () => void
}

export interface CountryItemProps {
	country: {
		country: string
		emoji: string
	}
}

// types.ts
export interface City {
	id: string
	cityName: string
	notes: string
	position: {
		lat: number
		lng: number
	}
}

export interface GeolocationResult {
	getCurrentLocation: () => void
	isLoading: boolean
	location: LatLngTuple | null
	error: string | null
}

export const City_INITIAL_STATE = {
	cities: [] as CityProps[],
	city: null as CityProps | null,
	isLoading: false,
	error: '',
}

export type CityAction =
	| { type: 'CITIES/LOADED'; payload: CityProps[] }
	| { type: 'CITY/LOADED'; payload: CityProps | null }
	| { type: 'REJECTED'; payload: string | '' }
	| { type: 'LOADING' }
	| { type: 'CITY/CREATED'; payload: CityProps }
	| { type: 'CITY/DELETED'; payload: string }

export interface CityState {
	cities: CityProps[]
	city: CityProps | null
	isLoading: boolean
	error: string | ''
}

export interface AuthState {
	user: User | null
	isAuthenticated: boolean
}

export type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' }

export const AUTH_INITIAL_STATE = {
	user: null,
	isAuthenticated: false,
}