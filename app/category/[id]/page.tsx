'use client'
import CategoryPage from '@/components/CategoryPage'
import SearchPage from '@/components/SearchPage'

export default function CategoryId({ params }: { params: { id: string } }) {
	const { id } = params
	const isSearchMode = id === '20000'

	return isSearchMode ? <SearchPage /> : <CategoryPage id={id} />
}
