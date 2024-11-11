import { useState } from 'react'

type ProductFilterProps = {
	onFilterChange: (filters: {
		minPrice?: number
		maxPrice?: number
		size?: string
		color?: string
	}) => void
}

export const ProductFilter = ({ onFilterChange }: ProductFilterProps) => {
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
	const [size, setSize] = useState<string>('')
	const [color, setColor] = useState<string>('')

	const handleFilterChange = () => {
		onFilterChange({
			minPrice,
			maxPrice,
			size: size || undefined,
			color: color || undefined,
		})
	}

	return (
		<div className='p-4 border rounded-lg'>
			<h2 className='text-lg font-semibold mb-2'>Фильтры продуктов</h2>

			<div className='mb-4'>
				<label className='block text-sm font-medium'>Цена от</label>
				<input
					type='number'
					value={minPrice || ''}
					onChange={e => setMinPrice(Number(e.target.value))}
					placeholder='Минимальная цена'
					className='w-full p-2 border rounded'
				/>
			</div>

			<div className='mb-4'>
				<label className='block text-sm font-medium'>Цена до</label>
				<input
					type='number'
					value={maxPrice || ''}
					onChange={e => setMaxPrice(Number(e.target.value))}
					placeholder='Максимальная цена'
					className='w-full p-2 border rounded'
				/>
			</div>

			<div className='mb-4'>
				<label className='block text-sm font-medium'>Размер</label>
				<select
					value={size}
					onChange={e => setSize(e.target.value)}
					className='w-full p-2 border rounded'
				>
					<option value=''>Все</option>
					<option value='S'>S</option>
					<option value='M'>M</option>
					<option value='L'>L</option>
					{/* Add more sizes as needed */}
				</select>
			</div>

			<div className='mb-4'>
				<label className='block text-sm font-medium'>Цвет</label>
				<select
					value={color}
					onChange={e => setColor(e.target.value)}
					className='w-full p-2 border rounded'
				>
					<option value=''>Все</option>
					<option value='red'>Красный</option>
					<option value='blue'>Синий</option>
					<option value='green'>Зеленый</option>
					{/* Add more colors as needed */}
				</select>
			</div>

			<button
				onClick={handleFilterChange}
				className='w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700'
			>
				Применить фильтры
			</button>
		</div>
	)
}
