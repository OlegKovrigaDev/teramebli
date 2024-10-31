'use client'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui'
import { Home, Menu } from 'lucide-react'
import Link from 'next/link'
import { Cart } from '../cart'
import { Catalog } from '../catalog'
import { Magazins } from '../magazins'

export const MobileMenu = () => {
	return (
		<div className='sticky bottom-0 bg-accent py-2 px-4 text-[10px] font-medium md:hidden'>
			<div className='min-w-[325px] flex justify-between'>
				<Link href='/' className='flex flex-col items-center'>
					<Home />
					<span className='text'>Головная</span>
				</Link>
				<Catalog />
				<Magazins />
				<Cart />
				<Sheet>
					<SheetTrigger className='flex flex-col items-center'>
						<Menu />
						<span className='text'>Головная</span>
					</SheetTrigger>
					<SheetContent className='bg-accent p-0 w-[315px]'>
						<SheetHeader>
							<SheetTitle></SheetTitle>
							<SheetDescription></SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}
