import { useState, useCallback } from 'react'
import { CityProps } from '../types'

interface UseGeolocationReturn {
  location: CityProps | null
  isLoading: boolean
  error: string | null
  getCurrentLocation: () => Promise<CityProps | null>
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [location, setLocation] = useState<CityProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = useCallback(async (): Promise<CityProps | null> => {
    setIsLoading(true)
    setError(null)
    setLocation(null) // Clear previous location

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser')
      }

      // Get current coordinates
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        })
      })

      const { latitude, longitude } = position.coords

      // Use reverse geocoding API to get readable info
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )

      if (!res.ok) throw new Error('Failed to fetch location details')

      const data = await res.json()

      // Create a proper CityProps object
      const currentLocation: CityProps = {
        id: 'current-location', // Special ID for current location
        cityName: data.locality || data.city || data.principalSubdivision || 'Unknown Location',
        country: data.countryName || 'Unknown Country',
        emoji: '📍', // Default emoji for current location
        date: new Date().toISOString().split('T')[0], // Current date
        notes: 'Your current location',
        position: {
          lat: latitude,
          lng: longitude
        }
      }

      setLocation(currentLocation)
      return currentLocation

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get your location'
      setError(message)
      setLocation(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { location, isLoading, error, getCurrentLocation }
}