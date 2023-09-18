import React, { useRef, useEffect } from 'react'

const CosmicNoiseCanvas = ({
	count = 100,
	speedFactor = 1,
	color = 'white',
}) => {
	const canvasRef = useRef(null)
	const particles = useRef([])

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		let animationFrameId

		class Particle {
			constructor(x, y, size, speedX, speedY, isComet) {
				this.x = x
				this.y = y
				this.size = size
				this.speedX = speedX
				this.speedY = speedY
				this.opacity = 1
				this.isFading = Math.random() < 0.1
				this.isComet = isComet
				if (this.isComet) {
					this.speedX *= 3 // Znacznie zwiększamy prędkość dla "komety"
					this.speedY *= 3 // Znacznie zwiększamy prędkość dla "komety"
				}
			}

			update() {
				if (this.isComet) {
					ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
					ctx.fillRect(0, 0, canvas.width, canvas.height)
				}

				this.x += this.speedX
				this.y += this.speedY

				if (this.isFading) {
					this.opacity -= 0.01
					if (this.opacity <= 0) {
						this.opacity = 0
						this.isFading = false
					}
				} else {
					this.opacity += 0.01
					if (this.opacity >= 1) {
						this.opacity = 1
						this.isFading = true
					}
				}

				if (
					this.x < 0 ||
					this.x > canvas.width ||
					this.y < 0 ||
					this.y > canvas.height
				) {
					this.x = Math.random() * canvas.width
					this.y = Math.random() * canvas.height
					this.opacity = 1
					this.isFading = Math.random() < 0.5
				}
			}

			draw() {
				ctx.fillStyle = `${color}`
				ctx.globalAlpha = this.opacity // Ustawiamy globalną przezroczystość
				ctx.beginPath()
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
				ctx.closePath()
				ctx.fill()
			}
		}

		function init() {
			for (let i = 0; i < count; i++) {
				const x = Math.random() * canvas.width
				const y = Math.random() * canvas.height
				const size = 1 // Ustawiamy stały rozmiar dla wszystkich cząsteczek
				const speedX = (Math.random() * 3 - 1.5) * speedFactor
				const speedY = (Math.random() * 3 - 1.5) * speedFactor

				const isComet = Math.random() < 0.1 // 10% szans na bycie "komety"
				particles.current.push(
					new Particle(x, y, size, speedX, speedY, isComet),
				)
			}
		}

		function animate() {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.1)' // Dzięki temu, cząsteczki zostawiają ślad
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			for (let particle of particles.current) {
				particle.update()
				particle.draw()
			}

			animationFrameId = requestAnimationFrame(animate)
		}

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId)
		}
		particles.current = []

		function resizeCanvas() {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		resizeCanvas()
		init()
		animate()

		return () => {
			window.removeEventListener('resize', resizeCanvas)
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}, [count, speedFactor, color])

	return (
		<canvas
			ref={canvasRef}
			style={{ position: 'absolute', top: 0, left: 0 }}
		/>
	)
}

export default CosmicNoiseCanvas
