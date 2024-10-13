import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui'
import { header } from '@/constants'
import { LayoutDashboard, MenuIcon } from 'lucide-react'
import { Logo } from '../logo'

export const Catalog = () => {
	return (
		<Sheet>
			<SheetTrigger className='menu-trigger'>
				<MenuIcon className='mobile' />
				<LayoutDashboard className='desktop' />
				<span className='text'>{header[0].text}</span>
			</SheetTrigger>
			<SheetContent side={'left'} className='menu-content'>
				<SheetHeader>
					<SheetTitle>
						<Logo />
					</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				{/* Content */}
			</SheetContent>
		</Sheet>
	)
}
