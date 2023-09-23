import React, { useState } from 'react'
import { Button } from '../button'

interface Props {
	text: string
	detailsUrl: string
	maxTextLength?: number
}

const formatPostContent = (text: string, maxTextLength: number) => {
	const regex =
		/(@[a-zA-Z0-9_]+)|(#\w+)|(\n)|((?:https?:\/\/)[\w/\-?=%.]+\.[\w/\-?=%.]+)|(\S+|\s+)/g

	let displayText = text
	if (text.length > maxTextLength) {
		const lastValidIndex = text.lastIndexOf(' ', maxTextLength - 3) // znajdź ostatnią spację przed maksymalną długością
		displayText = `${text.slice(0, lastValidIndex)}...`
	}

	const parts = displayText.match(regex) || []

	let buffer = ''
	const result: JSX.Element[] = []

	parts.forEach((part, index) => {
		const pushBuffer = () => {
			if (buffer) {
				result.push(<span key={index + 's'}>{buffer}</span>)
				buffer = ''
			}
		}

		switch (true) {
			case !part:
				return
			case part.startsWith('@'):
				pushBuffer()
				result.push(
					<a
						key={index + 'a'}
						className='w-fit cursor-pointer rounded-[.313rem] bg-white/[.06] px-[.376rem] py-[.188rem] text-sm text-white/[.60] transition-colors hover:bg-white/[.12] hover:text-white'
						href={`https://example.com/${part.slice(1)}`}
					>
						{part}
					</a>,
				)
				break
			case part.startsWith('#'):
				pushBuffer()
				result.push(
					<a
						key={index + 'h'}
						className='text-blue-600'
						href={`https://example.com/tags/${part.slice(1)}`}
					>
						{part}
					</a>,
				)
				break
			case !!part.match(/(?:https?:\/\/)[\w/\-?=%.]+\.[\w/\-?=%.]+/i):
				pushBuffer()
				const displayUrl = part.replace(/^https?:\/\//, '')
				result.push(
					<a
						key={index + 'l'}
						href={part}
						className='text-blue-600'
					>
						{displayUrl}
					</a>,
				)
				break
			case part === '\n':
				pushBuffer()
				result.push(<br key={index + 'br'} />)
				break
			default:
				buffer += part
				break
		}

		if (index === parts.length - 1) {
			pushBuffer()
		}
	})

	return result
}

const Post: React.FC<Props> = ({ text, detailsUrl, maxTextLength = 150 }) => {
	const [showMore, setShowMore] = useState(false)

	const handleShowMoreClick = () => {
		setShowMore(!showMore)
	}

	const maxLinesCount = 8
	const breakLinesCount = (text.match(/\n/g) || []).length

	let shouldShowMore =
		text.length > maxTextLength || breakLinesCount > maxLinesCount

	let displayText = text
	if (!showMore && shouldShowMore) {
		const lastValidIndex = text.lastIndexOf(' ', maxTextLength - 3)
		displayText = `${text.slice(0, lastValidIndex)}...`
	}

	const formattedText = formatPostContent(displayText, maxTextLength)

	return (
		<p className='leading-normal'>
			{formattedText.length > 0 ? (
				<React.Fragment>
					{formattedText}
					{shouldShowMore && !showMore && (
						<Button
							onClick={handleShowMoreClick}
							size={'link'}
							variant={'link'}
							className='ml-2'
						>
							Show more
						</Button>
					)}
					{showMore && (
						<Button
							onClick={handleShowMoreClick}
							size={'link'}
							variant={'link'}
							className='ml-2'
						>
							Show Less
						</Button>
					)}
				</React.Fragment>
			) : (
				<p>This post is empty.</p>
			)}
		</p>
	)
}

export default Post
