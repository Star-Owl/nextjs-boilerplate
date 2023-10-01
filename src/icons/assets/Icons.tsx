import React from 'react'
import { IconProps } from '../IconProps'

// OUTLINE ICONS
export const ArrowBack: React.FC<IconProps> = ({ className, size }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M22 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h18a1 1 0 0 1 1 1Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2.293 12.707a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 1.414L4.414 12l4.293 4.293a1 1 0 1 1-1.414 1.414l-5-5Z'
			fill='currentColor'
		/>
	</svg>
)

export const Close: React.FC<IconProps> = ({ className, size }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M17.656 6.343a1 1 0 0 0-1.414 0L12 10.586 7.757 6.343a1 1 0 0 0-1.414 1.415L10.585 12l-4.242 4.242a1 1 0 1 0 1.414 1.414l4.242-4.242 4.243 4.243a1 1 0 0 0 1.414-1.414L13.413 12l4.243-4.243a1 1 0 0 0 0-1.414Z'
			fill='currentColor'
		/>
	</svg>
)

// FILLED ICONS

export const BookmarkCheck: React.FC<IconProps> = ({ className, size }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M4 6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v14c0 1.684-1.953 2.615-3.26 1.554l-4.11-3.335a1 1 0 0 0-1.26 0l-4.11 3.335C5.953 22.614 4 21.684 4 20V6Zm11.707 2.707a1 1 0 0 0-1.414-1.414L11 10.586 9.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z'
			fill='currentColor'
		/>
	</svg>
)
