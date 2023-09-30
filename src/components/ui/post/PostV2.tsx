import React, { useState } from 'react'
import Markdown from 'marked-react'

const MAX_CONTENT_LENGTH = 300

interface PostProps {
	content: string
	onReadMore?: () => void
}

function enhanceContent(content: string): string {
	// Przetwarza @mentions na odnośniki
	const mentionRegex = /@(\w+)/g
	const mentionReplacement = `<a class='w-fit cursor-pointer rounded-[.375rem] bg-white/[.06] px-[.500rem] py-[.250rem] text-white/[.60] transition-colors hover:bg-white/[.12] hover:text-white' href='/$1'>@$1</a>`
	const withMentions = content.replace(mentionRegex, mentionReplacement)

	// Przetwarza #hashtags na odnośniki
	const hashtagRegex = /#(\w+)/g
	const hashtagReplacement = `<a class='text-blue-600' href='/hashtag/$1'>#$1</a>`
	return withMentions.replace(hashtagRegex, hashtagReplacement)
}

function PostContent({ content }: { content: string }) {
	const safeContent = enhanceContent(content)

	return <span dangerouslySetInnerHTML={{ __html: safeContent }} />
}

const Postv2: React.FC<PostProps> = ({ content, onReadMore }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleReadMore = () => {
		setIsExpanded(true)
		if (onReadMore) {
			onReadMore()
		}
	}

	const renderContent = () => {
		if (isExpanded || content.length <= MAX_CONTENT_LENGTH) {
			return <PostContent content={content} />
		}

		return (
			<React.Fragment>
				<PostContent content={content} />
				<button
					onClick={handleReadMore}
					className='mt-2 text-blue-500 hover:underline focus:outline-none'
				>
					Read More
				</button>
			</React.Fragment>
		)
	}

	return <main className='w-full'>{renderContent()}</main>
}

export default Postv2
