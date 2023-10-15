import React from 'react'
import { IconProps } from '../IconProps'

export const FillRepost: React.FC<IconProps> = ({ size = 24, className }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='currentColor'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='m21.707 15.707-3 3a1 1 0 0 1-1.414 0l-3-3A1 1 0 0 1 15 14h6a1 1 0 0 1 .707 1.707Z'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M13 5a1 1 0 0 0 1 1h1a2 2 0 0 1 2 2v3a1 1 0 1 0 2 0V8a4 4 0 0 0-4-4h-1a1 1 0 0 0-1 1Zm-7 7a1 1 0 0 0-1 1v3a4 4 0 0 0 4 4h1a1 1 0 1 0 0-2H9a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1Z'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M6.707 5.293a1 1 0 0 0-1.414 0l-3 3A1 1 0 0 0 3 10h6a1 1 0 0 0 .707-1.707l-3-3Z'
		/>
	</svg>
)
