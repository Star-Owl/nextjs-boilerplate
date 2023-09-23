import { uuid } from 'uuidv4'
import generateRandomPost from './generateRandomPost'

const availableColors: Array<
	'primary' | 'warning' | 'success' | 'default' | 'secondary' | 'danger'
> = ['primary', 'warning', 'success', 'default', 'secondary', 'danger']

const availableRadius: Array<'full' | 'md'> = ['full', 'md']

export function generateSections(count: number, constantAvatarSrc: string) {
	return Array.from({ length: count }).map((_, index) => ({
		id: index + 1,
		avatars: [
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: constantAvatarSrc,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
		],
		posts: {
			id: index + 1,
			text: generateRandomPost(),
			detailsUrl: `https://example.com/post/${index + 1}`,
		},
	}))
}
