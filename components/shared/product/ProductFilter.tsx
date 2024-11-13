import { useMemo, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Accord } from '../accord'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Button } from '@/components/ui'

interface FilterOption {
	id: number | string
	type: string
	count: number
}

interface ProductFilterProps {
	title: string
	products: any[]
	onFilterChange?: (filters: Record<string, (string | number)[]>) => void
	onResetFilters?: () => void
}

export const ProductFilter = ({
	title,
	products,
	onFilterChange,
}: ProductFilterProps) => {
	const selectedStorage = useSelector(
		(state: RootState) => state.selectedStorage.storage
	)

	const excludedAttributes = [
		'Articul',
		'ModelName',
		'Розділ синхронізації повністю',
		'RetailPrice',
		'Розділ синхронізації',
		'Кількість на складі',
		'RetailPriceWithDiscount',
		'Відображення на сайті',
		'MesUnit',
		'Одиниця виміру терміну гарантії',
		'groupId',
		'Назва товару',
		'Название товара',
		'Опис текст(сайт)',
		'__Матеріал',
		'Closeout',
	]

	const filterOptions = useMemo(() => {
		const attributeMap: Record<string, Set<string | number>> = {}

		products.forEach(product => {
			const params = product[selectedStorage] || {}

			Object.keys(params).forEach(key => {
				if (!excludedAttributes.includes(key)) {
					const [UaKey] = key.split('_')
					const value = params[key]
					const [UaValue] = String(value).split('_')

					if (!attributeMap[UaKey]) {
						attributeMap[UaKey] = new Set()
					}
					attributeMap[UaKey].add(UaValue)
				}
			})
		})

		return Object.entries(attributeMap).reduce((acc, [key, values]) => {
			acc[key] = Array.from(values).map((value, index) => ({
				id: `${key}-${index}`,
				type: value as string,
				count: products.filter(
					product => product[selectedStorage]?.[key] === value
				).length,
			}))
			return acc
		}, {} as Record<string, FilterOption[]>)
	}, [products, selectedStorage, excludedAttributes])

	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, (number | string)[]>
	>({})
	const [showMore, setShowMore] = useState<Record<string, boolean>>({})
	const [showAppliedFilters, setShowAppliedFilters] = useState(false)

	const handleCheckboxChange = (filterKey: string, type: string) => {
		setSelectedOptions(prev => ({
			...prev,
			[filterKey]: prev[filterKey]?.includes(type)
				? prev[filterKey].filter(optionType => optionType !== type)
				: [...(prev[filterKey] || []), type],
		}))
	}

	const applyFilter = () => {
		if (onFilterChange) {
			onFilterChange(selectedOptions)
		}
		setShowAppliedFilters(true)
	}

	const renderFilterOptions = (options: FilterOption[], filterKey: string) => {
		const visibleOptions = showMore[filterKey] ? options : options.slice(0, 5)

		return visibleOptions.map(({ id, type, count }) => (
			<div key={id} className='flex justify-between text-[16px]'>
				<span className='flex gap-2 items-center'>
					<Checkbox
						id={`${filterKey}-${id}`}
						className='border-2 rounded'
						checked={selectedOptions[filterKey]?.includes(type)}
						onCheckedChange={() => handleCheckboxChange(filterKey, type)}
					/>
					<Label htmlFor={`${filterKey}-${id}`}>{type}</Label>
				</span>
				<span>[{count}]</span>
			</div>
		))
	}

	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-xl font-semibold'>{title}</h2>
			{Object.entries(filterOptions).map(([filterKey, options]) => (
				<Accord key={filterKey} title={filterKey}>
					<div className='flex flex-col gap-2 text-[16px]'>
						{renderFilterOptions(options, filterKey)}
						{options.length > 5 && (
							<Button
								variant='ghost'
								onClick={() =>
									setShowMore(prev => ({
										...prev,
										[filterKey]: !prev[filterKey],
									}))
								}
								className='text-xs mt-2'
							>
								{showMore[filterKey] ? 'показать меньше' : 'показать все'}
							</Button>
						)}
					</div>
				</Accord>
			))}
			<div className='flex gap-4 mt-1 ml-3'>
				<Button onClick={applyFilter} className='px-20 py-2 bg-gray'>
					Застосувати
				</Button>
			</div>
		</div>
	)
}
