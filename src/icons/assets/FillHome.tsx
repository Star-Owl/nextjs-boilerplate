import React from 'react'
import { IconProps } from '../IconProps'

export const FillHome: React.FC<IconProps> = ({ className, size }) => (
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
			d='M12.708 3.08a3 3 0 0 0-1.416 0c-.531.13-1 .449-1.535.812L4.756 7.28c-.426.288-.802.542-1.083.888a3 3 0 0 0-.545 1.028c-.129.427-.129.88-.128 1.395v6.248c0 .527 0 .982.03 1.356.033.396.104.789.297 1.167a3 3 0 0 0 1.311 1.311c.379.193.772.265 1.167.297.375.03.83.03 1.357.03h9.677c.527 0 .982 0 1.356-.03.395-.032.789-.104 1.167-.297a3 3 0 0 0 1.311-1.31c.193-.38.264-.772.297-1.168.03-.374.03-.829.03-1.356V10.59c0-.515.001-.968-.127-1.395a3 3 0 0 0-.545-1.028c-.282-.346-.657-.6-1.084-.888l-5-3.388c-.535-.363-1.005-.682-1.536-.811Z'
			fill='currentColor'
		/>
	</svg>
)
