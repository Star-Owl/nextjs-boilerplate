import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { GlowFilter } from '@pixi/filter-glow'
import { DropShadowFilter } from '@pixi/filter-drop-shadow'

export function random(min, max) {
	return Math.random() * (max - min) + min
}

const CanvasSpace = ({ size, speed, color, count }) => {
	const appRef = useRef(null)

	useEffect(() => {
		const app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000,
			antialias: true,
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
				this.alpha = 0.33

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

					// Jeśli cząstka jest niewidoczna lub w pełni widoczna, odwróć kierunek znikania i resetuj opóźnienie
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
				shadow.color = 0xffffff // biały kolor

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
