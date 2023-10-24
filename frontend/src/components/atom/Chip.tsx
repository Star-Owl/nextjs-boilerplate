import { cn } from '@/lib/utils'
import { Chip, Link } from '@nextui-org/react'
import { cva } from 'class-variance-authority'
import { FunctionComponent } from 'react'

interface Props {
	userID?: string
	size?: 'xs' | 'sm' | 'lg'
	variant?: 'default' | 'opacity' | 'accent'
	link?: boolean
	url?: string
}

const badgeBaseVariants = cva('transition-colors', {
	variants: {
		variant: {
			default:
				'text-white-500 hover:text-white-50 bg-white/[.06] hover:bg-white/[.12]',
			opacity: 'bg-black/20 backdrop-blur-md',
			accent: 'text-accent-300 hover:text-accent-50 bg-accent-950 hover:bg-accent-600',
		},
		size: {
			xs: 'text-xs rounded-[.313rem] py-[.156rem] px-[.312rem]',
			sm: 'text-sm rounded-[.375rem] px-[.376rem] py-[.188rem]',
			default: 'text-base rounded-[0.875rem] px-[2rem] py-[1rem]',
			lg: 'text-xs py-[.375rem] px-[.750rem] rounded-[.375rem] md:text-lg md:rounded-lg md:py-[.437rem] md:px-[.874rem]',
			xl: 'text-xl rounded-[1.125rem] px-[3rem] py-[1.5rem]',
		},
		link: {
			true: 'cursor-pointer',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
})

// const badgeContentVariants = cva(
// 	'!p-0 overflow-hidden text-ellipsis whitespace-pre !leading-tight',
// 	{
// 		variants: {
// 			size: {
// 				xs: 'text-xs',
// 				sm: 'text-sm',
// 				default: 'text-base',
// 				lg: 'text-lg',
// 				xl: 'text-xl',
// 			},
// 		},
// 		defaultVariants: {
// 			size: 'default',
// 		},
// 	},
// )

const UserBadge: FunctionComponent<Props> = ({
	userID,
	size = 'sm',
	variant = 'default',
	link = false,
	url = undefined,
	...props
}) => {
	return (
		// <Chip
		// 	classNames={{
		// 		base: cn(badgeBaseVariants({ size, variant, link })),
		// 		content: cn(badgeContentVariants({ size })),
		// 	}}
		// >
		<a
			className={cn(badgeBaseVariants({ size, link, variant }), 'w-fit')}
			href={url}
		>
			{userID}
		</a>

		// </Chip>
	)
}

export default UserBadge
