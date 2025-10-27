import { useMapEvent } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

export default function DetectMapClick() {
	const navigate = useNavigate()
	interface MapClickLatLng {
		lat: number
		lng: number
	}
	interface MapClickEvent {
		latlng: MapClickLatLng
	}

	useMapEvent('click', (e: MapClickEvent) => {
		navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
	})
	return null
}
