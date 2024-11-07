'use client'
import { Button } from '@/components/ui'
import { formatPrice } from '@/helpers'
import { useFetchImages } from '@/hooks/useFetchImages'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'
import { CartItem } from '@/types/cart'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch } from 'react-redux'

export const CartProduct = ({ product }: { product: CartItem }) => {
	const { img } = useFetchImages(product.offerId)
	const dispatch = useDispatch()

	const handleIncrease = () => {
		dispatch(
			updateQuantity({
				offerId: product.offerId,
				quantity: product.quantity + 1,
			})
		)
	}

	const handleDecrease = () => {
		if (product.quantity > 1) {
			dispatch(
				updateQuantity({
					offerId: product.offerId,
					quantity: product.quantity - 1,
				})
			)
		}
	}

	const handleRemove = () => {
		dispatch(removeFromCart(product.offerId))
	}

	return (
		<div className='flex gap-2 border-b border-gray/20 py-4 relative'>
			{/* <img
				src={`data:image/jpeg;base64,${img.buffer}`}
				alt={product?.ModelName}
				width={150}
				height={150}
				className='rounded-lg object-cover'
			/> */}
			<div className='rounded-lg size-16 md:size-[150px] bg-accent' />
			<div className='flex flex-col gap-2 xl:justify-between'>
				<h3 className='font-medium max-w-60 md:min-w-max'>
					{product?.['Назва товару'] || product?.ModelName}
				</h3>
				{product?.RetailPriceWithDiscount === product?.RetailPrice ? (
					<p className=' text-4.5 font-semibold'>
						{formatPrice(product?.RetailPrice)} грн.
					</p>
				) : (
					<>
						<p className='text-red-900 text-[20px] font-semibold'>
							{formatPrice(product?.RetailPriceWithDiscount)} грн.
						</p>
						<p className='line-through text-4.5 font-bold'>
							{formatPrice(product?.RetailPrice)} грн.
						</p>
					</>
				)}

				<div className='flex relative left-[-70px] md:static'>
					<Button
						className='w-12 h-8 bg-gray/20 text-black hover:text-white rounded-e-none rounded-s'
						onClick={handleDecrease}
					>
						<Minus size={24} />
					</Button>
					<div className='w-10 h-8 text-4.5 font-semibold border-t border-b border-gray/20 bg-bg flex center'>
						{product.quantity}
					</div>
					<Button
						className='w-12 h-8 bg-gray/20 text-black hover:text-white rounded-s-none rounded-e'
						onClick={handleIncrease}
					>
						<Plus size={24} />
					</Button>
					<p className='absolute right-0 text-gray/80 text-xs hidden xl:block'>
						Код товару: {product?.Articul}
					</p>
				</div>
			</div>
			<Button
				variant='ghost'
				size='icon'
				className='absolute right-0'
				onClick={handleRemove}
			>
				<Trash size={24} className='text-red-900' />
			</Button>
		</div>
	)
}
