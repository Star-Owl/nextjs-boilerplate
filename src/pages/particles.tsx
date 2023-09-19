import { FunctionComponent } from 'react'

import CanvasSpace from '@/lib/ConvasSpace'

interface Props {}
const Particles: FunctionComponent<Props> = ({}) => {
	return (
		<CanvasSpace
			count={500}
			speed={0.5}
			size={1}
			color='white'
		/>
	)
}

export default Particles
