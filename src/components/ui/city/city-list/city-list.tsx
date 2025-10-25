import { City } from '../../../../types';
import Spinner from '../../../common/spinner';
import Message from '../../message/message';
import CityItem from '../city-item/city-item';
import styles from './city-list.module.css'



interface CityListProps {
    cities: Array<City>;
    isLoading: boolean;
}
export default function CityList({ cities, isLoading }: CityListProps) {
    
    if (isLoading) {
        return <Spinner />;
    }

    if(!cities.length) {
        return <Message message="No cities added yet. Start by adding your city by clicking on the map." />;
    }

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem key={city.id} city={city} />
            ))}
        </ul>
    )
}