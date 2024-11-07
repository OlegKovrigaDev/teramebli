import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
	useFetchCategoriesQuery,
	useFetchSubcategoriesQuery,
} from '@/api/categoryApi'
import { Skeleton } from './ui/skeleton'

interface CategoriesProps {
	onSelectCategory: (categoryId: number) => void
	currentLanguage: 'UA' | 'RU'
}

export const CatalogCategories = ({ currentLanguage }: CategoriesProps) => {
	const {
		data: categories,
		error: categoriesError,
		isLoading: categoriesLoading,
	} = useFetchCategoriesQuery()

	const [expandedCategories, setExpandedCategories] = useState<number[]>([])

	const handleToggle = (categoryId: number) => {
		setExpandedCategories(prev =>
			prev.includes(categoryId)
				? prev.filter(id => id !== categoryId)
				: [...prev, categoryId]
		)
	}

	const renderErrorMessage = (error: any) => {
		return (
			<p className='text-red-500'>
				Ошибка при загрузке категорий:{' '}
				{typeof error === 'object' && 'data' in error
					? String(error.data)
					: String(error)}
			</p>
		)
	}

	return (
		<div className='p-4'>
			{categoriesLoading ? (
				<ul className='w-full max-w-full max-h-[80vh] overflow-y-scroll font-medium flex-col gap-4 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent'>
					{Array.from({ length: 10 }).map((_, index) => (
						<li key={index} className='flex items-center gap-2 p-2'>
							<Skeleton className='size-6' />
							<Skeleton className='h-6 w-full' />
						</li>
					))}
				</ul>
			) : categoriesError ? (
				renderErrorMessage(categoriesError)
			) : (
				<ul className='flex flex-col gap-4 max-h-[80vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent'>
					{categories?.map(category => {
						const [uaName, ruName] = category.name.split('_')

						return (
							<li key={category.id} className='flex flex-col'>
								<div
									onClick={() => handleToggle(category.id)}
									className='flex items-center gap-2 p-2 bg-white rounded-md shadow hover:bg-gray-100 transition cursor-pointer'
								>
									<Link href={`/category/${category.id}`}>
										<p className='text-base font-medium'>
											{currentLanguage === 'UA' ? uaName : ruName}
										</p>
									</Link>
									<button className='ml-auto text-sm text-gray-600 hover:text-gray-800 focus:outline-none'>
										{expandedCategories.includes(category.id) ? (
											<ChevronUp className='size-4' />
										) : (
											<ChevronDown className='size-4' />
										)}
									</button>
								</div>
								{expandedCategories.includes(category.id) && (
									<Subcategories
										parentId={category.id}
										currentLanguage={currentLanguage}
									/>
								)}
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

const Subcategories = ({
	parentId,
	currentLanguage,
}: {
	parentId: number
	currentLanguage: 'UA' | 'RU'
}) => {
	const {
		data: subcategories,
		error: subcategoriesError,
		isLoading: subcategoriesLoading,
	} = useFetchSubcategoriesQuery(parentId)

	const renderErrorMessage = (error: any) => {
		return (
			<p className='text-red-500'>
				Ошибка при загрузке подкатегорий:{' '}
				{typeof error === 'object' && 'data' in error
					? String(error.data)
					: String(error)}
			</p>
		)
	}

	return (
		<div className='ml-4'>
			{subcategoriesLoading ? (
				<ul className='w-full max-w-full max-h-[80vh] overflow-y-scroll font-medium flex-col gap-4 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent'>
					{Array.from({ length: 5 }).map((_, index) => (
						<li key={index} className='flex items-center gap-2 p-2'>
							<Skeleton className='size-6' />
							<Skeleton className='h-6 w-full' />
						</li>
					))}
				</ul>
			) : subcategoriesError ? (
				renderErrorMessage(subcategoriesError)
			) : (
				<ul className='flex flex-col gap-2 ml-4'>
					{subcategories?.map(sub => {
						const [uaName, ruName] = sub.name.split('_')

						return (
							<li key={sub.id}>
								<Link href={`/category/${sub.id}`}>
									<div className='flex items-center gap-2 p-2 bg-white rounded-md shadow hover:bg-gray-100 transition cursor-pointer'>
										<p className='text-base font-medium'>
											{currentLanguage === 'UA' ? uaName : ruName}
										</p>
									</div>
								</Link>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
