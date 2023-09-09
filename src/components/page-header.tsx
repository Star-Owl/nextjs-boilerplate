import type { FunctionComponent } from 'react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedNumber } from './ui/animated-number'
import { Counter } from './ui/animated-counter'
import { Overview } from './ui/overview'
import { Chart } from './ui/overview-v2'

interface HeroProps {}
const Hero: FunctionComponent<HeroProps> = ({}) => {
    let [value, setValue] = useState(1000)
    let [count, setCount] = useState(0)

    let sales = [
        { date: '2023-04-30T12:00:00.00+00:00', value: 4 },
        { date: '2023-05-01T12:00:00.00+00:00', value: 6 },
        { date: '2023-05-02T12:00:00.00+00:00', value: 8 },
        { date: '2023-05-03T12:00:00.00+00:00', value: 7 },
        { date: '2023-05-04T12:00:00.00+00:00', value: 10 },
        { date: '2023-05-05T12:00:00.00+00:00', value: 12 },
        { date: '2023-05-06T12:00:00.00+00:00', value: 4 },
    ]
    let data = sales.map((d) => ({ ...d, date: new Date(d.date) }))

    return (
        <main className='container mx-auto flex flex-col gap-6 py-12'>
            <Typography variant='h4' component='h2'>
                Hello
            </Typography>
            <section className='flex flex-col gap-6 md:flex-row'>
                <Button variant={'default'}>default</Button>
                <Button variant={'secondary'}>secondary</Button>
                <Button variant={'outline'}>outline</Button>
                <Button variant={'ghost'}>ghost</Button>
                <Button variant={'link'}>link</Button>
                <Button variant={'danger'}>danger</Button>
                <Button variant={'warning'}>warning</Button>
                <Button variant={'success'}>success</Button>
            </section>
            <section className='flex flex-col gap-6 md:flex-row'>
                <Button rounded variant={'default'}>
                    default
                </Button>
                <Button rounded variant={'secondary'}>
                    secondary
                </Button>
                <Button rounded variant={'outline'}>
                    outline
                </Button>
                <Button rounded variant={'ghost'}>
                    ghost
                </Button>
                <Button rounded variant={'link'}>
                    link
                </Button>
                <Button rounded variant={'danger'}>
                    danger
                </Button>
                <Button rounded variant={'warning'}>
                    warning
                </Button>
                <Button rounded variant={'success'}>
                    success
                </Button>
            </section>
            <section className='flex gap-6'>
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
            </section>
            <section className='flex flex-col gap-6'>
                <section className='flex gap-6'>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                </section>
                <section className='flex gap-6'>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                </section>
                <section className='flex gap-6'>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                    <section className='flex w-full gap-6'>
                        <Skeleton className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col flex-1 gap-2 justify-center'>
                            <Skeleton className='w-[100%] h-[16px] rounded-full' />
                            <Skeleton className='w-[40%] h-[14px] rounded-full' />
                        </div>
                    </section>
                </section>
            </section>
            <section className='flex gap-6 justify-center items-center'>
                <Button
                    variant={'danger'}
                    onClick={() => {
                        setValue(value - 100), setCount(value - 100)
                    }}
                >
                    -100
                </Button>

                <AnimatedNumber value={value} />
                {/* <Counter value={count} /> */}

                <Button
                    variant={'success'}
                    onClick={() => {
                        setValue(value + 100), setCount(value + 100)
                    }}
                >
                    +100
                </Button>
            </section>
            <section className='grid gap-4 grid-cols-2'>
                <Overview />
                <Overview />
            </section>
            <div className='grid grid-cols-2 gap-x-4 gap-y-12 p-4'>
                <div className='col-span-2 h-60'>
                    <Chart data={data} />
                </div>
                <div className='h-40'>
                    <Chart data={data} />
                </div>
                <div className='h-40'>
                    <Chart data={data} />
                </div>
            </div>
        </main>
    )
}

export default Hero
