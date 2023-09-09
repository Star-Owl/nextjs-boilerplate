import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'src/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center font-base gap-[0.75rem] leading-normal font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                default: 'text-accent-50 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 disabled:bg-accent-500',
                secondary:
                    'text-accent-300 bg-transparent ring-2 ring-inset ring-accent-300 hover:bg-accent-950 active:bg-accent-900 disabled:bg-transparent',
                outline:
                    'bg-transparent ring-2 ring-inset ring-white-50 hover:text-white-300 hover:ring-white-300 hover:bg-white-50/[.06] active:bg-white-50/[.12] disabled:bg-transparent',
                ghost: 'hover:text-white-300 hover:bg-white-50/[.06] active:bg-white-50/[.12] disabled:bg-transparent',
                link: 'underline-offset-4 hover:underline',
                danger: 'text-danger-50 bg-danger-500 hover:bg-danger-600 active:bg-danger-700 disabled:bg-danger-500',
                warning:
                    'text-warning-50 bg-warning-500 hover:bg-warning-600 active:bg-warning-700 disabled:bg-warning-500',
                success:
                    'text-success-50 bg-success-500 hover:bg-success-600 active:bg-success-700 disabled:bg-success-500',
            },
            rounded: {
                true: '!rounded-full',
            },
            size: {
                sm: 'h-9 rounded-md px-3',
                default: 'px-[2.250rem] py-[1.125rem] rounded-[0.875rem]',
                lg: 'h-11 rounded-md px-8',
                'sm-icon': 'h-8 w-8',
                'default-icon': 'px-[1.125rem] py-[1.125rem] rounded-[0.875rem]',
                'lg-icon': 'h-12 w-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    icon?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, rounded, size, asChild = false, icon = false, ...props }, ref) => {
        if (icon) {
            size = `${size}-icon` as 'default' | 'sm' | 'lg'
        }

        const Comp = asChild ? Slot : 'button'
        return <Comp className={cn(buttonVariants({ variant, rounded, size, className }))} ref={ref} {...props} />
    }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
