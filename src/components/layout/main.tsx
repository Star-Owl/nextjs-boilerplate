'use client'

import { Avatar, AvatarGroup } from '@nextui-org/react'
import { FunctionComponent } from 'react'

interface Props {}
const Main: FunctionComponent<Props> = ({}) => {
	return (
		<main className='flex h-[2000px] flex-1 flex-col items-start gap-4 bg-primary-lighter px-6 py-[2.5rem] leading-none text-white-50 dark md:max-w-xl'>
			Main
			<AvatarGroup
				className='cursor-pointer'
				isBordered
				max={3}
			>
				<Avatar
					color='primary'
					src='https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128'
				/>
				<Avatar
					color='warning'
					src='https://i.pravatar.cc/150?u=a04258a2462d826712d'
				/>
				<Avatar
					color='success'
					src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
				/>
				<Avatar src='https://i.pravatar.cc/150?u=a04258114e29026302d' />
				<Avatar src='https://i.pravatar.cc/150?u=a04258114e29026702d' />
				<Avatar src='https://i.pravatar.cc/150?u=a04258114e29026708c' />
			</AvatarGroup>
		</main>
	)
}
export default Main
