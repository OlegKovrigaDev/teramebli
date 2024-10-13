import { Button, Input } from '@/components/ui'
import { header } from '@/constants'
import { SearchProps } from '@/types'
import { Search } from 'lucide-react'

export const SearchBar = ({
	search: {
		isMobileSearchVisible,
		toggleSearchInput,
		query,
		setQuery,
		inputRef,
		handleSearch,
		handleKeyDown,
	},
}: SearchProps) => {
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
							onKeyDown={handleKeyDown}
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
					onKeyDown={handleKeyDown}
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
			</div>
		</div>
	)
}
