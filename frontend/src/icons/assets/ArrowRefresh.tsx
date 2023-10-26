import React from 'react'
import { IconProps } from '../IconProps'

export const ArrowRefesh: React.FC<IconProps> = ({ className, size }) => (
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
			d='M12 5a6.99 6.99 0 0 1 5.71 2.95 1 1 0 1 0 1.63-1.158A9 9 0 0 0 3 12a1 1 0 1 0 2 0 7 7 0 0 1 7-7Zm0 14a6.99 6.99 0 0 1-5.71-2.95 1 1 0 1 0-1.63 1.159A9 9 0 0 0 21 12a1 1 0 1 0-2 0 7 7 0 0 1-7 7Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M19.707 8.707A1 1 0 0 0 20 8V3a1 1 0 1 0-2 0v4h-4a1 1 0 1 0 0 2h5a1 1 0 0 0 .707-.293ZM4.293 15.293A1 1 0 0 0 4 16v5a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2H5a1 1 0 0 0-.707.293Z'
			fill='currentColor'
		/>
	</svg>
)
