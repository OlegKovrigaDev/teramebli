'use client'
import { Button } from '@/components/ui'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Headset, Home, Menu } from 'lucide-react'
import Link from 'next/link'
import { Cart } from './cart'
import { Catalog } from './catalog'
import { Magazins } from './magazins'

export const MobileMenu = () => {
	return (
		<div className='sticky bottom-0 bg-accent py-2 px-4 block sm:hidden'>
			<div className='flex justify-between'>
				<Link href='/' className='flex flex-col items-center justify-center'>
					<Home />
					<span className='text-[10px] font-medium'>Головна</span>
				</Link>
				<Magazins />
				<Catalog />
				<Cart />
				<Sheet>
					<SheetTrigger className='flex flex-col items-center justify-center'>
						<Menu />
						<span className='text-[10px] font-medium'>Інше</span>
					</SheetTrigger>
					<SheetContent className='bg-accent'>
						<SheetHeader>
							<SheetTitle></SheetTitle>
							<SheetDescription></SheetDescription>
							<div className='border-b border-black'>
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
							<ul className='flex flex-col items-start text-[14px] font-bold'>
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
			</div>
		</div>
	)
}
