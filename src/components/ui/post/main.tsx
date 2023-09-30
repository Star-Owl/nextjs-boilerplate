import React, { useState } from 'react'
import { Button } from '../button'
import { parsePost, renderParsedPost } from '@/lib/post/postParser'

interface Props {
	/**
	 * The text of the post.
	 */
	text: string
	/**
	 * The URL of the post details page.
	 */
	detailsUrl: string
	/**
	 * The maximum length of the post text to display.
	 * @default 150
	 */
	maxTextLength?: number
}

/**
 * A component that displays a post with a "Show more" button to expand the text.
 */
const PostContent: React.FC<Props> = ({
	text,
	detailsUrl,
	maxTextLength = 150,
}) => {
	// Define state for whether to show the full text or not
	const [showMore, setShowMore] = useState(false)

	/**
	 * Handles the "Show more" button click event.
	 */
	const handleShowMoreClick = () => {
		setShowMore((prevState) => !prevState)
	}

	// Calculate the maximum number of lines to display
	const maxLinesCount = 8
	const breakLinesCount = (text.match(/\n/g) || []).length
	const segments = parsePost(text)
	// Render the post text with the appropriate length
	const formattedText = showMore
		? renderParsedPost(segments, Infinity)
		: renderParsedPost(segments, maxTextLength)
	// Determine whether to show the "Show more" button
	const shouldShowMore =
		text.length > maxTextLength || breakLinesCount > maxLinesCount

	return (
		<div className='whitespace-pre-line leading-normal'>
			{formattedText.length > 0 ? (
				<React.Fragment>
					{formattedText}
					{shouldShowMore && (
						<Button
							onClick={handleShowMoreClick}
							size={'link'}
							variant={'link'}
							className='ml-2'
						>
							{showMore ? 'Show Less' : 'Show more'}
						</Button>
					)}
				</React.Fragment>
			) : (
				<span>This post is empty.</span>
			)}
		</div>
	)
}

export default PostContent
