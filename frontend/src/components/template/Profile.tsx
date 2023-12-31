import React, { useEffect, useState } from 'react'
import { Button } from '../atom/button'
import { Avatar, Chip } from '@nextui-org/react'
import UserInfo from '../molecule/UserInfo'
import {
	Aries,
	ArrowBack,
	Cancer,
	FillStar,
	OutlineBell,
	OutlineLink,
	OutlineMessage,
	OutlineMore,
	OutlineTrashCan,
	OutlineUser,
} from 'src/icons/Icons'
import { FormatNumber } from '@/lib/numberFormat'
import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Tooltip, ScrollShadow } from '@nextui-org/react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

type SpecialIcon =
	| 'facebook'
	| 'patreon'
	| 'backer'
	| 'staruser'
	| 'community'
	| 'zodiac'
	| 'basic'

type SpecialBadgeType =
	| 'bday'
	| 'staff'
	| 'backer'
	| 'staruser'
	| 'community'
	| 'zodiac'
	| 'basic'

type ZodiacSignType =
	| 'Aries'
	| 'Taurus'
	| 'Gemini'
	| 'Cancer'
	| 'Leo'
	| 'Virgo'
	| 'Libra'
	| 'Scorpio'
	| 'Sagittarius'
	| 'Capricorn'
	| 'Aquarius'
	| 'Pisces'

interface LinksProps {
	url: string
	label?: string
	type?: SpecialIcon
	icon?: React.ReactNode
}

interface BadgeProps {
	content: string
	type?: SpecialBadgeType
	color?: string
	icon?: React.ReactNode
}

interface ProfileCoverProps {
	profileImage: string
	coverImage: string
	displayName: string
	userID: string
	followers: number
	following: number
	isOwnProfile?: boolean
	links?: LinksProps[]
}

interface ProfileDetailsProps {
	bio: string
	badges: BadgeProps[]
}

const ProfileCover: React.FC<ProfileCoverProps> = ({
	profileImage,
	coverImage,
	displayName,
	userID,
	followers,
	following,
	isOwnProfile = false,
	links,
}) => {
	const router = useRouter()

	const goBack = () => {
		router.back()
	}

	const showFollowers = () => {
		alert(`followers ${followers}`)
	}

	const showFollowing = () => {
		alert(`following ${following}`)
	}

	const getLinkIcon = (
		type: SpecialIcon,
	): { color?: string; icon?: React.ReactNode } => {
		switch (type) {
			case 'patreon':
				return {
					icon: <OutlineLink size={24} />,
				}
			default:
				return {}
		}
	}

	return (
		<section className='relative overflow-hidden rounded-b-2xl p-4 md:rounded-2xl md:p-6'>
			{/* Cover with mask */}
			<figure
				className='absolute left-0 top-0 h-full w-full'
				style={{
					backgroundImage: `url(${coverImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					filter: 'brightness(60%)',
				}}
			></figure>

			{/* Content */}
			<article className='relative flex h-max flex-col gap-4'>
				<nav className='flex items-center justify-between space-x-3'>
					<Button
						variant={'dimmed'}
						size={'lg-icon'}
						onClick={goBack}
					>
						<ArrowBack size={24} />
					</Button>
					<div className='flex gap-0 text-sm md:gap-4 md:text-base'>
						<button
							className='flex cursor-pointer flex-col items-center space-y-1 rounded-lg p-2 transition-colors hover:bg-black/[.12]'
							onClick={showFollowers}
						>
							<span className='pointer-events-none font-bold normal-nums'>
								{FormatNumber(followers)}
							</span>
							<span className='pointer-events-none text-white/[.60]'>
								Followers
							</span>
						</button>
						<button
							className='flex cursor-pointer flex-col items-center space-y-1 rounded-lg p-2 transition-colors hover:bg-black/[.12]'
							onClick={showFollowing}
						>
							<span className='pointer-events-none font-bold normal-nums'>
								{FormatNumber(following)}
							</span>
							<span className='pointer-events-none text-white/[.60]'>
								Following
							</span>
						</button>
					</div>
					<div className='flex flex-col'>
						<Button
							variant={'dimmed'}
							size={'lg-icon'}
						>
							<OutlineMore size={24} />
						</Button>
						{!isOwnProfile && (
							<Button
								variant={'dimmed'}
								className='absolute top-[4rem] md:top-[4.5rem]'
								size={'lg-icon'}
							>
								<OutlineBell size={24} />
							</Button>
						)}
					</div>
				</nav>
				<figure className='flex w-max'>
					<Avatar
						src={profileImage}
						alt='Profile'
						showFallback
						fallback={
							<OutlineUser
								size={32}
								className={`text-white`}
								fill='currentColor'
							/>
						}
						className='h-16 w-16 rounded-full bg-black/20 backdrop-blur-lg md:h-20 md:w-20'
					/>
					{/* <div className='flex flex-col'>
						<UserInfo size='large' />
						<h1 className='text-xl font-bold'>{displayName}</h1>
						<span className='text-gray-600'>@{userID}</span>
					</div> */}
				</figure>
				<footer className='flex w-full flex-col'>
					<UserInfo
						displayName={displayName}
						userID={userID}
						size='lg'
						variant='opacity'
					/>
					<div className='mt-2 flex items-baseline justify-between'>
						<div className='flex space-x-2'>
							{links?.map((link, index) => {
								const { icon } = link.type
									? getLinkIcon(link.type)
									: { icon: <OutlineLink size={24} /> }
								return (
									<Tooltip
										showArrow={true}
										key={index}
										content={link.label}
										placement={'bottom'}
									>
										<Button
											variant={'ghost'}
											size={'default-icon'}
											asChild
										>
											<Link
												href={link.url}
												className='text-inherit'
											>
												{icon}
											</Link>
										</Button>
									</Tooltip>
								)
							})}
						</div>
						<div className='flex space-x-4'>
							<Button
								variant={'outline'}
								size={'default-icon'}
							>
								<OutlineMessage size={24} />
							</Button>
							<Button
								variant={'outline'}
								size={'default'}
							>
								Following
							</Button>
							{/* <Button
								variant={'default'}
								size={'sm'}
							>
								Follow
							</Button> */}
						</div>
					</div>
				</footer>
			</article>
		</section>
	)
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ bio, badges }) => {
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
	let iconSize =
		windowWidth !== null ? (windowWidth < 678 ? 20 : 24) : undefined
	const getZodiacIcon = (zodiacSign: ZodiacSignType) => {
		switch (zodiacSign) {
			case 'Aries':
				return <Aries size={iconSize} />
			case 'Taurus':
				return <OutlineLink size={iconSize} />
			case 'Gemini':
				return <OutlineLink size={iconSize} />
			case 'Cancer':
				return <Cancer size={iconSize} />
			case 'Leo':
				return <OutlineLink size={iconSize} />
			case 'Virgo':
				return <OutlineLink size={iconSize} />
			case 'Libra':
				return <OutlineLink size={iconSize} />
			case 'Scorpio':
				return <OutlineLink size={iconSize} />
			case 'Sagittarius':
				return <OutlineLink size={iconSize} />
			case 'Capricorn':
				return <OutlineLink size={iconSize} />
			case 'Aquarius':
				return <OutlineLink size={iconSize} />
			case 'Pisces':
				return <OutlineLink size={iconSize} />
			default:
				return null
		}
	}

	const getSpecialBadgeProperties = (
		type: SpecialBadgeType,
		zodiacSign?: ZodiacSignType,
	): { color?: string; icon?: React.ReactNode } => {
		switch (type) {
			case 'bday':
				return {
					color: 'text-accent-500',
					icon: <OutlineLink size={iconSize} />,
				}
			case 'staff':
				return {
					color: 'text-white',
					icon: <OutlineLink size={iconSize} />,
				}
			case 'backer':
				return {
					color: 'text-accent-500',
					icon: <OutlineLink size={iconSize} />,
				}
			case 'staruser':
				return {
					color: 'text-warning-200',
					icon: <FillStar size={iconSize} />,
				}
			case 'community':
				return {
					color: 'text-accent-500',
					icon: <OutlineLink size={iconSize} />,
				}
			case 'zodiac':
				return {
					icon: zodiacSign ? getZodiacIcon(zodiacSign) : null,
				}
			default:
				return {}
		}
	}

	return (
		<section className='space-y-4 px-5'>
			<p className='text-sm md:text-base'>{bio}</p>
			<ScrollShadow
				orientation='horizontal'
				className='scroll mt-3 flex max-w-full space-x-4 overflow-x-auto pb-5'
				//className='max-h-[300px] max-w-[400px]'
			>
				{badges?.map((badge, index) => {
					const isZodiacSign = (
						sign: string,
					): sign is ZodiacSignType => {
						const zodiacSigns: ZodiacSignType[] = [
							'Aries',
							'Taurus',
							'Gemini',
							'Cancer',
							'Leo',
							'Virgo',
							'Libra',
							'Scorpio',
							'Sagittarius',
							'Capricorn',
							'Aquarius',
							'Pisces',
						]
						return zodiacSigns.includes(sign as ZodiacSignType)
					}
					const { color, icon } = badge.type
						? getSpecialBadgeProperties(
								badge.type,
								isZodiacSign(badge.content)
									? badge.content
									: undefined,
						  )
						: { color: badge.color, icon: null }
					return (
						<Chip
							key={index}
							classNames={{
								base: `group rounded-[.625rem] py-[.625rem] px-[1.250rem] md:py-[.75rem] md:px-[1.5rem] !h-auto md:rounded-[.75rem] cursor-pointer transition-colors bg-primary-lighter hover:bg-primary-badge`,
								content: `text-white/[.60] ${color} p-0 flex items-center gap-2 text-sm md:text-base overflow-hidden text-ellipsis whitespace-pre leading-tight`,
							}}
						>
							{icon}
							{badge.content}
						</Chip>
					)
				})}
			</ScrollShadow>
		</section>
	)
}

export { ProfileCover, ProfileDetails }
