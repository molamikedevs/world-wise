import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
	const location = useLocation()

	useEffect(() => {
		console.error(
			'404 Error: User attempted to access non-existent route:',
			location.pathname
		)
	}, [location.pathname])

	return (
		<div className="not-found">
			<div>
				<h1>404</h1>
				<p>Oops! Page not found</p>
				<Link to="/" className="not-found-link">
					Return to Home
				</Link>
			</div>
		</div>
	)
}

export default NotFound
