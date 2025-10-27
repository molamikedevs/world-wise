import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCityContext } from '../../../context/city-context'
import { formatDate } from '../../../utils'
import { CityProps } from '../../../types'
import BackButton from '../../common/back-button'
import styles from './city.module.css'
import Spinner from '../../common/spinner'
import Error from '../../common/error'

export default function City() {
	const { id } = useParams()
	const { getCityById, selectedCity, loading, error } = useCityContext()

	// Fetch city data when id changes
	useEffect(() => {
		if (id) getCityById(id)
	}, [id]) // eslint-disable-line react-hooks/exhaustive-deps

	// Handle loading, error, and no city found states
	if (loading) {
		return <Spinner />
	}

	if (!selectedCity) {
		return <div className="error">City not found</div>
	}

	if (error) {
		return <Error message="Failed to fetch city data" />
	}

	const { cityName, date, emoji, notes } = selectedCity as CityProps

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				{/* Link to Wikipedia page for the city */}
				<Link
					to={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer">
					Check out {cityName} on Wikipedia &rarr;
				</Link>
			</div>

			<div>
				<BackButton />
			</div>
		</div>
	)
}
