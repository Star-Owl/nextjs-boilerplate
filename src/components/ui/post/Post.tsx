import PostHeader from '@/components/layout/post/header'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { Button } from '../button'

interface Props {
	text: string
	detailsUrl: string
	maxTextLength?: number
}

const formatPostContent = (text: string) => {
	const regex = /(@[a-zA-Z0-9_]+)|(#\w+)|(\n)/g
	const parts = text ? text.split(regex) : []
	return parts.map((part, index) => {
		if (!part) return null

		if (part.match(regex)) {
			if (part.startsWith('@')) {
				return (
					<a
						key={index}
						href={`https://example.com/${part.slice(1)}`}
					>
						{part}
					</a>
				)
			} else if (part.startsWith('#')) {
				return (
					<a
						key={index}
						href={`https://example.com/tags/${part.slice(1)}`}
					>
						{part}
					</a>
				)
			} else if (part === '\n') {
				return <br key={index} />
			}
		} else {
			return <span key={index}>{part}</span>
		}
	})
}

const Post: React.FC<Props> = ({ text, detailsUrl, maxTextLength = 150 }) => {
	const [showMore, setShowMore] = useState(false)

	const handleShowMoreClick = () => {
		showMore ? setShowMore(false) : setShowMore(true)
	}

	const GoToPost = () => {
		console.log('detailsUrl')
	}

	const maxLinesCount = 4
	const breakLinesCount = (text.match(/\n/g) || []).length

	let shouldShowMore =
		text.length > maxTextLength || breakLinesCount > maxLinesCount

	let displayText = text
	if (!showMore && shouldShowMore) {
		displayText = text.slice(0, maxTextLength - 3) + '...'
	}

	const formattedText = formatPostContent(displayText)

	return (
		<Typography
			variant='body2'
			component='p'
			className=''
		>
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
		</Typography>
	)
}

export default Post
