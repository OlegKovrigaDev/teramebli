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
	{
		cartItem?.quantity ?? (0 && cartItem?.quantity)
	}

	const isInCart = cartItems.some(item => item.offerId === product.offerId)
	if (!product || !product.offerId) {
		return <p>Product data is unavailable.</p>
	}

	const handleAddToCart = () => {
		const cartItem = {
			offerId: product.offerId,
			ModelName: currentParams.ModelName,
			Articul: currentParams.Articul,
			RetailPrice: currentParams.RetailPrice,
			RetailPriceWithDiscount:
				currentParams.RetailPriceWithDiscount || currentParams.RetailPrice,
			currencyId: product.currencyId,
			quantity: 1,
		}

		dispatch(addToCart(cartItem))
	}

	const isAvailable = currentParams['Кількість на складі'] > 0

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
							{/* {img ? (
								<img
									src={`data:image/jpeg;base64,${img.buffer}`}
									alt={currentParams.ModelName}
									className='rounded-lg size-[217px] object-cover'
								/>
							) : (
								<img
									src='/delete/404.jpg'
									alt='No Image Available'
									className='rounded-lg h-[217px] w-[217px]'
								/>
							)} */}
						</div>
					</div>
					<CardTitle className={css.title}>{currentParams.ModelName}</CardTitle>
				</CardHeader>
				<CardContent className={css.content}>
					<p className={css.instock}>
						{isAvailable ? '● В наявності' : '○ Немає в наявності'}
					</p>
					{currentParams.Articul && (
						<p className={css.code}>Код товару: {currentParams.Articul}</p>
					)}
				</CardContent>
				<CardFooter className={css.footer}>
					{currentParams.RetailPrice !==
						currentParams.RetailPriceWithDiscount && (
						<div className='flex gap-2'>
							<p className={css.discont}>
								{currentParams.RetailPriceWithDiscount} грн.
							</p>
							<Badge className='rounded-lg bg-red-800 hover:bg-red-800'>
								-
								{(
									(((currentParams.RetailPrice as any) -
										(currentParams.RetailPriceWithDiscount as any)) /
										(currentParams.RetailPriceWithDiscount as any)) *
									100
								).toFixed(0)}
								%
							</Badge>
						</div>
					)}
					<p className={css.price}>{currentParams.RetailPrice} грн.</p>
				</CardFooter>
			</Link>
			<Button
				variant='ghost'
				size='icon'
				className={css.cart}
				onClick={handleAddToCart}
			>
				<ShoppingCart className={isInCart ? 'text-red-900' : ''} />
				{cartItem ? (
					<p className='absolute left-0 -top-2 bg-red-900 text-white size-6 rounded-full grid place-content-center'>
						{cartItem.quantity}
					</p>
				) : null}
			</Button>
		</Card>
	)
}
