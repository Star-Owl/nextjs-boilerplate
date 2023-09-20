import type { FunctionComponent } from 'react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
//import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
//import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedNumber } from './ui/animated-number'
import { Counter } from './ui/animated-counter'
import { Overview } from './ui/overview'
import { Chart } from './ui/overview-v2'
import { ArrowBack, OutlineMessage, FillMessage } from 'src/icons/Icons'
import { HoverCardDemo } from './hover-card'
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from '@nextui-org/table'

import {
	extendVariants,
	Code,
	Avatar,
	AvatarGroup,
	Badge,
	Image,
	Skeleton,
	Spinner,
} from '@nextui-org/react'

import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { useAsyncList } from '@react-stately/data'

export const MyCode = extendVariants(Code, {
	variants: {
		// <- modify/add variants
		// color: {
		// 	olive: 'text-[#000] bg-[#84cc16]',
		// 	orange: 'bg-[#ff8c00] text-[#fff]',
		// 	violet: 'bg-[#8b5cf6] text-[#fff]',
		// },
		// isDisabled: {
		// 	true: 'bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed',
		// },
		size: {
			sm: 'px-2 py-1 text-base',
			md: 'px-4 text-sm',
			xl: 'px-8 text-base',
		},
	},
	defaultVariants: {
		// <- modify/add default variants
		//color: 'olive',
		size: 'sm',
	},
	compoundVariants: [
		// <- modify/add compound variants
		{
			//isDisabled: true,
			//color: 'olive',
			//class: 'bg-[#84cc16]/80 opacity-100',
		},
	],
})

interface HeroProps {}
const Hero: FunctionComponent<HeroProps> = ({}) => {
	let [value, setValue] = useState(1000)
	let [count, setCount] = useState(0)

	const [isLoading, setIsLoading] = React.useState(true)
	const [hasMore, setHasMore] = React.useState(false)

	interface LoadParams {
		signal: AbortSignal
		cursor?: string
	}

	let list = useAsyncList({
		async load({ signal, cursor }: LoadParams) {
			if (cursor) {
				setIsLoading(false)
			}

			// If no cursor is available, then we're loading the first page.
			// Otherwise, the cursor is the next URL to load, as returned from the previous page.
			const res = await fetch(
				cursor || 'https://swapi.py4e.com/api/people/?search=',
				{ signal },
			)
			let json = await res.json()

			setHasMore(json.next !== null)

			return {
				items: json.results,
				cursor: json.next,
			}
		},
	})

	const [loaderRef, scrollerRef] = useInfiniteScroll({
		hasMore,
		onLoadMore: list.loadMore,
	})

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
			<Typography
				variant='h4'
				component='h4'
			>
				Hello
			</Typography>
			<MyCode className='inline w-fit'>@userID</MyCode>
			{/* <section className='inline-grid grid-cols-6 gap-4'>
				<Button
					className='w-fit'
					variant={'default'}
				>
					Button
				</Button>
				<Button
					className='w-fit'
					variant={'default_hover'}
				>
					Hover
				</Button>
				<Button
					className='w-fit'
					variant={'default_active'}
				>
					Active
				</Button>
				<Button
					className='w-fit'
					variant={'default_focus'}
				>
					Focus
				</Button>
				<Button
					className='w-fit'
					variant={'default_hover'}
				>
					Loading...
				</Button>
				<Button
					disabled
					className='w-fit'
					variant={'default_hover'}
				>
					Disabled
				</Button>
			</section> */}
			<section className='flex flex-col flex-wrap gap-6 md:flex-row'>
				<Button
					rounded
					variant={'default'}
				>
					default
				</Button>
				<Button
					rounded
					variant={'secondary'}
				>
					secondary
				</Button>
				<Button
					rounded
					variant={'outline'}
				>
					outline
				</Button>
				<Button
					rounded
					variant={'ghost'}
				>
					ghost
				</Button>
				<Button
					rounded
					variant={'link'}
				>
					link
				</Button>
				<Button
					rounded
					variant={'danger'}
				>
					danger
				</Button>
				<Button
					rounded
					variant={'warning'}
				>
					warning
				</Button>
				<Button
					rounded
					variant={'success'}
				>
					success
				</Button>
			</section>
			<section className='flex gap-6'>
				{/* <HoverCardDemo /> */}
				<Badge
					size='md'
					content=''
					color='success'
					shape='circle'
					placement='bottom-right'
				>
					<Avatar
						//isBordered
						size='md'
						radius='md'
						color='default'
						src='https://cdn.discordapp.com/avatars/569975072417251378/7eb3ee1c0ddc5280d5c9aa9afc26e848.webp?size=128'
					/>
				</Badge>
				<AvatarGroup
					className='cursor-pointer'
					isBordered
					max={3}
				>
					<Avatar
						color='primary'
						src='https://cdn.discordapp.com/avatars/569975072417251378/7eb3ee1c0ddc5280d5c9aa9afc26e848.webp?size=128'
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
			</section>
			<section>
				<Image
					width='w-fit'
					alt='NextUI hero Image'
					src='https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg'
				/>
			</section>
			<section>
				<Table
					isHeaderSticky
					aria-label='Example table with infinite pagination'
					baseRef={scrollerRef}
					bottomContent={
						hasMore ? (
							<div className='flex w-full justify-center'>
								<Spinner
									ref={loaderRef}
									color='white'
								/>
							</div>
						) : null
					}
					classNames={{
						base: 'max-h-[520px] overflow-scroll',
						table: 'min-h-[400px]',
					}}
				>
					<TableHeader>
						<TableColumn key='name'>Name</TableColumn>
						<TableColumn key='height'>Height</TableColumn>
						<TableColumn key='mass'>Mass</TableColumn>
						<TableColumn key='birth_year'>Birth year</TableColumn>
					</TableHeader>
					<TableBody
						isLoading={isLoading}
						items={list.items}
						loadingContent={<Spinner color='white' />}
					>
						{/* {(item) => (
							<TableRow key={item.name}>
								{(columnKey) => (
									<TableCell>
										{getKeyValue(item, columnKey)}
									</TableCell>
								)}
							</TableRow>
						)} */}
					</TableBody>
				</Table>
			</section>
			<section
				id='skeletons'
				className='flex flex-col gap-6'
			>
				<section className='flex gap-6'>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
				</section>
				<section className='flex gap-6'>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
				</section>
				<section className='flex gap-6'>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
					<section className='flex w-full gap-6'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-1 flex-col justify-center gap-2'>
							<Skeleton className='h-[16px] w-[100%] rounded-full' />
							<Skeleton className='h-[14px] w-[40%] rounded-full' />
						</div>
					</section>
				</section>
			</section>
			<section
				id='counters'
				className='flex items-center justify-center gap-6'
			>
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
			<section className='flex flex-col lg:flex-row'>
				<Overview />
				<Overview />
			</section>
			<div className='grid grid-cols-2 gap-x-4 gap-y-12'>
				<div className='col-span-2 h-80'>
					<Chart data={data} />
				</div>
				<div className='col-span-2 h-80 md:col-span-1'>
					<Chart data={data} />
				</div>
				<div className='col-span-2 h-80 md:col-span-1'>
					<Chart data={data} />
				</div>
			</div>
		</main>
	)
}

export default Hero
