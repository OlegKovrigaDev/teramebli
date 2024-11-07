'use client'

import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui'
import { useSearch } from '@/hooks'
import { Headset, Menu } from 'lucide-react'
import { Logo } from '../logo'
import { Cart } from './cart'
import { Catalog } from './catalog'
import { Contact } from './contact'
import { Lang } from './lang'
import { Magazins } from './magazins'
import { SearchBar } from './search-bar'
import { useTranslation } from 'react-i18next'

export const Header = () => {
	const search = useSearch()
	const { t } = useTranslation()

	return (
		<header className='header'>
			<div className='header-desktop'>
				<div className='left'>
					<Logo />
					<div className='hidden xl:flex'>
						<Catalog />
						<Magazins />
					</div>
				</div>
				<SearchBar search={search} />
				<div className='right'>
					<Contact />
					<Lang />
					<Sheet>
						<SheetTrigger className='flex xl:hidden flex-col items-center justify-center'>
							<Menu />
							<span className='text-[10px] font-medium'>Інше</span>
						</SheetTrigger>
						<SheetContent className='bg-accent'>
							<SheetHeader>
								<SheetTitle></SheetTitle>
								<SheetDescription></SheetDescription>
								<div className='border-b border-black flex justify-center'>
									<Button variant='ghost' className='text-[14px] font-bold'>
										UA
									</Button>
									<Button variant='ghost' className='text-[14px] font-bold'>
										RU
									</Button>
								</div>
								<div className='flex py-6'>
									<Headset />
									<div>
										<p className='text-[14px] font-bold'>095-12-77-63</p>
										<p className='text-[10px] font-semibold'>
											Контактні телефони
										</p>
									</div>
								</div>
								<ul className='flex flex-col items-start text-[14px]'>
									<li>
										<Catalog />
									</li>
									<li>
										<Magazins />
									</li>
									<li>
										<a href='/about'>Про нас</a>
									</li>
									<li>
										<a href='/about'>Контакти</a>
									</li>
									<li>
										<a href='/delivery'>Доставка і Оплата</a>
									</li>
									<li>
										<a href='/warranty'>Гарантія та Повернення</a>
									</li>
								</ul>
							</SheetHeader>
						</SheetContent>
					</Sheet>
					<Cart />
				</div>
			</div>
			<div className='header-mobile'>
				{!search.isSearchVisible && <Logo />}
				<SearchBar search={search} />
			</div>
		</header>
	)
}
