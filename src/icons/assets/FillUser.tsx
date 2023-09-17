import React from 'react'
import { IconProps } from '../IconProps'

export const FillUser: React.FC<IconProps> = ({ className, size }) => (
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
			d='M9 14a5 5 0 0 0-5 5 3 3 0 0 0 3 3h10a3 3 0 0 0 3-3 5 5 0 0 0-5-5H9Zm3-12a5 5 0 1 0 0 10 5 5 0 0 0 0-10'
			fill='currentColor'
		/>
	</svg>
)
