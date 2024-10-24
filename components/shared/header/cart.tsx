'use client'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui'
import { header } from '@/constants'
import { selectCartItems, selectCartTotal } from '@/store/selectors'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CartProduct } from './cart-product'

export const Cart = () => {
	const cartItems = useSelector(selectCartItems)
	const cartTotal = useSelector(selectCartTotal)
	const [open, setOpen] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className='relative cart-trigger' aria-label='Open cart'>
				<ShoppingCart />
				{isMounted && cartItems.length > 0 && (
					<span className='absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full'>
						{cartItems.length}
					</span>
				)}
				<span className='text'>{header[1].text}</span>
			</DialogTrigger>
			<DialogContent className='min-w-[800px] p-8'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold'>Кошик</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<div className='mb-10 max-h-[549px] overflow-auto'>
					{cartItems.length > 0 ? (
						cartItems.map(item => (
							<CartProduct key={item.offerId} product={item} />
						))
					) : (
						<p>Кошик порожній</p>
					)}
				</div>
				<DialogFooter>
					<div className='flex flex-col w-full'>
						<div className='flex justify-between mb-8'>
							<p className='text-2xl font-bold'>Всього: {cartTotal} грн.</p>
							<div className='flex gap-2'>
								<Button
									variant='outline'
									className='border-2 border-gray rounded-xl text-gray'
									onClick={handleClose}
								>
									Продовжити покупки
								</Button>

								<Link href='/order' passHref>
									<Button
										disabled={cartItems.length === 0}
										className='bg-gray rounded-xl'
										onClick={handleClose}
									>
										Оформити замовлення
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
