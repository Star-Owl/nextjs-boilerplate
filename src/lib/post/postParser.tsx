import React from 'react'

// TODO: add more markdawn support
// Define the different types of post segments
type PostSegmentType =
	| 'text'
	| 'mention'
	| 'hashtag'
	| 'url'
	| 'newline'
	| 'bold'
	| 'italics'
	| 'underline'
	| 'strikethrough'
	| 'code'
	| 'spoiler'
	| 'link'
	| 'timestamp'

// Define the shape of a post segment
interface PostSegment {
	type: PostSegmentType
	value: string
	url?: string
}

/**
 * Parses a post text into an array of post segments.
 * @param text The post text to parse.
 * @returns An array of post segments.
 */
const parsePost = (text: string): PostSegment[] => {
	// Define a regular expression to match the different types of post segments
	// const regex =
	// 	/(@[a-zA-Z0-9_]+)|(#\w+)|(\n)|((?:https?:\/\/)[\w/\-?=%.]+\.[\w/\-?=%.]+)|(\S+|\s+)/g
	const regex =
		/(\*\*[^*]+\*\*)|(\*[^*]+\*|_[^_]+_)|(__[^_]+__)|(\~\~[^\~]+\~\~)|(`[^`]+`)|(\|\|[^\|]+\|\|)|(\[[^\]]+\]\(https?:\/\/\S+\))|(@[a-zA-Z0-9_]+)|(#\w+)|(\n)|((?:https?:\/\/)[\w/\-?=%.]+\.[\w/\-?=%.]+)|(\S+|\s+)/g
	// Match the regular expression against the post text
	const matches = text.match(regex) || []
	// Map each match to a post segment based on its type
	return matches.map((match): PostSegment => {
		switch (true) {
			case match.startsWith('@') && match.length > 1:
				return { type: 'mention', value: match }
			case match.startsWith('#') && match.length > 1:
				return { type: 'hashtag', value: match }
			case /^https?:\/\/\S+$/.test(match):
				return { type: 'url', value: match }
			case match === '\n':
				return { type: 'newline', value: '\n' }
			case match.startsWith('**'):
				return { type: 'bold', value: match.slice(2, -2) } // Usuń ** z początku i końca
			case match.startsWith('*') || match.startsWith('_'):
				return { type: 'italics', value: match.slice(1, -1) }
			case match.startsWith('__'):
				return { type: 'underline', value: match.slice(2, -2) }
			case match.startsWith('~~'):
				return { type: 'strikethrough', value: match.slice(2, -2) }
			case match.startsWith('`'):
				return { type: 'code', value: match.slice(1, -1) }
			case match.startsWith('||'):
				return { type: 'spoiler', value: match.slice(2, -2) }
			case match.startsWith('['):
				const urlMatch = /\[([^\]]+)\]\((https?:\/\/\S+)\)/.exec(match)
				if (urlMatch) {
					return {
						type: 'link',
						value: urlMatch[1],
						url: urlMatch[2],
					}
				}
				return { type: 'text', value: match } // Wyjście awaryjne, nie powinno się zdarzyć
			default:
				return { type: 'text', value: match }
		}
	})
}

/**
 * Renders a parsed post as an array of JSX elements.
 * @param segments The array of post segments to render.
 * @param maxTextLength The maximum length of the post text to render.
 * @returns An array of JSX elements representing the parsed post.
 */
const renderParsedPost = (
	segments: PostSegment[],
	maxTextLength: number,
): JSX.Element[] => {
	// Initialize the result array and the current length and buffer
	const result: JSX.Element[] = []
	let currentLength = 0
	let buffer = ''

	// Define a helper function to push the buffer to the result array
	const pushBuffer = (index: number, truncated = false) => {
		// If the buffer is not empty, add it to the result array
		if (buffer) {
			// Calculate the remaining length and truncate the buffer if necessary
			const remainingLength = maxTextLength - currentLength
			if (buffer.length > remainingLength) {
				buffer = `${buffer.slice(0, remainingLength - 3)}...`
				result.push(<span key={index + 's'}>{buffer}</span>)
				return true
			}
			result.push(<span key={index + 's'}>{buffer}</span>)
			currentLength += buffer.length
			buffer = ''
		}

		return truncated
	}

	// Iterate over each post segment and render it as a JSX element
	for (const [index, segment] of segments.entries()) {
		const { type, value } = segment

		if (type === 'text') {
			buffer += value
			continue
		}

		if (type === 'mention' || type === 'hashtag' || type === 'url') {
			// If the current length plus the buffer length plus the segment length exceeds the maximum length,
			// truncate the buffer and return the result array
			if (currentLength + buffer.length + value.length > maxTextLength) {
				if (pushBuffer(index, true)) {
					return result
				}
				result.push(<span key={index + 'truncated'}>...</span>)
				return result
			}
			// Otherwise, push the buffer to the result array and render the segment as a link
			pushBuffer(index)
			if (type === 'mention') {
				result.push(
					<a
						key={index + 'a'}
						className='w-fit cursor-pointer rounded-[.313rem] bg-white/[.06] px-[.376rem] py-[.188rem] text-sm text-white/[.60] transition-colors hover:bg-white/[.12] hover:text-white'
						href={`https://example.com/${value.slice(1)}`}
					>
						{value}
					</a>,
				)
			} else if (type === 'hashtag') {
				result.push(
					<a
						key={index + 'h'}
						className='text-blue-600'
						href={`https://example.com/tags/${value.slice(1)}`}
					>
						{value}
					</a>,
				)
			} else {
				const displayUrl = value.replace(/^https?:\/\//, '')
				result.push(
					<a
						key={index + 'l'}
						href={value}
						className='text-blue-600'
					>
						{displayUrl}
					</a>,
				)
			}
			currentLength += value.length
			continue
		}

		if (type === 'bold') {
			result.push(<strong key={index + 'b'}>{value}</strong>)
			continue
		}

		if (type === 'italics') {
			result.push(<em key={index + 'i'}>{value}</em>)
			continue
		}

		if (type === 'newline') {
			// If the current length plus the buffer length plus one exceeds the maximum length,
			// truncate the buffer and return the result array
			if (currentLength + buffer.length + 1 > maxTextLength) {
				if (pushBuffer(index, true)) {
					return result
				}
				result.push(<span key={index + 'truncated'}>...</span>)
				return result
			}
			// Otherwise, push the buffer to the result array and add a line break
			pushBuffer(index)
			result.push(<br key={index + 'br'} />)
			currentLength++
			continue
		}

		// If the current length exceeds the maximum length, break out of the loop
		if (currentLength >= maxTextLength) {
			break
		}
	}

	// Push the remaining buffer to the result array
	pushBuffer(segments.length)

	return result
}

export { parsePost, renderParsedPost }
