'use client'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import Pagination from '@/components/shared/Pagination'
import { ProductCard } from '@/components/shared/product/ProductCart'
import { useProductSearch } from '@/hooks/search/useProductSearch'
import { Product } from '@/types/redux'
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
	const searchParams = useSearchParams()
	const query = searchParams.get('search') || ''
	const { searchResults, isLoading, error, totalPages, currentPage, setPage } =
		useProductSearch(query)

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
				categoryId={'2000'}
			/>
			<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
				<div className='flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]' />
				<div className='flex flex-1 gap-y-8 justify-between flex-wrap max-w-[970px]'>
					{searchResults && searchResults.length > 0 ? (
						searchResults.map((product: Product) => (
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
							onPageChange={setPage}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
