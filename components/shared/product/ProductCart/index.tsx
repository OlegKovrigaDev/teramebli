'use client'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { addToCart } from '@/store/cartSlice'
import { selectCartItems } from '@/store/selectors'
import { Product } from '@/types/redux'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import css from './ProductCart.module.css'
import { RootState } from '@/store'
import { formatPrice } from '@/helpers'
// import { useFetchImages } from '@/hooks/useFetchImages'

export interface ProductCardProps {
	product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
	// const { img } = useFetchImages(product.offerId)
	const selectedStorage = useSelector(
		(state: RootState) => state.selectedStorage.storage
	)
	const currentParams = product[selectedStorage]
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const cartItem = cartItems.find(item => item.offerId === product.offerId)
	const isInCart = Boolean(cartItem)
	const isAvailable = currentParams?.['Кількість на складі'] > 0

	if (!product || !product.offerId) {
		return <p>Product data is unavailable.</p>
	}

	const handleAddToCart = () => {
		const cartItem = {
			offerId: product.offerId,
			ModelName: currentParams?.['Назва товару'] || currentParams?.ModelName,
			Articul: currentParams?.Articul,
			RetailPrice: currentParams?.RetailPrice,
			RetailPriceWithDiscount:
				currentParams?.RetailPriceWithDiscount || currentParams?.RetailPrice,
			currencyId: product.currencyId,
			quantity: 1,
		}
		dispatch(addToCart(cartItem))
	}

	const discountPercentage =
		currentParams?.RetailPrice && currentParams?.RetailPriceWithDiscount
			? ((currentParams.RetailPrice - currentParams.RetailPriceWithDiscount) /
					currentParams.RetailPrice) *
			  100
			: 0

	return (
		<Card className={css.card}>
			<Link
				key={product.offerId}
				href={`/product/${product.offerId}`}
				className='h-full'
			>
				<CardHeader className='p-0'>
					<div className='relative'>
						<Badge className={css.action}>Акція</Badge>
						<Badge className={css.hit}>Хіт</Badge>
						<div className={css.container}>
							{/* <img
								src={`data:image/jpeg;base64,${img.buffer}`}
								alt={currentParams?.['Назва товару']}
								className='rounded-lg size-[217px] object-cover'
							/> */}
						</div>
					</div>
					<CardTitle className={css.title}>
						{currentParams?.['Назва товару'] || currentParams?.ModelName}
					</CardTitle>
				</CardHeader>
				<CardContent className={css.content}>
					<p className={isAvailable ? css.instock : css.outOfStock}>
						{isAvailable ? '● В наявності' : '○ Немає в наявності'}
					</p>
					{currentParams?.Articul && (
						<p className={css.code}>Код товару: {currentParams.Articul}</p>
					)}
				</CardContent>
				<CardFooter className={css.footer}>
					{discountPercentage > 0 && (
						<div className='flex gap-2'>
							<p className={css.discount}>
								{formatPrice(currentParams?.RetailPrice)} грн.
							</p>
							<Badge className='rounded-lg bg-red-800 hover:bg-red-800'>
								- {discountPercentage.toFixed(0)}%
							</Badge>
						</div>
					)}
					<p
						className={`${css.price} ${
							discountPercentage > 0 ? 'text-red-800 font-bold text-xl' : ''
						} text-xl font-bold`}
					>
						{formatPrice(currentParams?.RetailPriceWithDiscount)} грн.
					</p>
				</CardFooter>
			</Link>
			<Button
				variant='ghost'
				size='icon'
				className={`${css.cart} relative transition-transform duration-200 ease-in-out`}
				onClick={handleAddToCart}
			>
				<ShoppingCart
					className={`w-6 h-6 ${
						isInCart ? 'text-[#16a34a]' : 'text-black'
					} transition-transform duration-200 ease-in-out ${
						!isInCart && 'hover:scale-125 hover:text-[#16a34a]'
					}`}
				/>
				{cartItem && (
					<p className='absolute left-0 -top-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full grid place-content-center'>
						{cartItem.quantity}
					</p>
				)}
			</Button>
		</Card>
	)
}
