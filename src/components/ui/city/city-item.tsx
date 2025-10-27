import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils'
import { CityProps } from '../../../types'
import styles from './cityItem.module.css'
import { useCityContext } from '../../../context/contexts'

export default function CityItem({
	city: {
		emoji,
		cityName,
		date,
		id,
		position: { lat, lng },
	},
}: {
	city: CityProps
}) {
	const { city, deleteCity } = useCityContext()

	async function handleDelete(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault()
		e.stopPropagation()
		await deleteCity(id)
	}

	return (
		<li>
			<Link
				to={`${id}?lat=${lat}&lng=${lng}`}
				className={`${styles.cityItem} ${
					id === city?.id ? styles['cityItem--active'] : ''
				}`}>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button onClick={handleDelete} className={styles.deleteBtn}>
					&times;
				</button>
			</Link>
		</li>
	)
}
