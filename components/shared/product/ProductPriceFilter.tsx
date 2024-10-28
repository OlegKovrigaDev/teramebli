import { Button, Input } from '@/components/ui'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Accord } from '../accord'
import { RangeSlider } from '../range-slider'

export const ProductPriceFilter = ({ title }: { title: string }) => {
	const [minValue, setMinValue] = useState(0)
	const [maxValue, setMaxValue] = useState(500)

	const handleSliderChange = (values: number[]) => {
		setMinValue(values[0])
		setMaxValue(values[1])
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target
		if (id === `variant-${1}`) {
			setMinValue(parseInt(value, 10))
		} else if (id === `variant-${2}`) {
			setMaxValue(parseInt(value, 10))
		}
	}

	return (
		<Accord title={title}>
			<div className='flex flex-col gap-2 text-xs w-full'>
				<div className='flex justify-between items-center gap-2'>
					<Label htmlFor={`variant-${1}`}>від</Label>
					<Input
						type='number'
						id={`variant-${1}`}
						placeholder='0'
						min={0}
						max={1000}
						value={minValue}
						onChange={handleInputChange}
					/>
					<Label htmlFor={`variant-${2}`}>до</Label>
					<Input
						type='number'
						id={`variant-${2}`}
						min={100}
						max={1000}
						value={maxValue}
						onChange={handleInputChange}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[minValue, maxValue]}
					onValueChange={handleSliderChange}
				/>
				<Button className='px-20 py-2 bg-gray'>Застосувати</Button>
			</div>
		</Accord>
	)
}
