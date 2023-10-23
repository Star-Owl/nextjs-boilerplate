import { Chip } from '@nextui-org/react'
import React from 'react'
import { FunctionComponent } from 'react'
import Twemoji from 'react-twemoji'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import UserBadge from '../atom/Chip'

interface Props {
	displayName?: string
	userID: string
	size?: 'xs' | 'sm' | 'lg'
	variant?: 'default' | 'opacity' | 'accent'
	link?: boolean
}

const typographyVariants = cva(
	'w-fit overflow-hidden text-ellipsis whitespace-pre font-bold',
	{
		variants: {
			variant: {
				default: '',
			},
			size: {
				xs: 'text-base',
				sm: '',
				default: '',
				lg: 'text-xxl',
				xl: 'text-xxl',
			},
			link: {
				true: 'cursor-pointer hover:underline',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

const UserInfo: FunctionComponent<Props> = ({
	displayName = 'unknown',
	userID = 'unknown',
	size = 'sm',
	variant = 'default',
	link = false,
	...props
}) => {
	return (
		<React.Fragment {...props}>
			<Twemoji
				noWrapper
				options={{ className: 'emoji' }}
			>
				<span className={cn(typographyVariants({ size, link }))}>
					{displayName}
				</span>
			</Twemoji>
			<UserBadge
				userID={userID}
				size={size}
				variant={variant}
				link={link}
			/>
		</React.Fragment>
	)
}

export default UserInfo
