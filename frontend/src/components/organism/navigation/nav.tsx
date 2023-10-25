import { Avatar, Badge, ScrollShadow } from '@nextui-org/react'
import React, {
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import NavItem from '../../molecule/nav-item'
import LoginModal from '../modals/LoginModal'
import RegisterModal from '../modals/RegisterModal'
import {
	FillHome,
	FillSearch,
	FillBell,
	FillMessage,
	FillBookmark,
	FillSettings,
	OutlineHome,
	OutlineSearch,
	OutlineBell,
	OutlineMessage,
	OutlineBookmark,
	OutlineSettings,
	OutlineLogOut,
	OutlineEdit,
	OutlineUser,
	OutlineMore,
} from 'src/icons/Icons'
import { Button } from '../../atom/button'
import UserInfo from '../../molecule/UserInfo'
import { NotificationContext } from 'src/contexts/NotificationContext'

interface Props {
	activeItem?: string
}

const Nav: FunctionComponent<Props> = ({}) => {
	const router = useRouter()
	const { data: session } = useSession()
	const [isLoginModalOpen, setLoginModalOpen] = useState(false)
	const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)
	const [windowWidth, setWindowWidth] = useState<number | null>(null)
	const context = useContext(NotificationContext)

	if (!context) {
		throw new Error('NotificationContext not provided')
	}

	const { isSelected } = context

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

	const NavLinkItem = [
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
		'/': <FillHome size={28} />,
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
			className={`h-device sticky top-0 ml-5 hidden max-w-[8rem] flex-1 flex-col items-end justify-between py-[2.5rem] pl-10 pr-8 md:flex lg:ml-0 xl:ml-0 xl:max-w-[17rem] xl:items-start xl:px-0`}
		>
			<ScrollShadow className='flex h-full flex-col justify-between overflow-auto px-2 lg:w-full lg:px-0'>
				<section className='rounded-2x flex w-full flex-col gap-6 px-0 xl:px-2'>
					{/* bg-primary-lighter p-4 */}
					<ul className='flex flex-col items-end gap-2'>
						{NavLinkItem.map(({ active, href, text }, i) => (
							<React.Fragment key={`header-${i}`}>
								<NavItem
									active={active}
									href={href}
									width='inline'
									size='default'
									hasNotification={isSelected}
									onClick={
										session ? () => signOut() : undefined
									}
								>
									{href === '/settings' ? (
										<Badge
											color='primary'
											content={'+9'}
											isInvisible={false}
											disableOutline
											shape='circle'
										>
											{active
												? activeIcons[
														href as keyof typeof activeIcons
												  ]
												: inactiveIcons[
														href as keyof typeof inactiveIcons
												  ]}
										</Badge>
									) : href === '/' ? (
										<Badge
											color='primary'
											content=''
											isDot
											isInvisible={!isSelected}
											shape='circle'
											className={`right-0 top-0 h-3 w-3 border-2 ${
												active
													? 'border-[#162238]'
													: 'border-primary-dark'
											} bg-accent-600`}
										>
											{active
												? activeIcons[
														href as keyof typeof activeIcons
												  ]
												: inactiveIcons[
														href as keyof typeof inactiveIcons
												  ]}
										</Badge>
									) : active ? (
										activeIcons[
											href as keyof typeof activeIcons
										]
									) : (
										inactiveIcons[
											href as keyof typeof inactiveIcons
										]
									)}

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
						<Button size={windowWidth ? 'lg-icon' : 'lg'}>
							{windowWidth !== null ? (
								windowWidth <= 1024 ? (
									<OutlineEdit size={28} />
								) : (
									'Hoot'
								)
							) : null}
						</Button>
					) : (
						<React.Fragment>
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
									windowWidth !== null
										? windowWidth < 1366
											? 'h-[1.125rem] w-[1.125rem]'
											: 'h-5 w-5'
										: null
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
												windowWidth !== null
													? windowWidth < 1366
														? 16
														: 24
													: 24
											}
											className='text-default-500'
											fill='currentColor'
										/>
									}
									className={`${
										windowWidth !== null
											? windowWidth < 1366
												? 'h-8 w-8'
												: 'h-10 w-10'
											: null
									} cursor-pointer bg-white/[.06] text-sm transition-opacity hover:opacity-60`}
								/>
							</Badge>
						</React.Fragment>
						{windowWidth !== null ? (
							windowWidth < 1366 ? null : (
								<React.Fragment>
									<div className='flex h-full flex-1 flex-col justify-around overflow-hidden'>
										<UserInfo userID='@hasiradoo' />
									</div>
									<Button
										variant={'ghost'}
										size={'xs-icon'}
									>
										<OutlineMore size={24} />
									</Button>
								</React.Fragment>
							)
						) : null}
					</section>
				) : null}
			</ScrollShadow>
		</nav>
	)
}

export default Nav
