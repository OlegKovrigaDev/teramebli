import { useFetchCategoryWithProductsQuery } from '@/api/categoryApi'
import { useState } from 'react'

const {
	data: categoryData,
	error,
	isLoading,
	isFetching,
} = useFetchCategoryWithProductsQuery(
	{ categoryId: Number(id), page: 1, limit: 1000 },
	{ skip: !id }
)

const useSelectStorage = () => {}
