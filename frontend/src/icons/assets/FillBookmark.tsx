import React from 'react'
import { IconProps } from '../IconProps'

export const FillBookmark: React.FC<IconProps> = ({ className, size }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8 2a4 4 0 0 0-4 4v14c0 1.684 1.953 2.615 3.26 1.554l4.11-3.335a1 1 0 0 1 1.26 0l4.11 3.335c1.307 1.06 3.26.13 3.26-1.553V6a4 4 0 0 0-4-4H8Z"
			fill="currentColor"
		/>
	</svg>
)
