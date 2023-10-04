import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'src/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center capitalize font-base gap-[0.75rem] leading-normal font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				default:
					'text-accent-50 bg-accent-600 hover:bg-accent-700 active:bg-accent-800 disabled:bg-accent-600 focus:outline focus:outline-2 outline-offset-4  outline-accent-50',
				secondary:
					'text-accent-300 bg-transparent ring-2 ring-inset ring-accent-300 hover:bg-accent-950 active:bg-accent-900 disabled:bg-transparent',
				outline:
					'bg-transparent ring-2 ring-inset ring-white-50 hover:text-white-300 hover:ring-white-300 hover:bg-white-50/[.06] active:bg-white-50/[.12] disabled:bg-transparent',
				ghost: 'hover:text-white-300 hover:bg-white-50/[.06] active:bg-white-50/[.12] disabled:bg-transparent',
				dimmed: 'bg-black/[.12] backdrop-blur-md hover:bg-black/[.24]',
				link: 'text-accent-600 underline-offset-4 hover:underline',
				danger: 'text-danger-50 bg-danger-600 hover:bg-danger-700 active:bg-danger-800 disabled:bg-danger-600',
				warning:
					'text-warning-50 bg-warning-600 hover:bg-warning-700 active:bg-warning-800 disabled:bg-warning-600',
				success:
					'text-success-50 bg-success-600 hover:bg-success-700 active:bg-success-800 disabled:bg-success-600',
			},
			rounded: {
				true: '!rounded-full',
			},
			size: {
				link: 'p-0',
				xs: 'rounded-[0.5rem] px-[1rem] py-[.5rem]',
				sm: 'rounded-[0.625rem] px-[1.5rem] py-[.75rem]',
				default: 'rounded-[0.875rem] px-[2rem] py-[1rem]',
				lg: 'rounded-2xl px-[2.5rem] py-[1.25rem]',
				xl: 'rounded-[1.125rem] px-[3rem] py-[1.5rem]',
				'xs-icon': 'rounded-[0.5rem] p-[.5rem]',
				'sm-icon': 'rounded-[0.625rem] p-[.75rem]',
				'default-icon': 'rounded-[0.875rem] p-[1rem]',
				'lg-icon': 'rounded-2xl p-[1.125rem]',
				'xl-icon': 'rounded-[1.125rem] p-[1.5rem]',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	icon?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			rounded,
			size,
			asChild = false,
			icon = false,
			...props
		},
		ref,
	) => {
		if (icon) {
			size = `${size}-icon` as 'default' | 'sm' | 'lg'
		}

		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={` ${cn(
					buttonVariants({ variant, rounded, size, className }),
				)}`}
				ref={ref}
				{...props}
			/>
		)
	},
)

Button.displayName = 'Button'

export { Button }
