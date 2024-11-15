'use client'
import { Advantages, Categories, Ethaps, Hero } from '@/components/shared'
import { ProductSlider } from '@/components/shared/product/ProductSlider'
import { Section } from '@/components/shared/section'
import { home } from '@/constants'
import { useRandomProducts } from '@/hooks/category/useRandomProducts'
import { useMemo } from 'react'

export default function Home() {
	const { randomProducts: randomProducts1, loadMore: loadMore1 } =
		useRandomProducts(12)
	const usedProductIds = useMemo(
		() => new Set(randomProducts1.map(product => product.offerId)),
		[randomProducts1]
	)

	const { randomProducts: randomProducts2, loadMore: loadMore2 } =
		useRandomProducts(12, usedProductIds)

	return (
		<>
			<Hero />
			{randomProducts1.length > 0 && (
				<Section title={home.newProduct.title}>
					<ProductSlider arr={randomProducts1} onLoadMore={loadMore1} />
				</Section>
			)}
			<Ethaps />
			<Categories />
			{randomProducts2.length > 0 && (
				<Section title={home.interesrProduct.title}>
					<ProductSlider arr={randomProducts2} onLoadMore={loadMore2} />
				</Section>
			)}
			<Advantages />
		</>
	)
}
