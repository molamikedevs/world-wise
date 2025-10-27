import { useCityContext } from '../../../context/city-context'
import Spinner from '../../common/spinner'
import Message from '../message/message'
import CityItem from './city-item'
import styles from './city-list.module.css'


export default function CityList() {
	const { cities, loading } = useCityContext()
	if (loading) {
		return <Spinner />
	}

	if (!cities?.length) {
		return (
			<Message message="No cities added yet. Start by adding your city by clicking on the map." />
		)
	}

	return (
		<ul className={styles.cityList}>
			{cities.map(city => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	)
}
