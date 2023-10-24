import React from 'react'
import { Code } from '@nextui-org/code'
import UserBadge from '@/components/atom/Chip'

type PostSegmentType =
	| 'text'
	| 'mention'
	| 'hashtag'
	| 'url'
	| 'bold'
	| 'italics'
	| 'underline'
	| 'strikethrough'
	| 'code'
	| 'spoiler'
	| 'link'

interface PostSegment {
	type: PostSegmentType
	value: string
	url?: string
}

const parsePost = (text: string): PostSegment[] => {
	const regex =
		/(@[a-zA-Z0-9_]+)|(#\w+)|((?:https?:\/\/)[\w/\-?=%.]+\.[\w/\-?=%.]+)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(__[^_]+__)|(\~\~[^\~]+\~\~)|(`[^`]+`)|(\|\|[^\|]+\|\|)|(\[[^\]]+\]\(https?:\/\/\S+\))|(\S+|\s+)/g
	const matches = text.match(regex) || []
	return matches.map((match): PostSegment => {
		switch (true) {
			case match.startsWith('@') && match.length > 4:
				return { type: 'mention', value: match }
			case match.startsWith('#') && match.length > 1:
				return { type: 'hashtag', value: match }
			case /^https?:\/\/\S+$/.test(match):
				return { type: 'url', value: match }
			case match.startsWith('**'):
				return { type: 'bold', value: match.slice(2, -2) }
			case match.startsWith('*'):
				return { type: 'italics', value: match.slice(1, -1) }
			case match.startsWith('__') && match.endsWith('__'):
				return { type: 'underline', value: match.slice(2, -2) }
			case match.startsWith('~~') && match.endsWith('~~'):
				return { type: 'strikethrough', value: match.slice(2, -2) }
			case match.startsWith('`'):
				return { type: 'code', value: match.slice(1, -1) }
			case match.startsWith('||') && match.endsWith('||'):
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
				return { type: 'text', value: match }
			default:
				return { type: 'text', value: match }
		}
	})
}

type SegmentClassesType = {
	[key in PostSegmentType]: string
}

const segmentClasses: Partial<SegmentClassesType> = {
	hashtag:
		'text-accent-500 hover:text-accent-600 hover:underline transition-colors',
	url: 'text-accent-500 hover:text-accent-600 hover:underline transition-colors',
	bold: 'font-bold',
	italics: 'italic',
	underline: 'underline',
	strikethrough: 'line-through',
}

const renderParsedPost = (
	segments: PostSegment[],
	maxTextLength: number,
): JSX.Element[] => {
	let elements: JSX.Element[] = []
	let bufferElements: (JSX.Element | string)[] = []

	for (const segment of segments) {
		const { type, value } = segment

		switch (type) {
			case 'mention':
				bufferElements.push(
					<UserBadge
						userID={value}
						variant='accent'
						size='xs'
						url={`https://example.com/${value.slice(1)}`}
					/>,
				)
				break
			case 'hashtag':
				bufferElements.push(
					<a
						href={`https://example.com/tags/${value.slice(1)}`}
						className={segmentClasses.hashtag}
					>
						{value}
					</a>,
				)
				break
			case 'url':
				bufferElements.push(
					<a
						href={value}
						className={segmentClasses.url}
					>
						{value}
					</a>,
				)
				break
			case 'bold':
				bufferElements.push(
					<strong className={segmentClasses.bold}>{value}</strong>,
				)
				break
			case 'italics':
				bufferElements.push(
					<em className={segmentClasses.italics}>{value}</em>,
				)
				break
			case 'underline':
				bufferElements.push(
					<span className={segmentClasses.underline}>{value}</span>,
				)
				break
			case 'strikethrough':
				bufferElements.push(
					<span className={segmentClasses.strikethrough}>
						{value}
					</span>,
				)
				break
			case 'code':
				bufferElements.push(<Code>{value}</Code>)
				break
			default:
				bufferElements.push(value)
		}
	}

	const convertedElements = convertBufferToElements(bufferElements)
	elements = [...elements, ...convertedElements]

	return elements
}

const convertBufferToElements = (
	buffer: (JSX.Element | string)[],
): JSX.Element[] => {
	let result: JSX.Element[] = []
	let currentBuffer: (JSX.Element | string)[] = []

	for (const item of buffer) {
		if (typeof item === 'string' && item.includes('\n\n')) {
			if (currentBuffer.length) {
				const paragraph = createParagraphFromBuffer(
					currentBuffer,
					result.length === 0,
				)
				if (paragraph) {
					result.push(paragraph)
				}
				currentBuffer = []
			}
			const splitTexts = item
				.split('\n\n')
				.filter((text) => text.trim() !== '')
			for (let i = 0; i < splitTexts.length - 1; i++) {
				result.push(
					<p
						key={result.length}
						className={`${
							result.length === 0 ? 'mb-3 mt-0' : 'my-3'
						} text-sm md:text-base`}
					>
						{splitTexts[i].replace('\n', '<br />')}
					</p>,
				)
			}
			if (splitTexts.length) {
				currentBuffer.push(
					splitTexts[splitTexts.length - 1].replace('\n', '<br />'),
				)
			}
		} else {
			currentBuffer.push(item)
		}
	}

	if (currentBuffer.length) {
		const paragraph = createParagraphFromBuffer(
			currentBuffer,
			result.length === 0,
		)
		if (paragraph) {
			result.push(paragraph)
		}
	}

	return result
}

const createParagraphFromBuffer = (
	buffer: (JSX.Element | string)[],
	isFirstParagraph: boolean,
): JSX.Element | null => {
	const content = buffer.map((item, index) =>
		typeof item === 'string'
			? item
			: React.cloneElement(item, { key: index }),
	)

	if (content.join('').trim() === '') {
		return null
	}

	return (
		<p
			key={Math.random()}
			className={`${
				isFirstParagraph ? 'mb-3 mt-0' : 'my-3'
			} text-sm md:text-base`}
		>
			{content}
		</p>
	)
}

export { parsePost, renderParsedPost }
