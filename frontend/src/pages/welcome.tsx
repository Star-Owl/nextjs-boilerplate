import { Button } from '@/components/atom/button'
import CanvasSpace from '@/lib/ConvasSpacev2'
import React, { useEffect, useState, FunctionComponent } from 'react'
import { Logo, LogoText } from 'src/icons/Icons'

interface Props {}

const WelcomePage: FunctionComponent<Props> = ({}) => {
	return (
		<React.Fragment>
			<CanvasSpace
				count={750}
				speed={0.5}
				size={1.33}
				color='white'
			/>
			<main className='z-10 flex h-screen w-full flex-col items-center justify-center leading-none md:max-w-xl md:gap-6 lg:max-w-lg xl:max-w-xl'>
				{/* <LogoText
					className='absolute top-32 opacity-20'
					size={256}
				/> */}
				<h1 className='text-6xl font-bold'>StarOwl Social</h1>
				<div className='flex space-x-6'>
					<Button>Create a new nest</Button>
					<Button variant={'outline'}>sign in</Button>
				</div>
				<LogoText
					className='absolute left-0 top-6 opacity-20'
					size={112}
				/>
				<footer className='absolute bottom-6'>
					<ul className='flex space-x-4'>
						<li>
							<Button variant={'ghost'}>Button</Button>
						</li>
						<li>
							<Button variant={'ghost'}>Button</Button>
						</li>
						<li>
							<Button variant={'ghost'}>Button</Button>
						</li>
						<li>
							<Button variant={'ghost'}>Button</Button>
						</li>
						<li>
							<Button variant={'ghost'}>Button</Button>
						</li>
					</ul>
				</footer>
			</main>
		</React.Fragment>
	)
}

export default WelcomePage
