import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui'
import { header } from '@/constants'
import { ShoppingCart } from 'lucide-react'

export const Cart = () => {
	return (
		<Dialog>
			<DialogTrigger className='cart-trigger'>
				<ShoppingCart />
				<span className='text'>{header[1].text}</span>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
