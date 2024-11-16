'use client'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import Pagination from '@/components/shared/Pagination'
import { AppliedFiltersAccord } from '@/components/shared/product/appliedFilters'
import { ProductCard } from '@/components/shared/product/ProductCart'
import { ProductFilter } from '@/components/shared/product/ProductFilter'
import { ProductPriceFilter } from '@/components/shared/product/ProductPriceFilter'
import { useProductSearch } from '@/hooks/search/useProductSearch'
import { useProductFilters } from '@/hooks/product/useProductFilters'
import { useSearchParams, useRouter } from 'next/navigation'
import { Product } from '@/types/redux'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui'

const PopularFilter = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			{[{ text: 'Від дорогих' }, { text: 'Від дешевих' }].map((item, index) => (
				<Button key={index} variant='outline' className='px-3 py-1 h-7'>
					{item.text}
				</Button>
			))}
		</div>
	)
}

const Filters = ({
	showAppliedFilters,
	minMaxPrices,
	minPrice,
	maxPrice,
	selectedAttributes,
	products,
	handleApplyPriceFilter,
	handleAttributeFilter,
	resetFilters,
	className,
}: {
	showAppliedFilters: boolean
	minMaxPrices: { minPrice: number; maxPrice: number } | undefined
	minPrice: number | undefined
	maxPrice: number | undefined
	selectedAttributes: Record<string, any>
	products: Product[]
	handleApplyPriceFilter: (min: number, max: number) => void
	handleAttributeFilter: (filters: Record<string, (string | number)[]>) => void
	resetFilters: () => void
	className?: string
}): JSX.Element => (
	<div className={className}>
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
			title='Фільтри'
			products={products}
			onFilterChange={handleAttributeFilter}
			onResetFilters={resetFilters}
		/>
	</div>
)

export default function SearchPage() {
	const searchParams = useSearchParams()
	const query = searchParams.get('search') || ''
	const router = useRouter()

	const { searchResults, isLoading, error, totalPages, currentPage, setPage } =
		useProductSearch(query)

	const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
	const [selectedAttributes, setSelectedAttributes] = useState<{}>({})
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
		const params = new URLSearchParams(window.location.search)
		params.set('page', page.toString())
		router.push(`/search?${params.toString()}`)
		setPage(page)
	}

	if (isLoading) {
		return <p>Пошук продуктів...</p>
	}

	if (error) {
		return <p>Помилка загрузки продуктів</p>
	}

	return (
		<div className='mb-[75px]'>
			<div className='flex relative'>
				<CrumbsLinks
					customBreadcrumb={[{ name: `Результати пошуку: ${query}` }]}
				/>
				<PopularFilter className='absolute right-0 translate-y-full hidden xl:flex gap-4' />
			</div>
			<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
				<Filters
					className='flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]'
					showAppliedFilters={showAppliedFilters}
					minMaxPrices={minMaxPrices}
					minPrice={minPrice}
					maxPrice={maxPrice}
					selectedAttributes={selectedAttributes}
					products={searchResults ?? []}
					handleApplyPriceFilter={handleApplyPriceFilter}
					handleAttributeFilter={handleAttributeFilter}
					resetFilters={resetFilters}
				/>

				<div className='flex flex-1 gap-y-8 justify-between flex-wrap h-[max-content] max-w-[970px]'>
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
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
