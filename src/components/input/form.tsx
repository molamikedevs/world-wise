import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCityContext } from '../../context/city-context'
import { CityProps } from '../../types'
import { useUrlPosition } from '../../hooks/useUrlPosition'
import { BASE_URL, convertToEmoji } from '../../utils'

import BackButton from '../common/back-button'
import Button from '../common/button'
import Message from '../ui/message/message'
import Spinner from '../common/spinner'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './form.module.css'

export default function Form() {
	const [cityName, setCityName] = useState<string>('')
	const [country, setCountry] = useState<string>('')
	const [emoji, setEmoji] = useState<string>('')
	const [date, setDate] = useState<Date | null>(null)
	const [notes, setNotes] = useState<string>('')
	const [geoError, setGeoError] = useState<string>('')
	const [geoLoading, setGeoLoading] = useState<boolean>(false)

	const { mapLat, mapLng } = useUrlPosition()
	const { createCity, isLoading } = useCityContext()
	const navigate = useNavigate()

	console.log(country)

	useEffect(() => {
		if (!mapLat || !mapLng) return
		const fetchCityData = async () => {
			try {
				setGeoLoading(true)
				setGeoError('')
				const response = await fetch(
					`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
				)
				const data = await response.json()
				if (!data.countryCode)
					throw new Error(
						'That is not a valid location, click somewhere else on the map!'
					)
				setCityName(data.city || data.locality || '')
				setCountry(data.countryName || '')
				setEmoji(convertToEmoji(data.countryCode || ''))
			} catch (error: unknown) {
				const message =
					error instanceof Error
						? error.message
						: String(error) || 'Failed to fetch location data'
				setGeoError(message)
			} finally {
				setGeoLoading(false)
			}
		}
		fetchCityData()
	}, [mapLat, mapLng])

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!cityName || !date) return

		const newCity = {
			cityName,
			country,
			emoji,
			date: date.toISOString().split('T')[0],
			notes,
			position: {
				lat: mapLat ? parseFloat(mapLat) : 0,
				lng: mapLng ? parseFloat(mapLng) : 0,
			},
		} as CityProps

		await createCity(newCity)
		navigate('/app/cities')
	}

	if (geoError) {
		return <Message message={geoError} />
	}

	if (geoLoading) {
		return <Spinner />
	}

	if (!mapLat || !mapLng) {
		return <Message message="Click on the map to select a city" />
	}

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ''}`}
			onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					onChange={d => setDate(d)}
					selected={date}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	)
}
