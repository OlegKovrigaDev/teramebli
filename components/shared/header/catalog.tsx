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

export const Catalog = () => {
	const currentLanguage = 'UA'

	const handleSelectCategory = (categoryId: number) => {
		console.log(`Selected Category ID: ${categoryId}`)
	}

	return (
		<Sheet>
			<SheetTrigger className='menu-trigger'>
				<LayoutDashboard />
				<span className='text'>{header[0].text}</span>
			</SheetTrigger>
			<SheetContent side={'left'} className='menu-content'>
				<SheetHeader>
					<SheetTitle>
						<Logo />
					</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<CatalogCategories
					onSelectCategory={handleSelectCategory}
					currentLanguage={currentLanguage}
				/>
			</SheetContent>
		</Sheet>
	)
}
