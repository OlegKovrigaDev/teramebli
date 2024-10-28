'use client'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import React from 'react'

type SliderProps = {
	className?: string
	min: number
	max: number
	step: number
	formatLabel?: (value: number) => string
	value?: number[] | readonly number[]
	onValueChange?: (values: number[]) => void
}

const RangeSlider = React.forwardRef(
	(
		{
			className,
			min,
			max,
			step,
			formatLabel,
			value,
			onValueChange,
			...props
		}: SliderProps,
		ref
	) => {
		const initialValue = Array.isArray(value) ? value : [min, max]
		const [localValues, setLocalValues] = React.useState(initialValue)

		React.useEffect(() => {
			// Update localValues when the external value prop changes
			setLocalValues(
				Array.isArray(value) ? value.slice().sort((a, b) => a - b) : [min, max]
			)
		}, [min, max, value])

		const handleValueChange = (newValues: number[]) => {
			setLocalValues(
				newValues
					.slice()
					.sort((a, b) => a - b)
					.map((v, i) => {
						if (i === 0) return Math.max(v, min)
						if (i === newValues.length - 1) return Math.min(v, max)
						return v
					})
			)
			if (onValueChange) {
				onValueChange(
					newValues
						.slice()
						.sort((a, b) => a - b)
						.map((v, i) => {
							if (i === 0) return Math.max(v, min)
							if (i === newValues.length - 1) return Math.min(v, max)
							return v
						})
				)
			}
		}

		return (
			<SliderPrimitive.Root
				ref={ref as React.RefObject<HTMLDivElement>}
				min={min}
				max={max}
				step={step}
				value={localValues}
				onValueChange={handleValueChange}
				className={cn(
					'relative flex w-full touch-none select-none my-4 items-center',
					className
				)}
				{...props}
			>
				<SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-gray/20'>
					<SliderPrimitive.Range className='absolute h-full bg-gray/80' />
				</SliderPrimitive.Track>
				{localValues.map((value, index) => (
					<React.Fragment key={index}>
						<SliderPrimitive.Thumb className='block h-[10px] w-4 bg-gray shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
					</React.Fragment>
				))}
			</SliderPrimitive.Root>
		)
	}
)

RangeSlider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider }
