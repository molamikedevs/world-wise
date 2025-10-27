export function formatDate(date: string | number | Date): string {
	const d = new Date(date)
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}


export function convertToEmoji(countryCode: string): string {
	const code = countryCode.toUpperCase().replace(/[^A-Z]/g, '') // sanitize
	return String.fromCodePoint(...[...code].map(c => 127397 + c.charCodeAt(0)))
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const BASE_URL =
	'https://api.bigdatacloud.net/data/reverse-geocode-client'
