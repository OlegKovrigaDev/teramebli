import { useMemo, useState, useEffect } from 'react'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import Pagination from '@/components/shared/Pagination'
import { ProductCard } from '@/components/shared/product/ProductCart'
import { ProductFilter } from '@/components/shared/product/ProductFilter'
import { ProductPriceFilter } from '@/components/shared/product/ProductPriceFilter'
import { useProductSearch } from '@/hooks/search/useProductSearch'
import { useProductFilters } from '@/hooks/product/useProductFilters'
import { Product } from '@/types/redux'
import { useSearchParams, useRouter } from 'next/navigation'
import { AppliedFiltersAccord } from '@/components/shared/product/appliedFilters'

export default function SearchPage() {
	const searchParams = useSearchParams()
	const query = searchParams.get('search') || ''
	const router = useRouter()

	const { searchResults, isLoading, error, totalPages, currentPage, setPage } =
		useProductSearch(query)

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

	const minMaxPrices = useMemo(() => {
		if (!searchResults || searchResults.length === 0) {
			return { minPrice: 0, maxPrice: 100000 }
		}
		const prices = searchResults.map(
			product => product.currentParams?.RetailPrice || 0
		)
		return {
			minPrice: Math.min(...prices),
			maxPrice: Math.max(...prices),
		}
	}, [searchResults])

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

	const filteredAndSortedProducts = useProductFilters(searchResults ?? [], {
		minPrice,
		maxPrice,
		attributes: selectedAttributes,
		sortField,
		sortOrder,
	})

	const handlePageChange = (page: number) => {
		setPage(page)
		router.push(`/category/20000?search=${query}&page=${page}`)
	}

	if (isLoading) {
		return <p>Пошук продуктів...</p>
	}

	if (error) {
		return <p>Помилка загрузки продуктів</p>
	}

	return (
		<div className='mb-[75px]'>
			<CrumbsLinks
				categoryName={`Результати пошуку: ${query}`}
				categoryId={'20000'}
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
						title=''
						products={searchResults ?? []}
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
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
