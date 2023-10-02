import {
	Avatar,
	Badge,
	Chip,
	Code,
	extendVariants,
	user,
} from '@nextui-org/react'
import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { Button, buttonVariants } from 'src/components/ui/button'

import {
	FillBell,
	FillBookmark,
	FillHome,
	FillMessage,
	FillSearch,
	FillSettings,
	FillUser,
	OutlineBell,
	OutlineBookmark,
	OutlineEdit,
	OutlineHome,
	OutlineLogOut,
	OutlineMessage,
	OutlineMore,
	OutlineSearch,
	OutlineSettings,
	OutlineUser,
} from 'src/icons/Icons'
import NavItem from './nav-item'
import UserInfo from '../ui/user/UserInfo'
import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import { useRouter } from 'next/router'
import LoginModal from '../modals/LoginModal'
import { useSession, signIn, signOut } from 'next-auth/react'
import RegisterModal from '../modals/RegisterModal'

const currentUser = true

interface NavLinkItem {
	active: boolean
	href: string
	text: string
	icon?: ReactNode
	isLogout?: boolean
}

interface Props {
	activeItem?: string
}

const Nav: FunctionComponent<Props> = ({ activeItem = 'nest' }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { deviceType, os, browser, orientation } = useDeviceAndBrowser()

	const [isLoginModalOpen, setLoginModalOpen] = useState(false)
	const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)

	// useEffect(() => {

	// }, [])

	const items: NavLinkItem[] = [
		{
			active: router.pathname === '/',
			href: '/',
			text: 'Nest',
			icon: null,
		},
		{
			active: router.pathname === '/explore',
			href: '/explore',
			text: 'Explore',
			icon: null,
		},
		...(session
			? [
					{
						active: router.pathname === '/echoes',
						href: '/echoes',
						text: 'Echoes',
						icon: null,
					},
					{
						active: router.pathname === '/messages',
						href: '/messages',
						text: 'Chatter',
						icon: null,
					},
					{
						active: router.pathname === '/bookmarks',
						href: '/bookmarks',
						text: 'StarMark',
						icon: null,
					},
			  ]
			: []),
		{
			active: router.pathname === '/settings',
			href: '/settings',
			text: 'Tweak',
			icon: null,
		},
		...(session
			? [
					{
						active: false,
						href: '',
						text: 'Logout',
						icon: null,
						isLogout: true,
					},
			  ]
			: []),
	]

	const activeIcons = {
		'/': <FillHome size={deviceType === 'tablet' ? 28 : 28} />,
		'/explore': <FillSearch size={28} />,
		'/echoes': <FillBell size={28} />,
		'/messages': <FillMessage size={28} />,
		'/bookmarks': <FillBookmark size={28} />,
		'/settings': <FillSettings size={28} />,
	}

	const inactiveIcons = {
		'/': <OutlineHome size={28} />,
		'/explore': <OutlineSearch size={28} />,
		'/echoes': <OutlineBell size={28} />,
		'/messages': <OutlineMessage size={28} />,
		'/bookmarks': <OutlineBookmark size={28} />,
		'/settings': <OutlineSettings size={28} />,
		'': <OutlineLogOut size={28} />,
	}

	const handleLogin = async () => {
		try {
			await signIn('credentials', { callbackUrl: '/' })
		} catch (error) {
			console.error('Błąd logowania:', error)
		}
	}
	return (
		<nav
			className={`h-device sticky top-0 ml-5 hidden max-w-[8rem] flex-1 flex-col items-end justify-between py-[2.5rem] pl-10 pr-6 ${
				deviceType !== 'mobile' ? ' md:flex' : ''
			} lg:ml-0 xl:ml-0 xl:max-w-[16rem] xl:items-start xl:px-0`}
		>
			<section className='rounded-2x flex w-full flex-col gap-6'>
				{/* bg-primary-lighter p-4 */}
				<ul className='flex flex-col items-end gap-2 xl:px-0'>
					{items.map(({ active, href, text, isLogout }, i) => (
						<React.Fragment key={`header-${i}`}>
							<NavItem
								active={active}
								href={href}
								width='inline'
								size='default'
								onClick={isLogout ? () => signOut() : undefined}
							>
								{active
									? activeIcons[
											href as keyof typeof activeIcons
									  ]
									: inactiveIcons[
											href as keyof typeof inactiveIcons
									  ]}
								<span
									className={`
										hidden
										flex-none
										text-lg
										xl:inline-flex
										${active ? 'font-bold' : 'font-medium'}
									`}
								>
									{text}
								</span>
							</NavItem>
						</React.Fragment>
					))}
				</ul>
				{session ? (
					<Button
						size={
							deviceType === 'tablet' && window.innerWidth < 1366
								? 'lg-icon'
								: 'lg'
						}
					>
						{deviceType === 'tablet' && window.innerWidth < 1366 ? (
							<OutlineEdit size={28} />
						) : (
							'Hoot'
						)}
					</Button>
				) : (
					<React.Fragment>
						{/* <Button
							variant={'outline'}
							size={
								deviceType === 'tablet' &&
								window.innerWidth < 1366
									? 'lg-icon'
									: 'lg'
							}
							onClick={() => handleLogin()}
						>
							{deviceType === 'tablet' &&
							window.innerWidth < 1366 ? (
								<OutlineEdit size={28} />
							) : (
								'Login'
							)}
						</Button> */}
						<LoginModal
							open={isLoginModalOpen}
							onOpenChange={setLoginModalOpen}
						/>
						<RegisterModal
							open={isRegisterModalOpen}
							onOpenChange={setRegisterModalOpen}
						/>
					</React.Fragment>
				)}
			</section>
			{session ? (
				<section className='flex w-fit items-center justify-center gap-4 overflow-hidden rounded-2xl bg-primary-lighter p-4 xl:w-full xl:justify-start'>
					<React.Fragment>
						<Badge
							content=''
							color='success'
							shape='circle'
							placement='bottom-right'
							className={`${
								deviceType === 'tablet' &&
								window.innerWidth < 1366
									? 'h-[1.125rem] w-[1.125rem]'
									: 'h-5 w-5'
							} pointer-events-none border-4 border-primary-lighter`}
						>
							<Avatar
								//isBordered
								// color='base'
								name='Hasira'
								src='https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128'
								showFallback
								fallback={
									<OutlineUser
										size={
											deviceType === 'tablet' &&
											window.innerWidth < 1366
												? 16
												: 24
										}
										className='text-default-500'
										fill='currentColor'
									/>
								}
								className={`${
									deviceType === 'tablet' &&
									window.innerWidth < 1366
										? 'h-8 w-8'
										: 'h-10 w-10'
								} cursor-pointer bg-white/[.06] text-sm transition-opacity hover:opacity-60`}
							/>
						</Badge>
					</React.Fragment>
					{deviceType === 'tablet' && window.innerWidth < 1366 ? (
						''
					) : (
						<React.Fragment>
							<div className='flex h-full flex-1 flex-col justify-around overflow-hidden'>
								<UserInfo />
							</div>
							<Button
								variant={'ghost'}
								size={'xs-icon'}
							>
								<OutlineMore size={24} />
							</Button>
						</React.Fragment>
					)}
				</section>
			) : null}
		</nav>
	)
}

export default Nav
