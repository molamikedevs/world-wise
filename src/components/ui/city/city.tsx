import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils'
import BackButton from '../../common/back-button'
import styles from './city.module.css'

export default function City() {
	// TEMP DATA
	const currentCity = {
		cityName: 'Lisbon',
		emoji: '🇵🇹',
		date: '2027-10-31T15:59:59.138Z',
		notes: 'My favorite city so far!',
	}

	const { cityName, emoji, date, notes } = currentCity

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
