import React, { useEffect, useReducer } from 'react'
import { API_URL } from '../utils'
import { CityContext } from './city-context'
import { CityProps } from '../types'

const INITIAL_STATE = {
	cities: [] as CityProps[],
	city: null as CityProps | null,
	isLoading: false,
	error: '',
}

type Action =
	| { type: 'CITIES/LOADED'; payload: CityProps[] }
	| { type: 'CITY/LOADED'; payload: CityProps | null }
	| { type: 'REJECTED'; payload: string | '' }
	| { type: 'LOADING' }
	| { type: 'CITY/CREATED'; payload: CityProps }
	| { type: 'CITY/DELETED'; payload: string }

interface State {
	cities: CityProps[]
	city: CityProps | null
	isLoading: boolean
	error: string | ''
}

// Reducer function to manage state transitions
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'LOADING':
			return { ...state, isLoading: true, error: '' }
		case 'REJECTED':
			return { ...state, error: action.payload, isLoading: false }
		case 'CITIES/LOADED':
			return { ...state, cities: action.payload, isLoading: false }
		case 'CITY/LOADED':
			return { ...state, city: action.payload, isLoading: false }
		case 'CITY/CREATED':
			return {
				...state,
				cities: [...state.cities, action.payload],
				city: action.payload,
				isLoading: false,
			}
		case 'CITY/DELETED':
			return {
				...state,
				cities: state.cities.filter(city => city.id !== action.payload),
				city: null,
				isLoading: false,
			}
		default:
			return state
	}
}

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
	const [{ cities, isLoading, error, city }, dispatch] = useReducer(
		reducer,
		INITIAL_STATE
	)

	// Fetch cities on mount
	useEffect(() => {
		const fetchCities = async () => {
			dispatch({ type: 'LOADING' })
			try {
				const response = await fetch(`${API_URL}/cities`)
				const data = await response.json()
				dispatch({ type: 'CITIES/LOADED', payload: data })
			} catch (error) {
				dispatch({ type: 'REJECTED', payload: 'Failed to fetch cities' })
			}
		}
		fetchCities()
	}, [])

	// Get city by ID function
	const getCityById = async (id: string) => {
		console.log('Fetching city with ID:', id)
		if (city && city.id === id) return // Avoid refetching the same city
		dispatch({ type: 'LOADING' })
		try {
			const response = await fetch(`${API_URL}/cities/${id}`)
			const data = await response.json()
			dispatch({ type: 'CITY/LOADED', payload: data })
		} catch (error) {
			dispatch({ type: 'REJECTED', payload: 'Failed to fetch city' })
		}
	}

	// Create new city function
	const createCity = async (city: CityProps) => {
		dispatch({ type: 'LOADING' })
		try {
			const response = await fetch(`${API_URL}/cities`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(city),
			})
			const data = await response.json()
			dispatch({ type: 'CITY/CREATED', payload: data })
		} catch (error) {
			dispatch({ type: 'REJECTED', payload: 'Failed to create city' })
		}
	}

	// Delete city function
	const deleteCity = async (id: string) => {
		dispatch({ type: 'LOADING' })
		try {
			await fetch(`${API_URL}/cities/${id}`, {
				method: 'DELETE',
			})
			dispatch({ type: 'CITY/DELETED', payload: id })
		} catch (error) {
			dispatch({ type: 'REJECTED', payload: 'Failed to delete city' })
		}
	}

	return (
		<CityContext.Provider
			value={{
				cities,
				isLoading,
				error,
				city,
				getCityById,
				createCity,
				deleteCity,
			}}>
			{children}
		</CityContext.Provider>
	)
}
