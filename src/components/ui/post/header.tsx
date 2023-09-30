import UserAvatarCard from '@/components/ui/UserAvatarCard'
import { Button } from '@/components/ui/button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'
import { OutlineMore } from 'src/icons/Icons'

interface Props {}
const PostHeader: FunctionComponent<Props> = ({}) => {
	return (
		<header className='flex w-full justify-between gap-4'>
			<UserAvatarCard avatar />
			<Stack
				className='flex items-center'
				direction='row'
				spacing={2}
			>
				<Typography
					variant='body2'
					component='p'
					className='cursor-pointer text-white-500 hover:underline'
				>
					N time ago
				</Typography>
				<Button
					variant={'ghost'}
					size={'xs-icon'}
				>
					<OutlineMore size={24} />
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
