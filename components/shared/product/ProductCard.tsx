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
import { CartItem, ProductItem } from '@/types/cart'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

export const ProductCard = ({
	img,
	title,
	oldPrice: RetailPrice,
	newPrice: RetailPriceWithDiscount,
	Articul,
	offerId,
}: ProductItem) => {
	const dispatch = useDispatch()

	const handleAddToCart = () => {
		const product: CartItem = {
			img,
			title,
			oldPrice: RetailPrice,
			RetailPrice: RetailPriceWithDiscount,
			quantity: 1,
			offerId: Articul,
			ModelName: title,
			currencyId: 'UAH',
			Articul: Articul,
		}

		dispatch(addToCart(product))
	}

	return (
		<Card className='product-card'>
			<Link key={offerId} href={`/product/${offerId}`}>
				<CardHeader className='p-0'>
					<div className='relative'>
						<Badge className='badge-action'>Акція</Badge>
						<Badge className='badge-hit'>Хіт</Badge>
						<div className='img-container'>
							<img src={img} alt={title} className='rounded-lg' />
						</div>
					</div>
					<CardTitle className='title'>{title}</CardTitle>
				</CardHeader>
				<CardContent className='product-card-content'>
					<p className='product-in-stock'>● В наявності</p>
					{Articul && <p className='product-code'>Код товару: {Articul}</p>}
				</CardContent>
				<CardFooter className='product-card-footer'>
					{oldPrice !== newPrice && (
						<div className='flex gap-2'>
							<p className='new-price'>{newPrice} грн.</p>
							<Badge className='rounded-lg bg-red-800 hover:bg-red-800'>
								-
								{(
									(((newPrice as any) - (oldPrice as any)) /
										(oldPrice as any)) *
									100
								).toFixed(0)}
								%
							</Badge>
						</div>
					)}
					<p className='old-price'>{oldPrice} грн.</p>
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
