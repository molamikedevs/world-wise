import React, { useEffect } from 'react'
import { API_URL } from '../utils'
import { CityContext } from './city-context'
import { CityProps } from '../types'
import { useCityReducer } from '../hooks/useCityreducer'

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
	const { cities, isLoading, error, city, dispatch } = useCityReducer()

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
	}, [dispatch])

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
