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

export const ProductCard = ({ product }: ProductCardProps) => {
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
		<Card className='product-card'>
			<Link key={product.offerId} href={`/product/${product.offerId}`}>
				<CardHeader className='p-0'>
					<div className='relative'>
						<Badge className='badge-action'>Акція</Badge>
						<Badge className='badge-hit'>Хіт</Badge>
						<div className='img-container'>
							<img
								src={''}
								alt={product.params.ModelName}
								className='rounded-lg'
							/>
						</div>
					</div>
					<CardTitle className='title'>{product.params.ModelName}</CardTitle>
				</CardHeader>
				<CardContent className='product-card-content'>
					<p className='product-in-stock'>● В наявності</p>
					{product.params.Articul && (
						<p className='product-code'>Код товару: {product.params.Articul}</p>
					)}
				</CardContent>
				<CardFooter className='product-card-footer'>
					{product.params.RetailPrice !==
						product.params.RetailPriceWithDiscount && (
						<div className='flex gap-2'>
							<p className='new-price'>
								{product.params.RetailPriceWithDiscount} грн.
							</p>
							<Badge className='rounded-lg bg-red-800 hover:bg-red-800'>
								-
								{(
									(((product.params.RetailPriceWithDiscount as any) -
										(product.params.RetailPrice as any)) /
										(product.params.RetailPrice as any)) *
									100
								).toFixed(0)}
								%
							</Badge>
						</div>
					)}
					<p className='old-price'>{product.params.RetailPrice} грн.</p>
				</CardFooter>
			</Link>
			<Button
				variant='ghost'
				size='icon'
				className='cart'
				onClick={handleAddToCart}
			>
				<ShoppingCart />
			</Button>
		</Card>
	)
}
