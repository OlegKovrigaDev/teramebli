import { useEffect, useRef, useState } from 'react'

export const useSearch = () => {
	const [query, setQuery] = useState('')
	const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const [isSearchVisible, setIsSearchVisible] = useState(false)

	const handleSearch = () => {
		if (query.trim()) {
			console.log('Searching for:', query)
			setIsMobileSearchVisible(false)
			setIsSearchVisible(false)
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch()
		}
	}

	const toggleSearchInput = () => {
		const nextVisibility = !isMobileSearchVisible
		setIsMobileSearchVisible(nextVisibility)
		setIsSearchVisible(nextVisibility)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setIsMobileSearchVisible(false)
				setIsSearchVisible(false)
			}
		}

		if (isMobileSearchVisible) {
			document.addEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isMobileSearchVisible])

	return {
		query,
		setQuery,
		isMobileSearchVisible,
		toggleSearchInput,
		handleSearch,
		handleKeyDown,
		inputRef,
		isSearchVisible,
	}
}
