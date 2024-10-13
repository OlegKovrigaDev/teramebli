'use client'

import { useSearch } from '@/hooks'
import { Logo } from '../logo'
import { Cart } from './cart'
import { Catalog } from './catalog'
import { Contact } from './contact'
import { Lang } from './lang'
import { Magazins } from './magazins'
import { SearchBar } from './search-bar'

export const Header = () => {
	const search = useSearch()
	return (
		<header className='header'>
			<div className='header-desktop'>
				<div className='left'>
					<Logo />
					<Catalog />
					<Magazins />
				</div>
				<SearchBar search={search} />
				<div className='right'>
					<Contact />
					<Lang />
					<Cart />
				</div>
			</div>
			<div className='header-mobile'>
				{!search.isSearchVisible && (
					<>
						<Logo />
						<Lang />
					</>
				)}
				<div className='right'>
					<SearchBar search={search} />
					{!search.isSearchVisible && (
						<>
							<Cart />
							<Catalog />
						</>
					)}
				</div>
			</div>
		</header>
	)
}
