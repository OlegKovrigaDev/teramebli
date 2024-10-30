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
import { ProductCardProps } from '@/types/redux'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import css from './ProductCart.module.css'

export const ProductCard = ({ product }: ProductCardProps) => {
	// const { img } = useFetchImages(product.offerId)
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
			ModelName: product.paramsFrom_01_MebliBalta.ModelName,
			Articul: product.paramsFrom_01_MebliBalta.Articul,
			RetailPrice: product.paramsFrom_01_MebliBalta.RetailPrice,
			RetailPriceWithDiscount:
				product.paramsFrom_01_MebliBalta.RetailPriceWithDiscount ||
				product.paramsFrom_01_MebliBalta.RetailPrice,
			currencyId: product.currencyId,
			quantity: 1,
		}

		dispatch(addToCart(cartItem))
	}

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
									alt={product.params.ModelName}
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
					<CardTitle className={css.title}>
						{product.paramsFrom_01_MebliBalta.ModelName}
					</CardTitle>
				</CardHeader>
				<CardContent className={css.content}>
					<p className={css.instock}>● В наявності</p>
					{product.paramsFrom_01_MebliBalta.Articul && (
						<p className={css.code}>
							Код товару: {product.paramsFrom_01_MebliBalta.Articul}
						</p>
					)}
				</CardContent>
				<CardFooter className={css.footer}>
					{product.paramsFrom_01_MebliBalta.RetailPrice !==
						product.paramsFrom_01_MebliBalta.RetailPriceWithDiscount && (
						<div className='flex gap-2'>
							<p className={css.discont}>
								{product.paramsFrom_01_MebliBalta.RetailPriceWithDiscount} грн.
							</p>
							<Badge className='rounded-lg bg-red-800 hover:bg-red-800'>
								-
								{(
									(((product.paramsFrom_01_MebliBalta.RetailPrice as any) -
										(product.paramsFrom_01_MebliBalta
											.RetailPriceWithDiscount as any)) /
										(product.paramsFrom_01_MebliBalta
											.RetailPriceWithDiscount as any)) *
									100
								).toFixed(0)}
								%
							</Badge>
						</div>
					)}
					<p className={css.price}>
						{product.paramsFrom_01_MebliBalta.RetailPrice} грн.
					</p>
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
