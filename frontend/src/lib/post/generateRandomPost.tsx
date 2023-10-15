import Chance from 'chance'

const chance = new Chance()

interface FormatSpan {
	start: number
	end: number
}

function generateRandomPost(): string {
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

	// Wstaw kursywę
	const italicsCount = chance.integer({ min: 1, max: 3 })
	for (let i = 0; i < italicsCount; i++) {
		const italics = `*${chance.word()}*` || `_${chance.word()}_`
		const position = chance.integer({ min: 0, max: text.length })
		text = `${text.slice(0, position)} ${italics} ${text.slice(position)}`
	}

	// Wstaw pogrubienie
	const boldCount = chance.integer({ min: 1, max: 3 })
	for (let i = 0; i < boldCount; i++) {
		const bold = `**${chance.word()}**`
		const position = chance.integer({ min: 0, max: text.length })
		text = `${text.slice(0, position)} ${bold} ${text.slice(position)}`
	}

	// Wstaw podkreślenie
	const underlineCount = chance.integer({ min: 1, max: 3 })
	for (let i = 0; i < underlineCount; i++) {
		const underline = `__${chance.word()}__`
		const position = chance.integer({ min: 0, max: text.length })
		text = `${text.slice(0, position)} ${underline} ${text.slice(position)}`
	}

	const formatSpans: FormatSpan[] = []

	const isPositionInExistingSpan = (
		position: number,
		tagLength: number,
	): boolean => {
		return formatSpans.some(
			(span) =>
				position >= span.start && position <= span.end - tagLength,
		)
	}

	const insertFormatting = (
		text: string,
		tag: string,
		count: number,
	): string => {
		for (let i = 0; i < count; i++) {
			let position = 0 // Tutaj inicjalizujemy position wartością 0
			let isValidPosition = false

			while (!isValidPosition) {
				position = chance.integer({ min: 0, max: text.length })
				isValidPosition = true

				if (isPositionInExistingSpan(position, tag.length)) {
					isValidPosition = false // Jeśli pozycja jest w istniejącym zakresie, pozycja jest nieważna
				}
			}

			// Wstaw formatowanie w bezpiecznej pozycji
			const formattedWord = `${tag}${chance.word()}${tag}`
			text = `${text.slice(0, position)} ${formattedWord} ${text.slice(
				position,
			)}`

			// Aktualizuj zakresy formatowania
			formatSpans.push({
				start: position,
				end: position + formattedWord.length,
			})
		}

		return text
	}

	text = insertFormatting(text, '**', chance.integer({ min: 1, max: 3 })) // Wstaw pogrubienie
	text = insertFormatting(text, '*', chance.integer({ min: 1, max: 3 })) // Wstaw kursywę
	text = insertFormatting(text, '__', chance.integer({ min: 1, max: 3 })) // Wstaw podkreślenie

	return text
}

export default generateRandomPost
