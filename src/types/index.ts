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
	loading: boolean // for cities list
	selectedCityLoading: boolean // for individual city
	error: string | null
	selectedCity: CityProps | null
	getCityById: (id: string) => void
	createCity: (city: CityProps) => void
	deleteCity: (id: string) => void
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
