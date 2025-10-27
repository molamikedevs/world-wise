
import { useCityContext } from '../../../context/city-context'
import Spinner from '../../common/spinner'
import Message from '../message/message'
import CountryItem from './country-item'
import styles from './country-list.module.css'

export default function CountryList() {
	const { cities, loading } = useCityContext()
	if (loading) {
		return <Spinner />
	}

	if (!cities?.length) {
		return (
			<Message message="No cities added yet. Start by adding your city by clicking on the map." />
		)
	}

	// Extract unique countries from cities
	const countries = cities.reduce<{ country: string; emoji: string }[]>(
		(arr, city) => {
			if (!arr.map(el => el.country).includes(city.country))
				return [...arr, { country: city.country, emoji: city.emoji }]
			else return arr
		},
		[]
	)

	return (
		<ul className={styles.countryList}>
			{countries.map(country => (
				<CountryItem key={country.country} country={country} />
			))}
		</ul>
	)
}

