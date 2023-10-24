import UserAvatarCard from '@/components/molecule/UserAvatarCard'
import { Button } from '@/components/atom/button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FunctionComponent, useEffect, useState } from 'react'
import { OutlineMore } from 'src/icons/Icons'

interface Props {}

const PostHeader: FunctionComponent<Props> = ({}) => {
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
	return (
		<header className='flex w-full justify-between gap-4'>
			<UserAvatarCard avatar />
			<Stack
				className='flex items-center'
				direction='row'
				spacing={2}
			>
				<span className='cursor-pointer text-sm text-white-500 hover:underline md:text-base'>
					N time ago
				</span>
				<Button
					variant={'ghost'}
					size={'xs-icon'}
				>
					<OutlineMore
						size={
							windowWidth !== null
								? windowWidth < 678
									? 18
									: 24
								: undefined
						}
					/>
				</Button>
				{/* <OutlineMore
					className='cursor-pointer transition-colors hover:text-accent-600'
					size={24}
				/> */}
			</Stack>
		</header>
	)
}

export default PostHeader
