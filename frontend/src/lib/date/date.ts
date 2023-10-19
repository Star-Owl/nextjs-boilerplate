function getCurrentDateTime() {
	const now = new Date()

	const month = now.getMonth() + 1 // Months are 0-based
	const day = now.getDate()
	const year = now.getFullYear()

	let hours = now.getHours()
	const ampm = hours >= 12 ? 'PM' : 'AM'

	hours = hours % 12
	hours = hours ? hours : 12 // the hour '0' should be '12'
	const minutes = String(now.getMinutes()).padStart(2, '0')
	const seconds = String(now.getSeconds()).padStart(2, '0')

	const dateStr = `${month}/${day}/${year}`
	const timeStr = `${hours}:${minutes} ${ampm}`

	return `${dateStr} and ${timeStr}`
}

export { getCurrentDateTime }
