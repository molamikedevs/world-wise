import { useMap } from 'react-leaflet'

interface ChangeViewProps {
	position: [number, number]
	latLngTuple?: boolean
}

export function ChangeView({ position }: ChangeViewProps) {
	const map = useMap()
	map.setView(position)
	return null
}
