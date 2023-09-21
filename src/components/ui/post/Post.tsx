import PostHeader from '@/components/layout/post/header'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { Button } from '../button'
import Chip from '@mui/material/Chip'

interface Props {
	text: string
	detailsUrl: string
	maxTextLength?: number
}

const formatPostContent = (text: string) => {
	const regex =
		/(@[a-zA-Z0-9_]+)|(#\w+)|(\n)|((?:https?:\/\/)?(?:[\w/\-?=%.]+\.)+[\w/\-?=%.]+)/g
	const parts = text ? text.split(regex) : []
	return parts.map((part, index) => {
		switch (true) {
			case !part:
				return null
			case part.startsWith('@'):
				return (
					<a
						className='!h-auto w-fit cursor-pointer rounded-[.375rem] bg-white/[.06] !px-[.562rem] !py-[.281rem] text-xs text-white/[.60] transition-colors hover:bg-white/[.12] hover:text-white'
						key={index}
						href={`https://example.com/${part.slice(1)}`}
					>
						{part}
					</a>
				)
			case part.startsWith('#'):
				return (
					<a
						key={index}
						className='text-blue-600'
						href={`https://example.com/tags/${part.slice(1)}`}
					>
						{part}
					</a>
				)
			case !!part &&
				!!part.match(
					/^(?:https?:\/\/)?(?:[\w/\-?=%.]+\.)+[\w/\-?=%.]+$/i,
				):
				return (
					<a
						key={index}
						href={`https://${part}`}
						target='_blank'
						className='text-blue-600'
						rel='noopener noreferrer'
					>
						{part}
					</a>
				)
			case part === '\n':
				return <br key={index} />
			default:
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
			className='leading-normal'
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
