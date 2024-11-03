import { useState, useMemo } from 'react'
import { ProductItem } from '@/types/redux'

interface UseVariantFilterProps {
	variants: ProductItem[]
}

export const useVariantFilter = ({ variants }: UseVariantFilterProps) => {
	const [groupIdFilter, setGroupIdFilter] = useState<string | null>(null)
	const [modelNameFilter, setModelNameFilter] = useState<string | null>(null)

	const filteredVariants = useMemo(() => {
		return variants.filter(variant => {
			const groupMatch = groupIdFilter
				? variant.groupId === groupIdFilter
				: true
			const modelMatch = modelNameFilter
				? variant.ModelName === modelNameFilter
				: true
			return groupMatch && modelMatch
		})
	}, [variants, groupIdFilter, modelNameFilter])

	return {
		filteredVariants,
		groupIdFilter,
		modelNameFilter,
		setGroupIdFilter,
		setModelNameFilter,
	}
}
