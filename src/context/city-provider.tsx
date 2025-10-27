import React, { useEffect, useState } from 'react'
import { API_URL } from '../utils'
import { CityContext } from './city-context'
import { CityProps } from '../types'

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
	const [cities, setCities] = useState<CityProps[] | undefined>(undefined)
	const [citiesLoading, setCitiesLoading] = useState<boolean>(true)
	const [selectedCity, setSelectedCity] = useState<CityProps | null>(null)
	const [selectedCityLoading, setSelectedCityLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setCitiesLoading(true)
				const response = await fetch(`${API_URL}/cities`)
				const data = await response.json()
				setCities(data)
			} catch (error) {
				console.error('Error fetching cities:', error)
				setError('Failed to fetch cities')
			} finally {
				setCitiesLoading(false)
			}
		}
		fetchCities()
	}, [])

	const getCityById = async (id: string) => {
		try {
			setSelectedCityLoading(true)
			setError(null)
			setSelectedCity(null)
			
			const response = await fetch(`${API_URL}/cities/${id}`)
			
			if (!response.ok) {
				throw new Error('Failed to fetch city')
			}
			
			const data = await response.json()
			setSelectedCity(data)
		} catch (error) {
			console.error('Error fetching city:', error)
			setError('Failed to fetch city')
			setSelectedCity(null)
		} finally {
			setSelectedCityLoading(false)
		}
	}

	// Create new city
	const createCity = async (city: CityProps) => {
		try {
			setCitiesLoading(true)
			const response = await fetch(`${API_URL}/cities`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(city),
			})
			if (!response.ok) {
				throw new Error('Failed to create city')
			}
			const data = await response.json()
			setCities(prevCities => [...(prevCities || []), data])
		} catch (error) {
			console.error('Error creating city:', error)
			setError('Failed to create city')
		} finally {
			setCitiesLoading(false)
		}
	}

	// Delete city
	const deleteCity = async (id: string) => {
		try {
			setCitiesLoading(true)
			const response = await fetch(`${API_URL}/cities/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				throw new Error('Failed to delete city')
			}
			setCities(prevCities => prevCities?.filter(city => city.id !== id))
		} catch (error) {
			console.error('Error deleting city:', error)
			setError('Failed to delete city')
		} finally {
			setCitiesLoading(false)
		}
	}

	return (
		<CityContext.Provider
			value={{ 
				cities, 
				loading: citiesLoading,
				selectedCityLoading,
				error, 
				selectedCity, 
				getCityById,
				createCity,
				deleteCity
			}}>
			{children}
		</CityContext.Provider>
	)
}