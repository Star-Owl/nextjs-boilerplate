import { Chip } from '@nextui-org/react'
import React from 'react'
import { FunctionComponent } from 'react'
import Twemoji from 'react-twemoji'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface Props {
	userID?: string
	size?: 'xs' | 'sm' | 'lg'
	variant?: 'default' | 'opacity'
	link?: boolean
}

const typographyVariants = cva(
	'w-max overflow-hidden text-ellipsis whitespace-pre font-bold',
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

const badgeBaseVariants = cva('group !h-auto transition-colors', {
	variants: {
		variant: {
			default: 'bg-white/[.06]',
			opacity: 'bg-black/20 backdrop-blur-md',
		},
		size: {
			xs: 'text-xs rounded-[0.25rem] py-[.2rem] px-[.5rem]',
			sm: 'text-sm rounded-[.375rem] py-[.281rem] px-[.562rem]',
			default: 'text-base rounded-[0.875rem] px-[2rem] py-[1rem]',
			lg: 'text-lg rounded-lg py-[.297rem] px-[.594rem]',
			xl: 'text-xl rounded-[1.125rem] px-[3rem] py-[1.5rem]',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
})

const badgeContentVariants = cva(
	'!p-0 group-hover:text-white overflow-hidden text-ellipsis whitespace-pre !leading-tight',
	{
		variants: {
			size: {
				xs: 'text-xs rounded-[0.25rem] py-[.2rem] px-[.5rem]',
				sm: 'text-sm rounded-[.375rem] py-[.281rem] px-[.562rem]',
				default: 'text-base rounded-[0.875rem] px-[2rem] py-[1rem]',
				lg: 'text-lg rounded-lg py-[.297rem] px-[.594rem]',
				xl: 'text-xl rounded-[1.125rem] px-[3rem] py-[1.5rem]',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	},
)

const UserInfo: FunctionComponent<Props> = ({
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
					Hasira 🥃🪴
				</span>
			</Twemoji>
			<Chip
				classNames={{
					base: cn(badgeBaseVariants({ size, variant })),
					content: cn(badgeContentVariants({ size })),
				}}
			>
				@starowl.social
			</Chip>
		</React.Fragment>
	)
}

export default UserInfo
