import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface Props {
	active?: boolean
	href: string
	width: 'full' | 'inline'
	size: 'default'
	children: ReactNode
	onClick?: () => void
	disabled?: boolean
}

const LinksStyle = cva(
	`
		flex
		flex-col
		gap-1
		transition
		items-center
		disabled:opacity-50
		disabled:cursor-not-allowed
		lg:flex-row
		lg:gap-4
	`,
	{
		variants: {
			width: {
				full: 'w-full justify-start',
				inline: 'max-w-fit justify-center', // max-w-fit Twitter not full width effect
			},
			size: {
				default:
					'rounded-[.875rem] lg:p-[1.125rem] xl:py-[.875rem] xl:pr-6 lg:pl-4',
			},
			active: {
				true: 'opacity-100 md:bg-accent-600/[.12] md:text-accent-600',
				false: 'md:group-hover:bg-white/[.06] group-hover:opacity-100 opacity-50',
			},
		},
		defaultVariants: {
			width: 'inline',
			size: 'default',
		},
	},
)

const NavItem = ({
	active = false,
	href,
	children,
	width,
	size,
	onClick,
}: Props) => {
	const router = useRouter()

	const handleNavigation = (e: React.MouseEvent<HTMLLIElement>) => {
		// prevent default anchor action
		e.preventDefault()

		// call the provided onClick if it exists
		if (onClick) {
			onClick()
		}

		// navigate to the desired URL
		router.push(href)
	}
	return (
		<li
			className='group cursor-pointer lg:w-full'
			onClick={handleNavigation}
		>
			<Link
				onClick={onClick}
				className={LinksStyle({
					active,
					width,
					size,
				})}
				href={href}
			>
				{children}
			</Link>
		</li>
	)
}

export default NavItem
