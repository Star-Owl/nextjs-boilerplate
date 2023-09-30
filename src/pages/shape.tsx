import React, { useState, useEffect, useRef } from 'react'

const Donut = () => {
	const [ascii, setAscii] = useState('')
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const preRef = useRef<HTMLCanvasElement | null>(null)
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) {
			console.error('Canvas element not found in the DOM')
			return
		}
		const ctx = canvas.getContext('2d')
		if (!ctx) {
			console.error('Canvas context not found')
			return
		}

		const resizeCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)

		let A = 1
		let B = 1

		const asciiframe = () => {
			let b = []
			let z = []
			A += 0.07
			B += 0.03
			let cA = Math.cos(A)
			let sA = Math.sin(A)
			let cB = Math.cos(B)
			let sB = Math.sin(B)
			for (let k = 0; k < 1760; k++) {
				b[k] = k % 80 === 79 ? '\n' : ' '
				z[k] = 0
			}
			for (let j = 0; j < 6.28; j += 0.07) {
				let ct = Math.cos(j)
				let st = Math.sin(j)
				for (let i = 0; i < 6.28; i += 0.02) {
					let sp = Math.sin(i)
					let cp = Math.cos(i)
					let h = ct + 2
					let D = 1 / (sp * h * sA + st * cA + 5)
					let t = sp * h * cA - st * sA
					let x = 0 | (40 + 30 * D * (cp * h * cB - t * sB))
					let y = 0 | (12 + 15 * D * (cp * h * sB + t * cB))
					let o = x + 80 * y
					let N =
						0 |
						(8 *
							((st * sA - sp * ct * cA) * cB -
								sp * ct * sA -
								st * cA -
								cp * ct * sB))
					if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
						z[o] = D
						b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0]
					}
				}
			}
			setAscii(b.join(''))
			canvasframe()
		}

		const canvasframe = () => {
			if (!canvas) {
				console.error('Canvas element not found in the DOM')
				return
			}
			const ctx = canvas.getContext('2d')
			if (!ctx) {
				console.error('Canvas context not found')
				return
			}
			ctx.fillStyle = '#000'
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			if (!isAnimating) {
				A += 0.07
				B += 0.03
			}

			let R1 = 1
			let R2 = 2
			let K1 = 150
			let K2 = 5
			let cA = Math.cos(A)
			let sA = Math.sin(A)
			let cB = Math.cos(B)
			let sB = Math.sin(B)
			for (let j = 0; j < 6.28; j += 0.3) {
				let ct = Math.cos(j)
				let st = Math.sin(j)
				for (let i = 0; i < 6.28; i += 0.1) {
					let sp = Math.sin(i)
					let cp = Math.cos(i)
					let ox = R2 + R1 * ct
					let oy = R1 * st
					let x = ox * (cB * cp + sA * sB * sp) - oy * cA * sB
					let y = ox * (sB * cp - sA * cB * sp) + oy * cA * cB
					let ooz = 1 / (K2 + cA * ox * sp + sA * oy)
					let xp = 150 + K1 * ooz * x
					let yp = 120 - K1 * ooz * y
					let L =
						0.7 *
						(cp * ct * sB -
							cA * ct * sp -
							sA * st +
							cB * (cA * st - ct * sA * sp))
					if (L > 0) {
						ctx.fillStyle = `rgba(255, 255, 255, ${L})`
						ctx.fillRect(xp, yp, 1.5, 1.5)
					}
				}
			}
		}

		const intervalId = setInterval(asciiframe, 50)
		setIsAnimating(true)

		return () => {
			clearInterval(intervalId)
			window.removeEventListener('resize', resizeCanvas)
		}
	}, [])

	useEffect(() => {
		const pre = preRef.current
		if (!pre) {
			console.error('Pre element not found in the DOM')
			return
		}
		pre.classList.add(
			'w-full',
			'h-full',
			'flex',
			'justify-center',
			'items-center',
		)
	}, [])

	return (
		<div className='h-device relative w-full'>
			<pre
				id='d'
				ref={preRef}
				className='absolute left-0 top-0 m-0 p-0'
			>
				{ascii}
			</pre>
			<canvas
				id='canvasdonut'
				ref={canvasRef}
				className='absolute left-0 top-0'
			/>
		</div>
	)
}

export default Donut
