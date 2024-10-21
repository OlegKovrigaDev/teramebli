'use client'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import Pagination from '@/components/shared/Pagination'
import { ProductCard } from '@/components/shared/product/ProductCard'
import { ProductFilter } from '@/components/shared/product/ProductFilter'
import { useCategoryData } from '@/hooks'
import { useProductSearch } from '@/hooks/useProductSearch'
import { Product } from '@/types/redux'
import { useSearchParams } from 'next/navigation'
import { title } from 'process'

export default function CategoryId({ params }: { params: { id: string } }) {
	const { id } = params
	const searchParams = useSearchParams()
	const query = searchParams.get('query') || ''

	const isSearchMode = id === '2000'

	const {
		searchResults,
		isLoading: searchLoading,
		error: searchError,
	} = useProductSearch(query)
	if (isSearchMode) {
		if (searchLoading) {
			return <p>Поиск продуктов...</p>
		}
		if (searchError) {
			return <p>Ошибка загрузки продуктов</p>
		}
		return (
			<div className='mb-[75px]'>
				<h2 className='font-bold text-2xl mb-8'>
					Результаты поиска для: {query}
				</h2>
				<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
					<div className='flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]'>
						<ProductFilter title='Фильтр продуктов' />
					</div>

					<div className='flex flex-1 gap-y-8 justify-between flex-wrap max-w-[970px]'>
						{searchResults && searchResults.length > 0 ? (
							searchResults.map((product: Product) => (
								<ProductCard key={product.offerId} product={product} />
							))
						) : (
							<p className='text-gray-500'>
								Нет доступных продуктов для отображения.
							</p>
						)}

						<div className='flex flex-col justify-center w-full'></div>
					</div>
				</div>
			</div>
		)
	}

	const {
		status,
		message,
		category,
		products,
		totalPages,
		currentPage,
		parentCategory,
		setPage,
		isFetching,
	} = useCategoryData(id)

	if (status === 'loading' || status === 'error' || status === 'noData') {
		return (
			<p className={`text-${status === 'error' ? 'red' : 'gray'}-500`}>
				{message}
			</p>
		)
	}

	return (
		<div className='mb-[75px]'>
			<CrumbsLinks
				categoryName={parentCategory ? parentCategory.name : category?.name}
				categoryId={
					parentCategory
						? parentCategory.id.toString()
						: category?.id.toString()
				}
			/>
			{isFetching && <p className='text-gray-400'>Обновление данных...</p>}

			<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
				<div className='flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]'>
					<ProductFilter title='Product Filter' />
				</div>

				<div className='flex flex-1 gap-y-8 justify-between flex-wrap max-w-[970px]'>
					{products && products.length > 0 ? (
						products.map((product: Product) => (
							<ProductCard key={product.offerId} product={product} />
						))
					) : (
						<p className='text-gray-500'>
							Нет доступных продуктов для отображения.
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
