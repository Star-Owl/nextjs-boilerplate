import React from 'react'
import { IconProps } from '../../IconProps'

export const Cancer: React.FC<IconProps> = ({ className, size }) => (
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
			d='M3 15c0 1.997 1.335 3.52 2.996 4.489C7.671 20.466 9.85 21 12 21c2.103 0 5.439-.516 7.719-2.87a1 1 0 0 0-1.438-1.392C16.561 18.516 13.897 19 12 19a11.09 11.09 0 0 1-3.148-.454A4 4 0 0 0 7 11a4 4 0 0 0-4 4Zm2 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm7-10c1.091 0 2.173.162 3.148.454A4 4 0 0 0 17 13a4 4 0 0 0 4-4c0-1.997-1.335-3.52-2.996-4.489C16.329 3.534 14.15 3 12 3c-2.103 0-5.439.516-7.719 2.87A1 1 0 0 0 5.72 7.263C7.439 5.484 10.103 5 12 5Zm7 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
			fill='currentColor'
		/>
	</svg>
)
