import { Button, Input } from '@/components/ui'
import { useProductSearch } from '@/hooks/search/useProductSearch'
import { Search, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export const SearchBar = ({
	search: { isMobileSearchVisible, toggleSearchInput, inputRef, handleKeyDown },
}: any) => {
	const router = useRouter()
	const { query, setQuery } = useProductSearch()

	const [suggestions, setSuggestions] = useState<string[]>([])
	const [savedQueries, setSavedQueries] = useState<string[]>([])

	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem('searchQueries') || '[]')
		setSavedQueries(saved)
	}, [])

	const saveQuery = (newQuery: string) => {
		let updatedQueries = Array.from(new Set([newQuery, ...savedQueries]))
		if (updatedQueries.length > 10) {
			updatedQueries = updatedQueries.slice(0, 10)
		}
		localStorage.setItem('searchQueries', JSON.stringify(updatedQueries))
		setSavedQueries(updatedQueries)
	}

	const handleInputChange = (value: string) => {
		setQuery(value)
		if (value) {
			const filteredSuggestions = savedQueries.filter(q =>
				q.toLowerCase().includes(value.toLowerCase())
			)
			setSuggestions(filteredSuggestions)
		} else {
			setSuggestions([])
		}
	}

	const handleSearch = () => {
		if (query) {
			saveQuery(query)
			const url = `/search?search=${query}&page=1`
			router.push(url)
			setSuggestions([])
		}
	}

	const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	const selectSuggestion = (suggestion: string) => {
		setQuery(suggestion)
		setSuggestions([])
	}

	const clearSavedQueries = () => {
		localStorage.removeItem('searchQueries')
		setSavedQueries([])
		setSuggestions([])
	}

	return (
		<div className='sidebar relative'>
			<div className='sidebar-container mobile'>
				{isMobileSearchVisible ? (
					<>
						<Input
							ref={inputRef}
							type='text'
							value={query}
							onChange={e => handleInputChange(e.target.value)}
							onKeyDown={e => {
								handleKeyDown(e)
								handleEnterKeyPress(e)
							}}
							placeholder='Search products'
							autoFocus
							className='sidebar-input'
						/>
						<Button
							variant='ghost'
							size='icon'
							className='sidebar-button'
							onClick={handleSearch}
						>
							<Search />
						</Button>

						{suggestions.length > 0 && (
							<div className='absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
								{suggestions.map((suggestion, index) => (
									<div
										key={index}
										className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
										onClick={() => selectSuggestion(suggestion)}
									>
										{suggestion}
									</div>
								))}
								{savedQueries.length > 10 && (
									<div
										className='px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer flex items-center gap-2'
										onClick={clearSavedQueries}
									>
										<XCircle className='w-5 h-5' />
										<span>Очистить историю поиска</span>
									</div>
								)}
							</div>
						)}
					</>
				) : (
					<Button
						variant='ghost'
						size='icon'
						className='sidebar-button'
						onClick={toggleSearchInput}
					>
						<Search />
					</Button>
				)}
			</div>

			<div className='sidebar-container desktop'>
				<Input
					ref={inputRef}
					type='text'
					value={query}
					onChange={e => handleInputChange(e.target.value)}
					onKeyDown={e => {
						handleKeyDown(e)
						handleEnterKeyPress(e)
					}}
					placeholder='Search products'
					autoFocus
					className='sidebar-input'
				/>
				<Button
					variant='ghost'
					size='icon'
					className='sidebar-button'
					onClick={handleSearch}
				>
					<Search />
				</Button>

				{suggestions.length > 0 && (
					<div className='absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
						{suggestions.map((suggestion, index) => (
							<div
								key={index}
								className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
								onClick={() => selectSuggestion(suggestion)}
							>
								{suggestion}
							</div>
						))}
						{savedQueries.length > 10 && (
							<div
								className='px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer flex items-center gap-2'
								onClick={clearSavedQueries}
							>
								<XCircle className='w-5 h-5' />
								<span>Очистить историю поиска</span>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
