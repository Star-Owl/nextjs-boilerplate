import { CalendarDays } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/atom/button'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'

export function HoverCardDemo() {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Avatar
					size='sm'
					rounded='sm'
				>
					<AvatarImage src='https://cdn.discordapp.com/avatars/569975072417251378/7eb3ee1c0ddc5280d5c9aa9afc26e848.webp?size=128' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</HoverCardTrigger>
			<HoverCardContent className='w-80 border-none bg-primary-lighter'>
				<div className='flex justify-between space-x-4'>
					<Avatar rounded='default'>
						<AvatarImage src='https://github.com/vercel.png' />
						<AvatarFallback>VC</AvatarFallback>
					</Avatar>
					<div className='space-y-3'>
						<h4 className='text-sm font-semibold'>@nextjs</h4>
						<p className='text-sm'>
							The React Framework – created and maintained by
							@vercel.
						</p>
						<div className='flex items-center pt-2'>
							<CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
							<span className='text-muted-foreground text-xs'>
								Joined December 2021
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
