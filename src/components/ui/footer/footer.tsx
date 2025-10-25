import styles from './footer.module.css'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.copyright}>
				© {new Date().getFullYear()} Word Wise. All rights reserved.
			</p>
		</footer>
	)
}
