import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CityProvider } from './context/city-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<BrowserRouter>
		<CityProvider>
			<App />
		</CityProvider>
	</BrowserRouter>
	// </React.StrictMode>
)
