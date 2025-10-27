import { NavLink } from 'react-router-dom'
import styles from './page-navigation.module.css'
import Logo from '../../ui/logo/logo'

export default function PageNavigation() {
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				<li>
					<NavLink to="/login" className={styles.ctaLink}>
						Login
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
