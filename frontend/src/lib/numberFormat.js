import numeral from 'numeral'

export function FormatNumber(value) {
	if (value >= 1000 && value < 10000) {
		return numeral(value).format('0,0')
	}

	if (value >= 10000) {
		return numeral(value).format('0.0a').toUpperCase()
	}

	return value.toString()
}
