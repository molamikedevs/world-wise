import Map from '../../components/ui/map/map'
import Sidebar from '../../components/ui/sidebar/sidebar'
import styles from './app-layout.module.css'

export default function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
            <Map />
		</div>
	)
}
