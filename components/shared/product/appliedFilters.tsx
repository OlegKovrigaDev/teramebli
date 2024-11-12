import { Button } from '@/components/ui'
import { Accord } from '../accord'

interface AppliedFiltersAccordProps {
	minPrice?: number
	maxPrice?: number
	selectedAttributes: Record<string, (string | number)[]>
	onResetFilters: () => void
}

export const AppliedFiltersAccord = ({
	minPrice,
	maxPrice,
	selectedAttributes,
	onResetFilters,
}: AppliedFiltersAccordProps) => {
	return (
		<Accord title='Вы выбрали'>
			<div className='flex flex-col gap-2 text-[16px]'>
				{minPrice !== undefined && maxPrice !== undefined && (
					<div>
						<strong>Цена:</strong> {minPrice} - {maxPrice}
					</div>
				)}
				{Object.entries(selectedAttributes).map(
					([filterKey, selectedValues]) =>
						selectedValues.length > 0 && (
							<div key={filterKey}>
								<strong>{filterKey}:</strong> {selectedValues.join(', ')}
							</div>
						)
				)}
				<Button onClick={onResetFilters} className='mt-2 text-xs'>
					Очистить
				</Button>
			</div>
		</Accord>
	)
}
