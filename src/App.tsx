import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage, Pricing, Product, PageNotFound, AppLayout } from './pages'

import Login from './pages/login/login'
import CityList from './components/ui/city/city-list'
import CountryList from './components/ui/country/country-list'
import City from './components/ui/city/city'
import Form from './components/input/form'
import './index.css'
import ProtectedRoute from './auth/protected-route'

export default function App() {
	return (
		<Routes>
			{/* Navigation Routes */}
			<Route index element={<HomePage />} />
			<Route path="/product" element={<Product />} />
			<Route path="/pricing" element={<Pricing />} />
			<Route path="/login" element={<Login />} />

			{/* Protected Routes */}
			<Route
				path="/app"
				element={
					<ProtectedRoute>
						<AppLayout />
					</ProtectedRoute>
				}>
				{/* Nested Routes */}
				<Route index element={<Navigate replace to="cities" />} />
				<Route path="cities/:id" element={<City />} />
				<Route path="cities" element={<CityList />} />
				<Route path="countries" element={<CountryList />} />
				<Route path="form" element={<Form />} />
			</Route>

			{/* 404 Page Not Found */}
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	)
}
