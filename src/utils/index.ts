export function formatDate(date: string | number | Date): string {
	const d = new Date(date)
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}


