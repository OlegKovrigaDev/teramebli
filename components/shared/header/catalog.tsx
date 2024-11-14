import { CatalogCategories } from '@/components/CatalogCategories'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui'
import { header } from '@/constants'
import { LayoutDashboard } from 'lucide-react'
import { Logo } from '../logo'
import { SheetClose } from '@/components/ui/sheet'

export const Catalog = () => {
	const currentLanguage = 'UA'

	const handleSelectCategory = (categoryId: number) => {
		console.log(`Selected Category ID: ${categoryId}`)
	}

	const closeSheet = () => {
		const sheetElement = document.querySelector(
			'[data-state="open"]'
		) as HTMLElement | null
		sheetElement?.click()
	}

	return (
		<Sheet>
			<SheetTrigger className='menu-trigger'>
				<LayoutDashboard className='flex md:hidden xl:flex' />
				<span className='text'>{header[0].text}</span>
			</SheetTrigger>
			<SheetContent side={'left'} className='menu-content'>
				<SheetHeader>
					<SheetTitle>
						<Logo />
					</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<SheetClose asChild>
					<CatalogCategories
						onSelectCategory={categoryId => handleSelectCategory(categoryId)}
						currentLanguage={currentLanguage}
						closeSheet={closeSheet}
					/>
				</SheetClose>
			</SheetContent>
		</Sheet>
	)
}
