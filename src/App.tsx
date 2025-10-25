import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { HomePage, Pricing, Product, PageNotFound, AppLayout } from './pages'
import './index.css'
import Login from './pages/login/login'
import CityList from './components/ui/city/city-list/city-list'
import CountryList from './components/ui/country/country-list'
import City from './components/ui/city/city'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
	const [cities, setCities] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setLoading(true)
				const response = await fetch(`${API_URL}/cities`)
				const data = await response.json()
				setCities(data)
			} catch (error) {
				console.error('Error fetching cities:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCities()
	}, [])

	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="/product" element={<Product />} />
			<Route path="/pricing" element={<Pricing />} />
			<Route path="/login" element={<Login />} />

			{/* App Layout */}
			<Route path="/app" element={<AppLayout />}>
				<Route
					index
					element={<CityList cities={cities} isLoading={loading} />}
				/>
        <Route path="cities/:cityId" element={<City />} />
				<Route
					path="cities"
					element={<CityList cities={cities} isLoading={loading} />}
				/>
				<Route
					path="countries"
					element={<CountryList cities={cities} isLoading={loading} />}
				/>
				<Route path="form" element={<p>Form</p>} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	)
}
