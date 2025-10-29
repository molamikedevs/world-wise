import { useReducer } from "react"
import { City_INITIAL_STATE, CityAction, CityState } from '../types'

const reducer = (state: CityState, action: CityAction): CityState => {
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

export const useCityReducer = () => {
	const [{ cities, isLoading, error, city }, dispatch] = useReducer(
		reducer,
		City_INITIAL_STATE
	)

	return { cities, isLoading, error, city, dispatch }
}