import Chance from 'chance'

const chance = new Chance()

function generateRandomPost() {
	let text = chance.paragraph()

	// Wstaw losową liczbę znaków nowej linii
	const breakLineCount = chance.integer({ min: 1, max: 6 })
	for (let i = 0; i < breakLineCount; i++) {
		const position = chance.integer({ min: 0, max: text.length })
		text = `${text.slice(0, position)}\n\n${text.slice(position)}`
	}

	// Wstaw hashtagi
	const hashtagCount = chance.integer({ min: 1, max: 3 })
	for (let i = 0; i < hashtagCount; i++) {
		const tag = `#${chance.word()}`
		const position = chance.integer({ min: 0, max: text.length })
		text = `${text.slice(0, position)} ${tag} ${text.slice(position)}`
	}

	// Wstaw wzmianki
	const mentionCount = chance.integer({ min: 1, max: 3 })
	for (let i = 0; i < mentionCount; i++) {
		const mention = `@${chance.word()}`
		const position = chance.integer({ min: 0, max: text.length })
		text = `${text.slice(0, position)} ${mention} ${text.slice(position)}`
	}

	// Wstaw losowe domeny
	const domainCount = chance.integer({ min: 1, max: 2 })
	const domains = ['com', 'net', 'org', 'io', 'domain']
	const protocols = ['http://', 'https://', ''] // puste dla braku protokołu

	for (let i = 0; i < domainCount; i++) {
		const domain = `${chance.word()}.${chance.pickone(domains)}`
		const protocol = chance.pickone(protocols)
		const url = `${protocol}${domain}`
		const position = chance.integer({ min: 0, max: text.length })
		text = `${text.slice(0, position)} ${url} ${text.slice(position)}`
	}

	return text
}

export default generateRandomPost
