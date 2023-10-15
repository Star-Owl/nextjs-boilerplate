import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { FormatNumber } from '@/lib/numberFormat'

type AnimatedNumberProps = {
	value: number
	className?: string
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
	let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 })
	let display = useTransform(spring, (currentValue: number) =>
		FormatNumber(Math.round(currentValue)),
	)

	useEffect(() => {
		spring.set(value)
	}, [spring, value])

	return <motion.span className={className}>{display}</motion.span>
}
