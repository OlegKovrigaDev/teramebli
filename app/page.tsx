'use client'
import { Advantages, Categories, Ethaps, Hero } from '@/components/shared'
import { ProductSlider } from '@/components/shared/product/ProductSlider'
import { Section } from '@/components/shared/section'
import { home } from '@/constants'
import { useRandomProducts } from '@/hooks/useRandomProducts'
import { useMemo } from 'react'

export default function Home() {
	const { randomProducts: randomProducts1 } = useRandomProducts(150)

	const usedProductIds = useMemo(
		() => new Set(randomProducts1.map(product => product.offerId)),
		[randomProducts1]
	)

	const { randomProducts: randomProducts2 } = useRandomProducts(
		200,
		usedProductIds
	)

	return (
		<>
			<Hero />
			<Section title={home.newProduct.title}>
				<ProductSlider arr={randomProducts1} />
			</Section>
			<Ethaps />
			<Categories />
			<Section title={home.interesrProduct.title}>
				<ProductSlider arr={randomProducts2} />
			</Section>
			<Advantages />
		</>
	)
}
