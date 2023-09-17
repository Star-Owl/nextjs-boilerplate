'use client'

import Link from 'next/link'
import { FunctionComponent } from 'react'

interface Props {}
const Aside: FunctionComponent<Props> = ({}) => {
	return (
		<aside className='h-device sticky top-0 hidden max-w-sm flex-1 py-[2.5rem] lg:flex'>
			<ul className='h-fit w-full rounded-2xl bg-primary-lighter p-6'>
				<li>
					<Link href='/'>Aside</Link>
				</li>
				<li>
					<Link href='/'>Aside</Link>
				</li>
				<li>
					<Link href='/'>Aside</Link>
				</li>
			</ul>
		</aside>
	)
}

export default Aside
