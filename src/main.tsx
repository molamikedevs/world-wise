import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import { CityProvider } from './context/city-provider.tsx'
import { AuthProvider } from './context/auth-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<CityProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</CityProvider>
		</BrowserRouter>
	</React.StrictMode>
)
