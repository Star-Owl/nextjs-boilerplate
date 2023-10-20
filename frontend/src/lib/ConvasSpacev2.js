import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { GlowFilter } from '@pixi/filter-glow'
import { DropShadowFilter } from '@pixi/filter-drop-shadow'

function random(min, max) {
	return Math.random() * (max - min) + min
}

function seededRandom(seed) {
	const x = Math.sin(seed++) * 10000
	return x - Math.floor(x)
}

const CanvasSpace = ({ size, speed, color, count }) => {
	const appRef = useRef(null)
	const pixiApp = useRef(null)

	useEffect(() => {
		const app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x121923,
			antialias: true,
		})

		const handleResize = () => {
			if (app.renderer) {
				app.renderer.resize(window.innerWidth, window.innerHeight)
			}
		}

		window.addEventListener('resize', handleResize)

		if (app && app.renderer && appRef.current) {
			appRef.current.appendChild(app.view)
		} else {
			return
		}

		class Star extends PIXI.Graphics {
			constructor(x, y, shouldGlow = false) {
				super()
				this.shouldGlow = shouldGlow
				this.initialize(x, y)
			}

			initialize(x, y) {
				this.x = x
				this.y = y
				this.radius = seededRandom(Date.now() + 4) * size
				this.speedX = (seededRandom(Date.now() + 2) - 0.5) * speed
				this.speedY = (seededRandom(Date.now() + 3) - 0.5) * speed

				this.alpha = this.shouldGlow ? 1 : 0.33

				this.fadeDirection = seededRandom(Date.now()) > 0.5 ? -1 : 1
				this.fadeMinAlpha = seededRandom(Date.now())
				this.fadeMaxAlpha = 1
				this.fadeSpeed = seededRandom(Date.now()) * 0.015 + 0.005
				this.fadeDelayMax = seededRandom(Date.now()) * 4000 + 1000
				this.fadeDelay = Math.floor(
					seededRandom(Date.now()) * this.fadeDelayMax,
				)

				if (this.shouldGlow) {
					const glow = new GlowFilter({
						color: 0xffffff,
						distance: 15,
						outerStrength: 5,
						innerStrength: 1,
						quality: 1,
					})

					this.filters = [glow]
				}

				this.beginFill(color)
				this.drawCircle(0, 0, this.radius)
				this.endFill()

				app.stage.addChild(this)
			}

			update() {
				this.x += this.speedX
				this.y += this.speedY

				if (this.x < 0) this.x = app.screen.width
				if (this.x > app.screen.width) this.x = 0
				if (this.y < 0) this.y = app.screen.height
				if (this.y > app.screen.height) this.y = 0

				//Blinking Function
				if (!(this instanceof Comet)) {
					if (this.fadeDelay <= 0) {
						this.alpha -= this.fadeSpeed

						if (this.alpha <= 0 || this.alpha >= 1) {
							this.fadeSpeed = -this.fadeSpeed
							this.fadeDelay = Math.floor(
								seededRandom(Date.now()) * this.fadeDelayMax,
							)
							if (this.alpha <= 0) this.alpha = 0
							if (this.alpha >= 1) this.alpha = 1
						}
					} else {
						this.fadeDelay--
					}
				}
			}

			respawn() {
				this.x = random(0, app.screen.width)
				this.y = random(0, app.screen.height)
				this.speedX = random(-speed, speed)
				this.speedY = random(-speed, speed)
			}

			switchFadeDirection() {
				this.fadeDirection *= -1
				this.fadeDelay = Math.floor(
					seededRandom(Date.now()) * this.fadeDelayMax,
				)
			}
		}

		class Comet extends Star {
			constructor(x, y) {
				super(x, y)
				this.isActive = true
				this.alpha = 1
				this.size *= 1.5
				this.speedX *= seededRandom(Date.now()) * 50
				this.speedY *= seededRandom(Date.now() + 1) * 50
				this.trail = new PIXI.Graphics()
				this.positions = []
				this.maxTrailLength = seededRandom(Date.now() + 2) * 50 + 25
				this.tint = 0xffffff

				app.stage.addChild(this.trail)
				app.stage.addChild(this)

				const glow = new GlowFilter({
					color: 0xffffff,
					distance: 15,
					outerStrength: 5,
					innerStrength: 1,
					quality: 1,
				})

				this.filters = [glow]
			}

			deactivate() {
				this.isActive = false
				this.visible = false
				this.trail.clear()
			}

			activate() {
				this.isActive = true
				this.visible = true
				this.respawn()
			}

			update() {
				if (!this.isActive) return

				super.update()

				this.rotation += this.rotationSpeed

				this.angle = this.rotation * (180 / Math.PI)

				this.positions.unshift({ x: this.x, y: this.y })

				while (this.positions.length > this.maxTrailLength) {
					this.positions.pop()
				}

				this.trail.clear()
				this.trail.lineStyle(2, 0xffffff, 0.5) // You can adjust the line style here

				let previousPosition = this.positions[0]
				for (let i = 1; i < this.positions.length; i++) {
					const currentPosition = this.positions[i]

					// Check if the distance between two points is reasonable
					const distance = Math.sqrt(
						(currentPosition.x - previousPosition.x) ** 2 +
							(currentPosition.y - previousPosition.y) ** 2,
					)

					if (distance < 100) {
						// You can adjust the distance threshold here
						const alpha = 1 - i / this.positions.length // Calculate alpha
						this.trail.lineStyle(2, 0xffffff, alpha) // Apply alpha
						this.trail.moveTo(
							previousPosition.x,
							previousPosition.y,
						)
						this.trail.lineTo(currentPosition.x, currentPosition.y)
					}

					previousPosition = currentPosition
				}

				const respawnThreshold = 100

				if (
					this.x < -respawnThreshold ||
					this.x > app.screen.width + respawnThreshold ||
					this.y < -respawnThreshold ||
					this.y > app.screen.height + respawnThreshold
				) {
					this.deactivate()

					const minRespawnDelay = 10000
					const maxRespawnDelay = 30000
					const respawnDelay =
						Math.random() * (maxRespawnDelay - minRespawnDelay) +
						minRespawnDelay

					setTimeout(() => {
						this.activate()
					}, respawnDelay)
				}
			}

			handleRespawning() {
				if (this.shouldRespawn) {
					this.shouldRespawn = false
					this.visible = false

					const minRespawnDelay = 10000
					const maxRespawnDelay = 30000
					const respawnDelay =
						Math.random() * (maxRespawnDelay - minRespawnDelay) +
						minRespawnDelay

					setTimeout(() => {
						this.respawn()
						this.visible = true
					}, respawnDelay)
				}
			}

			respawn() {
				const edges = ['left', 'right', 'top', 'bottom']
				const edge = edges[Math.floor(Math.random() * edges.length)]

				switch (edge) {
					case 'left':
						this.x = 0
						this.y = Math.random() * app.screen.height
						break
					case 'right':
						this.x = app.screen.width
						this.y = Math.random() * app.screen.height
						break
					case 'top':
						this.x = Math.random() * app.screen.width
						this.y = 0
						break
					case 'bottom':
						this.x = Math.random() * app.screen.width
						this.y = app.screen.height
						break
					default:
						break
				}

				const angle = Math.random() * Math.PI * 2

				const minSpeed = 2
				const maxSpeed = 5
				const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed

				this.rotation = Math.random() * Math.PI * 2
				this.rotationSpeed = (Math.random() - 0.5) * 0.1

				this.speedX = Math.cos(angle) * speed
				this.speedY = Math.sin(angle) * speed
			}
		}

		const stars = []

		const createComet = () => {
			const x = seededRandom(Date.now()) * app.screen.width + 1000
			const y = seededRandom(Date.now()) * app.screen.height + 1000
			stars.push(new Comet(x, y))
		}

		//setTimeout(createComet, Math.random() * 10000)

		for (let i = 0; i < count; i++) {
			const x = random(seededRandom(Date.now()), app.screen.width)
			const y = random(seededRandom(Date.now()), app.screen.height)
			stars.push(new Star(x, y, Math.random() > 0.98))
		}

		app.ticker.add(() => {
			stars.forEach((star) => star.update())
		})

		return () => {
			window.removeEventListener('resize', handleResize)
			app.destroy(true)
		}
	}, [size, speed, color, count])

	return (
		<div
			className='absolute'
			ref={appRef}
		/>
	)
}

export default CanvasSpace
