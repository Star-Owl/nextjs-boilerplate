import type { FunctionComponent } from 'react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'

interface HeroProps {}
const Hero: FunctionComponent<HeroProps> = ({}) => {
    return (
        <main className='container mx-auto flex flex-col gap-6 py-12'>
            <Typography variant='h4' component='h2'>
                Hello
            </Typography>
            <Stack direction={'row'} spacing={2}>
                <Button variant={'default'}>default</Button>
                <Button variant={'secondary'}>secondary</Button>
                <Button variant={'outline'}>outline</Button>
                <Button variant={'ghost'}>ghost</Button>
                <Button variant={'link'}>link</Button>
                <Button variant={'destructive'}>destructive</Button>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <HoverCard>
                    <HoverCardTrigger>
                        <Avatar size='sm' rounded='sm'>
                            <AvatarImage src='https://cdn.discordapp.com/avatars/569975072417251378/7eb3ee1c0ddc5280d5c9aa9afc26e848.webp?size=128' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent align='start'>
                        The React Framework – created and maintained by @vercel.
                    </HoverCardContent>
                </HoverCard>
                <Avatar rounded='default'>
                    <AvatarImage src='https://cdn.discordapp.com/avatars/569975072417251378/7eb3ee1c0ddc5280d5c9aa9afc26e848.webp?size=128' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size='lg' rounded='lg'>
                    <AvatarImage src='https://cdn.discordapp.com/avatars/569975072417251378/7eb3ee1c0ddc5280d5c9aa9afc26e848.webp?size=128' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size='lg' rounded='full'>
                    <AvatarImage src='https://cdn.discordapp.com/avatars/569975072417251378/7eb3ee1c0ddc5280d5c9aa9afc26e848.webp?size=128' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Stack spacing={1} className='flex justify-center'>
                    <Skeleton className='w-[150px] h-[16px] rounded-full' />
                    <Skeleton className='w-[80px] h-[14px] rounded-full' />
                </Stack>
            </Stack>
        </main>
    )
}

export default Hero
