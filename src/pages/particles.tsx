import { FunctionComponent } from 'react'

import CosmicNoiseCanvas from '@/lib/CosmicNoiseCanvas'

interface Props {}
const Particles: FunctionComponent<Props> = ({}) => {
	return (
		<CosmicNoiseCanvas
			count={100}
			speedFactor={1}
			color='white'
		/>
	)
}

export default Particles
