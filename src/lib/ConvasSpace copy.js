import React, { useEffect, useRef } from 'react'

export function random(min, max) {
	return Math.random() * (max - min) + min
}

const CanvasSpace = ({ size, speed, color, count }) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		class Particle {
			constructor(x, y) {
				this.x = x
				this.y = y
				this.size = random(size, size * 0.5)
				this.speedX = random(-speed, speed)
				this.speedY = random(-speed, speed)
				this.alpha = 1
			}

			draw() {
				ctx.globalAlpha = this.alpha
				ctx.beginPath()
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
				ctx.fillStyle = 'white'
				ctx.fill()
			}

			update() {
				this.x += this.speedX
				this.y += this.speedY

				if (
					this.x < 0 ||
					this.x > canvas.width ||
					this.y < 0 ||
					this.y > canvas.height
				) {
					if (this.x < 0 || this.x > canvas.width) {
						this.speedX = -this.speedX
					}
					if (this.y < 0 || this.y > canvas.height) {
						this.speedY = -this.speedY
					}
				}
			}
		}

		class Comet extends Particle {
			constructor(x, y) {
				super(x, y)
				this.size *= 1.5
				this.speedX *= 2
				this.speedY *= 2
				this.trail = [] // Tablica do przechowywania ostatnich pozycji kometki
				this.maxTrailLength = 15 // Maksymalna długość traila
			}

			update() {
				super.update()

				this.trail.push({ x: this.x, y: this.y })
				while (this.trail.length > this.maxTrailLength) {
					this.trail.shift()
				}
			}

			draw() {
				ctx.globalAlpha = 0.5
				ctx.shadowBlur = 15
				ctx.shadowColor = 'white'

				// Rysowanie traila
				for (let i = 0; i < this.trail.length - 1; i++) {
					const t0 = this.trail[i]
					const t1 = this.trail[i + 1]
					ctx.beginPath()
					ctx.moveTo(t0.x, t0.y)
					ctx.lineTo(t1.x, t1.y)
					ctx.strokeStyle = `rgba(255, 255, 255, ${
						(i + 1) / this.trail.length
					})` // Ściemnianie początku traila
					ctx.lineWidth = this.size
					ctx.stroke()
				}

				ctx.beginPath()
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
				ctx.fillStyle = 'white'
				ctx.fill()

				ctx.shadowBlur = 0
			}
		}

		const particles = []

		function init() {
			for (let i = 0; i < count; i++) {
				const x = random(0, canvas.width)
				const y = random(0, canvas.height)

				if (Math.random() < 0.1) {
					particles.push(new Comet(x, y))
				} else {
					particles.push(new Particle(x, y))
				}
			}
		}

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			for (let i = 0; i < particles.length; i++) {
				particles[i].update()
				particles[i].draw()
			}

			requestAnimationFrame(animate)
		}

		init()
		animate()
	}, [size, speed, color, count])

	return <canvas ref={canvasRef} />
}

export default CanvasSpace
