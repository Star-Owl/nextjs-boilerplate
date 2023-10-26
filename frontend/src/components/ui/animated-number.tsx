import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FormatNumber } from '@/lib/numberFormat'

type AnimatedNumberProps = {
	value: number
	className?: string
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
	const [displayValue, setDisplayValue] = useState(false)

	let spring = useSpring(0, {
		mass: 0.8,
		stiffness: 75,
		damping: 15,
	})
	let display = useTransform(spring, (currentValue: number) =>
		FormatNumber(Math.round(currentValue)),
	)

	useEffect(() => {
		value !== 0 && setDisplayValue(true)

		spring.set(value)
	}, [spring, value])

	useEffect(() => {
		return spring.onChange((v) => {
			v === 0 && setDisplayValue(false)
		})
	}, [spring])

	return (
		displayValue && (
			<motion.span className={className}>{display}</motion.span>
		)
	)
}
