import { NavLink } from 'react-router-dom';
import styles from './app-navigation.module.css';

export default function AppNavigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/app/cities">Cities</NavLink>
                </li>
                <li>
                    <NavLink to="/app/countries">Countries</NavLink>
                </li>
            </ul>
        </nav>
    );
}