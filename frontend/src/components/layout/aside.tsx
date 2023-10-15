import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Kbd } from '@nextui-org/kbd'

interface Props {}
const Aside: FunctionComponent<Props> = ({}) => {
	return (
		<aside className='h-device sticky top-0 hidden max-w-sm flex-1 py-[2.5rem] lg:mx-6 lg:flex xl:mx-0'>
			<ul className='h-fit w-full rounded-2xl bg-primary-lighter p-4'>
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
