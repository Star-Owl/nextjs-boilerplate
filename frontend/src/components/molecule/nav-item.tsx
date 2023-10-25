import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import { Badge } from '@/components/ui/badge'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useContext, useEffect, useState } from 'react'
import React from 'react'
import { NotificationContext } from 'src/contexts/NotificationContext'

interface Props {
	active?: boolean
	href: string
	width: 'full' | 'inline'
	size: 'default'
	children: ReactNode
	onClick?: () => void
	disabled?: boolean
	hasNotification?: boolean
}

const NavItem = ({
	active = false,
	href,
	children,
	width,
	size,
	onClick,
	hasNotification,
}: Props) => {
	const router = useRouter()
	const [windowWidth, setWindowWidth] = useState<number | null>(null)

	useEffect(() => {
		setWindowWidth(window.innerWidth)

		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const LinksStyle = cva(
		`
		flex
		flex-col
		gap-1
		transition
		items-center
		text-white
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
					default: `space-y-1 rounded-[.875rem] md:p-[1.125rem] xl:py-[.875rem] xl:pr-6 lg:pl-4`,
				},
				active: {
					true: 'md:text-white-50',
					false: 'md:group-hover:bg-white/[.06] group-hover:text-white-50 text-white-500',
				},
			},
			defaultVariants: {
				width: 'inline',
				size: 'default',
			},
		},
	)

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
			className='group flex w-1/5 flex-1 cursor-pointer items-center justify-center md:w-auto md:justify-between lg:w-full'
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
				{/* {href === '/' ? (
					<Badge className='h-fit'>New hoots</Badge>
				) : null}
				{href === '/settings' ? (
					<Badge className='h-fit'>New</Badge>
				) : null} */}
			</Link>

			<React.Fragment>
				{href === '/' && hasNotification ? (
					<Badge
						className='hidden h-fit rounded-lg !bg-accent-600 px-[.6250rem] py-[.3125rem] !font-regular xl:flex'
						variant={'secondary'}
					>
						New hoots
					</Badge>
				) : null}
				{href === '/settings' ? (
					<Badge
						className='hidden h-fit rounded-lg !bg-accent-600 px-[.6250rem] py-[.3125rem] !font-regular xl:flex'
						variant={'secondary'}
					>
						New
					</Badge>
				) : null}
			</React.Fragment>
		</li>
	)
}

export default NavItem
