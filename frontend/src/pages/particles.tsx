import { FunctionComponent } from 'react'

import CanvasSpace from '@/lib/ConvasSpace'
import React from 'react'

interface Props {}
const Particles: FunctionComponent<Props> = ({}) => {
	return (
		<CanvasSpace
			count={500}
			speed={0.5}
			size={1.33}
			color='white'
		/>
	)
}

export default Particles
