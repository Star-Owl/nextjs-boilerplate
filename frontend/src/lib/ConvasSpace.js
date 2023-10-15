import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { GlowFilter } from '@pixi/filter-glow'
import { DropShadowFilter } from '@pixi/filter-drop-shadow'

export function random(min, max) {
	return Math.random() * (max - min) + min
}

const CanvasSpace = ({ size, speed, color, count }) => {
	const appRef = useRef(null)
	let isBlackHoleActive = false
	let blackHolePosition = { x: 0, y: 0 }

	useEffect(() => {
		const app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000,
			antialias: true,
		})

		app.view.addEventListener('mousedown', (e) => {
			isBlackHoleActive = true
			blackHolePosition.x = e.clientX
			blackHolePosition.y = e.clientY
			console.log('Black hole activated at:', blackHolePosition)
		})

		app.view.addEventListener('mouseup', () => {
			isBlackHoleActive = false
			console.log('Black hole deactivated')
		})

		app.view.addEventListener('mousemove', (e) => {
			if (!isBlackHoleActive) return
			blackHolePosition.x = e.clientX
			blackHolePosition.y = e.clientY
		})

		appRef.current.appendChild(app.view)

		window.addEventListener('resize', () => {
			app.renderer.resize(window.innerWidth, window.innerHeight)
		})

		class Particle extends PIXI.Graphics {
			constructor(x, y) {
				super()
				this.x = x
				this.y = y
				this.size = random(size, size * 0.5)
				this.speedX = random(-speed, speed)
				this.speedY = random(-speed, speed)
				this.isAffectedByBlackHole = false
				this.isBeingPulled = false
				this.alpha = 0.33

				this.originalSpeedX = this.speedX
				this.originalSpeedY = this.speedY

				this.beginFill(0xffffff)
				this.drawCircle(0, 0, this.size)
				this.endFill()

				app.stage.addChild(this)

				this.fadeDirection = Math.random() > 0.5 ? -1 : 1
				this.fadeMinAlpha = random(0, 1)
				this.fadeMaxAlpha = 1
				this.fadeSpeed = random(0.005, 0.02)
				this.fadeDelayMax = random(1000, 5000) // Opóźnienie mrugania
				this.fadeDelay = Math.floor(random(0, this.fadeDelayMax))
			}

			applyBlackHoleForce() {
				console.log('Applying black hole force')
				console.log(isBlackHoleActive)
				if (!isBlackHoleActive) {
					this.speedX += (this.originalSpeedX - this.speedX) * 0.05
					this.speedY += (this.originalSpeedY - this.speedY) * 0.05
					return
				}

				const dx = blackHolePosition.x - this.x
				const dy = blackHolePosition.y - this.y
				const dist = Math.sqrt(dx * dx + dy * dy)

				if (dist < 1) {
					this.x = random(0, app.screen.width)
					this.y = random(0, app.screen.height)
					return
				}

				const forceMagnitude = 6 / (dist * dist)
				const MAX_FORCE = 0.5

				const force = Math.min(forceMagnitude, MAX_FORCE)

				this.speedX += dx * force
				this.speedY += dy * force
			}

			update() {
				this.x += this.speedX
				this.y += this.speedY

				if (
					this.x < 0 ||
					this.x > app.screen.width ||
					this.y < 0 ||
					this.y > app.screen.height
				) {
					if (this.x < 0 || this.x > app.screen.width) {
						this.speedX = -this.speedX
					}
					if (this.y < 0 || this.y > app.screen.height) {
						this.speedY = -this.speedY
					}
				}

				if (this.fadeDelay <= 0) {
					this.alpha -= this.fadeSpeed

					if (this.alpha <= 0 || this.alpha >= 1) {
						this.fadeSpeed = -this.fadeSpeed
						this.fadeDelay = Math.floor(
							random(0, this.fadeDelayMax),
						)
						if (this.alpha <= 0) this.alpha = 0
						if (this.alpha >= 1) this.alpha = 1
					}
				} else {
					this.fadeDelay--
				}
			}

			switchFadeDirection() {
				this.fadeDirection *= -1
				this.fadeDelay = Math.floor(random(0, this.fadeDelayMax))
			}
		}

		class Comet extends Particle {
			constructor(x, y) {
				super(x, y)
				this.size *= 1.5
				this.speedX *= random(3, 10)
				this.speedY *= random(3, 10)
				this.trail = new PIXI.Graphics()
				this.positions = []
				this.maxTrailLength = random(25, 75)

				app.stage.addChild(this.trail)

				const shadow = new DropShadowFilter()
				shadow.blur = 15
				shadow.alpha = 0.6
				shadow.distance = 10
				shadow.color = 0xffffff

				this.filters = [shadow]

				// const glow = new GlowFilter({
				// 	color: 0xffffff, // biały kolor świecenia
				// 	distance: 15, // dystans świecenia
				// 	outerStrength: 2.5,
				// 	innerStrength: 1,
				// 	quality: 0.3, // jakość świecenia, mniejsza wartość = wyższa wydajność
				// })

				// this.filters = [glow]
			}

			update() {
				super.update()

				this.positions.push({ x: this.x, y: this.y })
				while (this.positions.length > this.maxTrailLength) {
					this.positions.shift()
				}

				this.trail.clear()

				for (let i = 0; i < this.positions.length - 1; i++) {
					this.trail.lineStyle(
						this.size,
						0xffffff,
						(i + 1) / this.positions.length,
					)
					this.trail.moveTo(this.positions[i].x, this.positions[i].y)
					this.trail.lineTo(
						this.positions[i + 1].x,
						this.positions[i + 1].y,
					)
				}
			}
		}

		Particle.prototype.remove = function () {
			const index = particles.indexOf(this)
			if (index > -1) {
				particles.splice(index, 1)
			}
		}

		Particle.prototype.respawn = function () {
			this.x = Math.random() * app.view.width
			this.y = Math.random() * app.view.height
			this.speedX = random(-speed, speed)
			this.speedY = random(-speed, speed)

			particles.push(this)
		}

		Particle.prototype.applyBlackHoleForce = function () {
			if (isBlackHoleActive) {
				const dx = blackHolePosition.x - this.x
				const dy = blackHolePosition.y - this.y
				const dist = Math.sqrt(dx * dx + dy * dy)

				const G = 0.3
				const forceMagnitude = G / (dist * dist)

				const ax = forceMagnitude * (dx / dist)
				const ay = forceMagnitude * (dy / dist)

				this.speedX += ax
				this.speedY += ay
			} else {
				// Interpoluj prędkość do pierwotnej wartości
				this.speedX = this.speedX * 0.9 + this.originalSpeedX * 0.1
				this.speedY = this.speedY * 0.9 + this.originalSpeedY * 0.1

				// Jeśli prędkość jest wystarczająco bliska pierwotnej wartości, ustaw flagę na false
				if (
					Math.abs(this.speedX - this.originalSpeedX) < 0.01 &&
					Math.abs(this.speedY - this.originalSpeedY) < 0.01
				) {
					this.isBeingPulled = false
				}
			}
		}

		const particles = []

		for (let i = 0; i < count; i++) {
			const x = random(0, app.screen.width)
			const y = random(0, app.screen.height)

			if (Math.random() < 0.015) {
				particles.push(new Comet(x, y))
			} else {
				particles.push(new Particle(x, y))
			}
		}

		app.ticker.add(() => {
			for (let i = 0; i < particles.length; i++) {
				//particles[i].applyBlackHoleForce()
				particles[i].update()
			}
		})

		return () => {
			app.destroy(true)
		}
	}, [size, speed, color, count])

	return <div ref={appRef} />
}

export default CanvasSpace
