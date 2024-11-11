'use client'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import Pagination from '@/components/shared/Pagination'
import { ProductCard } from '@/components/shared/product/ProductCart'
import { ProductFilter } from '@/components/shared/product/ProductFilter'
import { ProductPriceFilter } from '@/components/shared/product/ProductPriceFilter'
import { useCategoryData } from '@/hooks'
import { useProductFilters } from '@/hooks/product/useProductFilters'
import { Product } from '@/types/redux'
import { useState } from 'react'
import { AppliedFiltersAccord } from './appliedFilters'

interface CategoryPageProps {
	id: string
}

export default function CategoryPage({ id }: CategoryPageProps) {
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
	const [selectedAttributes, setSelectedAttributes] = useState<
		Record<string, any>
	>({})
	const [sortField, setSortField] = useState<keyof Product | undefined>(
		undefined
	)
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const [showAppliedFilters, setShowAppliedFilters] = useState(false)

	const handleApplyPriceFilter = (min: number, max: number) => {
		setMinPrice(min)
		setMaxPrice(max)
		setShowAppliedFilters(true)
	}

	const handleAttributeFilter = (
		filters: Record<string, (string | number)[]>
	) => {
		setSelectedAttributes(filters)
		setShowAppliedFilters(true)
	}

	const resetFilters = () => {
		setMinPrice(undefined)
		setMaxPrice(undefined)
		setSelectedAttributes({})
		setSortField(undefined)
		setSortOrder('asc')
		setShowAppliedFilters(false)
	}

	const {
		status,
		message,
		category,
		products = [],
		totalPages,
		currentPage,
		subcategories,
		setPage,
		minMaxPrices,
	} = useCategoryData(id)

	const filteredAndSortedProducts = useProductFilters(products, {
		minPrice,
		maxPrice,
		attributes: selectedAttributes,
		sortField,
		sortOrder,
	})

	if (status === 'loading' || status === 'error' || status === 'noData') {
		return (
			<p className={`text-${status === 'error' ? 'red' : 'gray'}-500`}>
				{message}
			</p>
		)
	}

	const selectedSubcategory = subcategories?.find(
		sub => sub.id.toString() === id
	)

	return (
		<div className='mb-[75px]'>
			<CrumbsLinks
				categoryName={category?.name}
				categoryId={category?.id.toString()}
				subcategoryName={
					selectedSubcategory ? selectedSubcategory.name : undefined
				}
				subcategoryId={
					selectedSubcategory ? selectedSubcategory.id.toString() : undefined
				}
			/>

			<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
				<div className='flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]'>
					{showAppliedFilters && (
						<AppliedFiltersAccord
							minPrice={minPrice}
							maxPrice={maxPrice}
							selectedAttributes={selectedAttributes}
							onResetFilters={resetFilters}
						/>
					)}
					{minMaxPrices && (
						<ProductPriceFilter
							title='Ціна'
							onApplyPriceFilter={handleApplyPriceFilter}
							minPrice={minMaxPrices.minPrice}
							maxPrice={minMaxPrices.maxPrice}
						/>
					)}
					<ProductFilter
						title='Фільтри продуктів'
						products={products}
						onFilterChange={handleAttributeFilter}
						onResetFilters={resetFilters}
					/>
				</div>

				<div className='flex flex-1 gap-y-8 justify-between flex-wrap max-w-[970px]'>
					{filteredAndSortedProducts.length > 0 ? (
						filteredAndSortedProducts.map((product: Product) => (
							<ProductCard key={product.offerId} product={product} />
						))
					) : (
						<p className='text-gray-500'>
							Немає доступних продуктів для відображення.
						</p>
					)}

					<div className='flex flex-col justify-center w-full'>
						<Pagination
							currentPage={currentPage ?? 1}
							totalPages={totalPages ?? 1}
							onPageChange={setPage}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
