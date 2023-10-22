import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const variants = cva(
	`
	border-input
	placeholder:text-muted-foreground
	focus-visible:ring-ring
	flex
	w-full
	border
	bg-background
	text-base
	ring-offset-background
	file:border-0
	file:bg-transparent
	file:text-sm
	file:font-medium
	focus-visible:outline-none
	focus-visible:ring-2
	focus-visible:ring-offset-2
	disabled:cursor-not-allowed
	disabled:opacity-50
	`,
	{
		variants: {
			variant: {
				default: 'bg-black',
				secondary: '',
				outline: '',
				ghost: '',
				dimmed: '',
				link: '',
				danger: '',
				warning: '',
				success: '',
			},
			rounded: {
				true: '!rounded-full',
			},
			size: {
				xs: 'rounded-[0.5rem] px-[1rem] py-[.5rem]',
				sm: 'rounded-[0.625rem] px-[1.5rem] py-[.75rem]',
				default: 'rounded-[0.875rem] px-[2rem] py-[1rem]',
				lg: 'rounded-2xl px-[2.5rem] py-[1.25rem]',
				xl: 'rounded-[1.125rem] px-[3rem] py-[1.5rem]',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof variants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ variant, size, rounded, className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={`${cn(
					variants({ variant, size, rounded, className }),
				)}`}
				ref={ref}
				{...props}
			/>
		)
	},
)

Input.displayName = 'Input'

export { Input }
