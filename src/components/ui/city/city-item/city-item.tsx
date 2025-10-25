import { City } from '../../../../types'
import { formatDate } from '../../../../utils'
import styles from './cityItem.module.css'

export default function CityItem({
	city: { emoji, cityName, date },
}: {
	city: City
}) {
	
	return (
		<li className={styles.cityItem}>
			<span className={styles.emoji}>{emoji}</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>({formatDate(date)})</time>
			<button className={styles.deleteBtn}>&times;</button>
		</li>
	)
}
