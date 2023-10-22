import React, { useState, useEffect, FC } from 'react'

const HueCircle: FC = () => {
	const savedHue = localStorage.getItem('savedHue')
	const initialHue = savedHue ? parseInt(savedHue, 10) : 215

	const [hue, setHue] = useState(initialHue)

	const [dragging, setDragging] = useState(false)
	const radius = 100
	const lineWidth = 13
	const handlerRadius = radius - lineWidth / 2

	const handleMouseDown = (e: React.MouseEvent<SVGCircleElement>) => {
		setDragging(true)
	}

	const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
		if (!dragging) return

		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left - 150
		const y = 150 - e.clientY + rect.top

		let hue = Math.atan2(y, x) * (180 / Math.PI) - 90
		hue = hue < 0 ? hue + 360 : hue
		hue = 360 - hue
		setHue(hue)

		document.documentElement.style.setProperty(
			'--accent-hue',
			hue.toString(),
		)
		localStorage.setItem('savedHue', hue.toString())
	}

	const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
		setDragging(false)
	}

	useEffect(() => {
		const hues = [215, 216, 214, 213, 214, 219, 223, 226, 227, 226, 228]
		hues.forEach((originalHue, index) => {
			const adjustedHue = (originalHue + hue) % 360
			document.documentElement.style.setProperty(
				`--accent-hue-${index * 100}`,
				adjustedHue.toString(),
			)
		})
	}, [hue])

	useEffect(() => {
		const globalMouseUp = (e: globalThis.MouseEvent) => {
			setDragging(false)
		}

		window.addEventListener('mouseup', globalMouseUp)

		return () => {
			window.removeEventListener('mouseup', globalMouseUp)
		}
	}, [])

	return (
		<svg
			width='300'
			height='300'
			viewBox='0 0 300 300'
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			{Array.from({ length: 360 }, (_, i) => (
				<line
					key={i}
					x1={
						150 +
						Math.sin((i * Math.PI) / 180) * (radius - lineWidth)
					}
					y1={
						150 -
						Math.cos((i * Math.PI) / 180) * (radius - lineWidth)
					}
					x2={150 + Math.sin((i * Math.PI) / 180) * radius}
					y2={150 - Math.cos((i * Math.PI) / 180) * radius}
					stroke={`hsl(${i}, 66%, 54%)`}
					strokeWidth='3'
				/>
			))}
			<circle
				cx={150 + Math.sin((hue * Math.PI) / 180) * handlerRadius}
				cy={150 - Math.cos((hue * Math.PI) / 180) * handlerRadius}
				r={lineWidth}
				fill={`hsl(${hue}, 66%, 54%)`} // Set the fill color based on the hue
				stroke='hsl(220, 8%, 7%)'
				strokeWidth='2'
				onMouseDown={handleMouseDown}
			/>
			{/* <path
				d={`M${handlerX - 10},${handlerY} L${
					handlerX + 10
				},${handlerY} L${handlerX},${handlerY + 20} Z`}
				fill={`hsl(${hue}, 100%, 50%)`}
				stroke='black'
				strokeWidth='2'
				onMouseDown={handleMouseDown}
			/> */}
			<text
				x='150'
				y='150'
				dy='0.3em'
				alignmentBaseline='middle'
				textAnchor='middle'
				fontSize='40'
				fill={`hsl(${hue}, 66%, 54%)`}
			>
				{Math.round(hue)}
			</text>
		</svg>
	)
}

export default HueCircle
