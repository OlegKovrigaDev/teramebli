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
import { ProductCardProps } from '@/types/redux'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import css from './ProductCart.module.css'

export const ProductCard = ({ product }: ProductCardProps) => {
	// const { img } = useFetchImages(product.offerId)
	const dispatch = useDispatch()

	if (!product || !product.offerId) {
		return <p>Product data is unavailable.</p>
	}

	const handleAddToCart = () => {
		const cartItem = {
			offerId: product.offerId,
			ModelName: product.params.ModelName,
			Articul: product.params.Articul,
			RetailPrice: product.params.RetailPrice,
			RetailPriceWithDiscount:
				product.params.RetailPriceWithDiscount || product.params.RetailPrice,
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
									className='rounded-lg h-[217px] w-[217px]'
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
						{product.params.ModelName}
					</CardTitle>
				</CardHeader>
				<CardContent className={css.content}>
					<p className={css.instock}>● В наявності</p>
					{product.params.Articul && (
						<p className={css.code}>Код товару: {product.params.Articul}</p>
					)}
				</CardContent>
				<CardFooter className={css.footer}>
					{product.params.RetailPrice !==
						product.params.RetailPriceWithDiscount && (
						<div className='flex gap-2'>
							<p className={css.discont}>
								{product.params.RetailPriceWithDiscount} грн.
							</p>
							<Badge className='rounded-lg bg-red-800 hover:bg-red-800'>
								-
								{(
									(((product.params.RetailPrice as any) -
										(product.params.RetailPriceWithDiscount as any)) /
										(product.params.RetailPriceWithDiscount as any)) *
									100
								).toFixed(0)}
								%
							</Badge>
						</div>
					)}
					<p className={css.price}>{product.params.RetailPrice} грн.</p>
				</CardFooter>
			</Link>
			<Button
				variant='ghost'
				size='icon'
				className={css.cart}
				onClick={handleAddToCart}
			>
				<ShoppingCart />
			</Button>
		</Card>
	)
}
