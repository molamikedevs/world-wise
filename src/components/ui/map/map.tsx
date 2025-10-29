import { useEffect, useState, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'

import { useCityContext } from '../../../context/city-context'
import { useGeolocation } from '../../../hooks/useGeolocation'
import { useUrlPosition } from '../../../hooks/useUrlPosition'

import Button from '../../common/button'
import DetectMapClick from '../../common/detect-map-click'
import { ChangeView } from '../../common/change-view'
import styles from './map.module.css'

export default function Map() {
	const [mapPosition, setMapPosition] = useState<LatLngTuple>([51.505, -0.09])
	const { mapLat, mapLng } = useUrlPosition()
	const { cities } = useCityContext()
	const {
		getCurrentLocation,
		isLoading,
		location: geoLocationPosition,
		error: geoError,
	} = useGeolocation()

	// Wrap getCurrentLocation in useCallback to avoid dependency issues
	const handleGetLocation = useCallback(() => {
		getCurrentLocation()
	}, [getCurrentLocation])

	// Update map position when URL params change
	useEffect(() => {
		if (mapLat && mapLng) {
			const lat = parseFloat(mapLat)
			const lng = parseFloat(mapLng)
			if (!isNaN(lat) && !isNaN(lng)) {
				setMapPosition([lat, lng])
			}
		}
	}, [mapLat, mapLng])

	// Update map position when geolocation is obtained
	useEffect(() => {
		if (geoLocationPosition) {
			setMapPosition([
				geoLocationPosition.position.lat,
				geoLocationPosition.position.lng,
			])
		}
	}, [geoLocationPosition])

	return (
		<div className={styles.mapContainer}>
			{/* Show button only when we don't have a geolocation position AND not currently loading */}
			{!geoLocationPosition && !isLoading && (
				<Button type="position" onClick={handleGetLocation}>
					Use My Location
				</Button>
			)}

			{/* Show loading state */}
			{isLoading && <Button type="position">Locating...</Button>}

			{/* Show error */}
			{geoError && (
				<div className={styles.error}>Error getting location: {geoError}</div>
			)}

			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>

				{/* Render saved cities */}
				{cities?.map(city => (
					<Marker
						position={[city.position.lat, city.position.lng] as LatLngTuple}
						key={city.id}>
						<Popup>
							<span>{city.emoji}</span> {city.cityName}
							<br />
							{city.notes}
						</Popup>
					</Marker>
				))}

				{/* Render current location marker */}
				{geoLocationPosition && (
					<Marker
						position={
							[
								geoLocationPosition.position.lat,
								geoLocationPosition.position.lng,
							] as LatLngTuple
						}
						key="current-location">
						<Popup>
							<span>{geoLocationPosition.emoji}</span> Your Current Location
							<br />
							{geoLocationPosition.cityName}, {geoLocationPosition.country}
							<br />
							<em>{geoLocationPosition.notes}</em>
						</Popup>
					</Marker>
				)}

				{mapLat && mapLng && (
					<ChangeView position={[parseFloat(mapLat), parseFloat(mapLng)]} />
				)}
				<DetectMapClick />
			</MapContainer>
		</div>
	)
}
