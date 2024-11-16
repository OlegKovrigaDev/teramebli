'use client'

import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import Pagination from '@/components/shared/Pagination'
import { AppliedFiltersAccord } from '@/components/shared/product/appliedFilters'
import { ProductCard } from '@/components/shared/product/ProductCart'
import { ProductFilter } from '@/components/shared/product/ProductFilter'
import { ProductPriceFilter } from '@/components/shared/product/ProductPriceFilter'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui'
import { useCategoryData } from '@/hooks'
import { useProductFilters } from '@/hooks/product/useProductFilters'
import { Product } from '@/types/redux'
import { ArrowDownUp, Filter } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
	const initialPage = parseInt(searchParams.get('page') || '1', 12)

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
	} = useCategoryData(id, initialPage)

	console.log('Category Data:', category)
	console.log('Products:', products)
	console.log('Total Pages:', totalPages)
	console.log('Current Page:', currentPage)
	console.log('MinMax Prices:', minMaxPrices)

	const handlePageChange = (page: number) => {
		setPage(page)
		router.push(`/category/${id}?page=${page}`, { scroll: false })
	}

	useEffect(() => {
		const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
		if (pageFromUrl !== currentPage) {
			setPage(pageFromUrl)
		}
	}, [searchParams, currentPage, setPage])

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
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<Filters
							showAppliedFilters={showAppliedFilters}
							minMaxPrices={minMaxPrices}
							minPrice={minPrice}
							maxPrice={maxPrice}
							selectedAttributes={selectedAttributes}
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
					/>

					<PopularFilter className='absolute right-0 translate-y-full hidden xl:flex gap-4' />
				</div>

				<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
					<Filters
						className='hidden xl:flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]'
						showAppliedFilters={showAppliedFilters}
						minMaxPrices={minMaxPrices}
						minPrice={minPrice}
						maxPrice={maxPrice}
						selectedAttributes={selectedAttributes}
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
