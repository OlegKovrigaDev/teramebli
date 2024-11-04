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
import { formatPrice } from '@/helpers'
import { selectCartItems, selectCartTotal } from '@/store/selectors'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CartForm } from './cart-form'
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
				<span className='text-[10px] font-medium xl:font-normal xl:text-xs'>
					{header[1].text}
				</span>
			</DialogTrigger>
			<DialogContent className='h-screen min-w-full xl:min-w-[800px] xl:h-auto p-2 xl:p-8'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold text-start'>
						Кошик
					</DialogTitle>
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
						<div className='flex flex-wrap justify-between mb-6 xl:mb-8'>
							<p className='text-xl font-semibold mb-4 xl:mb-0 xl:text-2xl xl:font-bold'>
								Всього: {formatPrice(cartTotal)} грн.
							</p>
							<div className='flex md:justify-between flex-wrap gap-2 w-full xl:w-auto'>
								<Button
									variant='outline'
									className='w-full md:w-[49%] h-11 xl:h-auto border-2 border-gray rounded-xl text-gray'
									onClick={handleClose}
								>
									Продовжити покупки
								</Button>

								<Button
									disabled={cartItems.length === 0}
									className='w-full md:w-[49%] h-11 xl:h-auto bg-gray rounded-xl'
									onClick={handleClose}
								>
									<Link href='/order'>Оформити замовлення</Link>
								</Button>
							</div>
						</div>
						<div className='md:p-4 md:bg-bg rounded'>
							<h3 className='text-xl font-semibold xl:font-bold mb-4'>
								Швидке оформлення замовлення
							</h3>
							<CartForm />
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
