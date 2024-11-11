'use client'
import { Button, Input } from '@/components/ui'
import { header } from '@/constants'
import { useProductSearch } from '@/hooks/search/useProductSearch'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const SearchBar = ({
	search: { isMobileSearchVisible, toggleSearchInput, inputRef, handleKeyDown },
}: any) => {
	const router = useRouter()
	const { query, setQuery } = useProductSearch()

	const handleSearch = () => {
		if (query) {
			router.push(`/category/20000?search=${query}`)
		}
	}

	const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<div className='sidebar'>
			<div className='sidebar-container mobile'>
				{isMobileSearchVisible ? (
					<>
						<Input
							ref={inputRef}
							type='text'
							value={query}
							onChange={e => setQuery(e.target.value)}
							onKeyDown={e => {
								handleKeyDown(e)
								handleEnterKeyPress(e)
							}}
							placeholder={header[4].text}
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
					onChange={e => setQuery(e.target.value)}
					onKeyDown={e => {
						handleKeyDown(e)
						handleEnterKeyPress(e)
					}}
					placeholder={header[5].text}
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
			</div>
		</div>
	)
}
