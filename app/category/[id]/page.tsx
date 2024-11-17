'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowDownUp, Filter } from 'lucide-react'

import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import Pagination from '@/components/shared/Pagination'
import { AppliedFiltersAccord } from '@/components/shared/product/appliedFilters'
import { ProductFilter } from '@/components/shared/product/ProductFilter'
import { ProductPriceFilter } from '@/components/shared/product/ProductPriceFilter'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui'

import { useCategoryData } from '@/hooks'
import { useProductFilters } from '@/hooks/product/useProductFilters'
import { Product } from '@/types/redux'
import { ProductCard } from '@/components/shared/product/ProductCart'
import { FilterState } from '@/types'

const PopularFilter = ({ className }: { className?: string }) => (
	<div className={className}>
		{['Від дорогих', 'Від дешевих'].map((text, index) => (
			<Button key={index} variant='outline' className='px-3 py-1 h-7'>
				{text}
			</Button>
		))}
	</div>
)

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
}) => (
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
			title=''
			products={products}
			onFilterChange={handleAttributeFilter}
			onResetFilters={resetFilters}
		/>
	</div>
)

export default function CategoryId({ params }: { params: { id: string } }) {
	const { id } = params
	const router = useRouter()
	const searchParams = useSearchParams()
	const initialPage = parseInt(searchParams.get('page') || '1', 10)

	const [filters, setFilters] = useState<FilterState>({
		minPrice: undefined,
		maxPrice: undefined,
		selectedAttributes: {},
		sortField: undefined,
		sortOrder: 'asc',
		showAppliedFilters: false,
	})

	const {
		status,
		message,
		category,
		products = [],
		totalPages,
		currentPage,
		setPage,
		minMaxPrices,
	} = useCategoryData(id, initialPage)

	const handleApplyPriceFilter = (min: number, max: number) => {
		setFilters(prev => ({
			...prev,
			minPrice: min,
			maxPrice: max,
			showAppliedFilters: true,
		}))
	}

	const handleAttributeFilter = (
		filters: Record<string, (string | number)[]>
	) => {
		setFilters(prev => ({
			...prev,
			selectedAttributes: filters,
			showAppliedFilters: true,
		}))
	}

	const resetFilters = () => {
		setFilters({
			minPrice: undefined,
			maxPrice: undefined,
			selectedAttributes: {},
			sortField: undefined,
			sortOrder: 'asc',
			showAppliedFilters: false,
		})
	}

	const handlePageChange = (page: number) => {
		setPage(page)
		router.push(`/category/${id}?page=${page}`, { scroll: false })
	}

	useEffect(() => {
		const loadPageData = async () => {
			const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
			if (pageFromUrl !== currentPage) {
				setPage(pageFromUrl)
			}
		}
		loadPageData()
	}, [searchParams, currentPage, setPage])

	const filteredAndSortedProducts = useProductFilters(products, {
		minPrice: filters.minPrice,
		maxPrice: filters.maxPrice,
		attributes: filters.selectedAttributes,
		sortField: filters.sortField,
		sortOrder: filters.sortOrder,
	})

	if (status === 'loading' || status === 'error' || status === 'noData') {
		return (
			<p className={`text-${status === 'error' ? 'red' : 'gray'}-500`}>
				{message}
			</p>
		)
	}

	return (
		<div>
			<div className='flex xl:hidden items-center justify-center gap-8 py-4'>
				<Dialog>
					<DialogTrigger className='flex items-center'>
						<Filter />
						Фільтри
					</DialogTrigger>
					<DialogContent className='h-screen p-2 overflow-y-auto'>
						<DialogHeader>
							<DialogTitle></DialogTitle>
						</DialogHeader>
						<Filters
							showAppliedFilters={filters.showAppliedFilters}
							minMaxPrices={minMaxPrices}
							minPrice={filters.minPrice}
							maxPrice={filters.maxPrice}
							selectedAttributes={filters.selectedAttributes}
							products={products}
							handleApplyPriceFilter={handleApplyPriceFilter}
							handleAttributeFilter={handleAttributeFilter}
							resetFilters={resetFilters}
						/>
					</DialogContent>
				</Dialog>

				<p className='flex'>
					<ArrowDownUp />
					Сортування
				</p>
			</div>

			<div className='mb-[75px]'>
				<div className='flex relative'>
					<CrumbsLinks
						categoryName={category?.name}
						categoryId={category?.id.toString()}
						parentCategoryName={category?.parent?.name}
						parentCategoryId={category?.parent?.id?.toString()}
						currentCategoryId={id}
					/>
					<PopularFilter className='absolute right-0 translate-y-full hidden xl:flex gap-4' />
				</div>

				<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
					<Filters
						className='hidden xl:flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]'
						showAppliedFilters={filters.showAppliedFilters}
						minMaxPrices={minMaxPrices}
						minPrice={filters.minPrice}
						maxPrice={filters.maxPrice}
						selectedAttributes={filters.selectedAttributes}
						products={products}
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
		</div>
	)
}
