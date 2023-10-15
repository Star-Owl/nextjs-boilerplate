import React from 'react'

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
			case match.startsWith('@') && match.length > 1:
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
	mention:
		'w-fit cursor-pointer rounded-[.313rem] bg-white/[.06] px-[.376rem] py-[.188rem] text-sm text-white/[.60] transition-colors hover:bg-white/[.12] hover:text-white',
	hashtag: 'text-blue-600',
	url: 'text-blue-600',
	bold: 'font-bold',
	italics: 'italic',
	underline: 'underline',
}

const renderParsedPost = (
	segments: PostSegment[],
	maxTextLength: number,
): JSX.Element[] => {
	let buffer = ''
	for (const segment of segments) {
		const { type, value } = segment
		switch (type) {
			case 'mention':
				buffer += `<a href="https://example.com/${value.slice(
					1,
				)}" class="${segmentClasses.mention}">${value}</a>`
				break
			case 'hashtag':
				buffer += `<a href="https://example.com/tags/${value.slice(
					1,
				)}" class="${segmentClasses.hashtag}">${value}</a>`
				break
			case 'url':
				buffer += `<a href="${value}" class="${segmentClasses.url}">${value}</a>`
				break
			case 'bold':
				buffer += `<strong class="${segmentClasses.bold}">${value}</strong>`
				break
			case 'italics':
				buffer += `<em class="${segmentClasses.italics}">${value}</em>`
				break
			case 'underline':
				buffer += `<span class="${segmentClasses.underline}">${value}</span>`
				break
			default:
				buffer += value
		}
	}
	return convertTextToParagraphs(buffer)
}

const convertTextToParagraphs = (text: string): JSX.Element[] => {
	const paragraphs = text.split('\n\n')
	return paragraphs.map((paragraph, index) => (
		<p
			key={index}
			className={index === 0 ? 'mb-3 mt-0' : 'my-3'}
			dangerouslySetInnerHTML={{ __html: paragraph }}
		/>
	))
}

export { parsePost, renderParsedPost }
