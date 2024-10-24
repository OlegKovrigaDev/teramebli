'use client'
import { Advantages, Categories, Ethaps, Hero } from '@/components/shared'
import { ProductSlider } from '@/components/shared/product/ProductSlider'
import { Section } from '@/components/shared/section'
import { home } from '@/constants'
import { useRandomProducts } from '@/hooks/useRandomProducts'

export default function Home() {
	const { randomProducts } = useRandomProducts(1, 25)
	const { randomProducts: randomProducts2 } = useRandomProducts(1, 25)

	return (
		<>
			<Hero />
			<Advantages />
			<Categories />
			<Ethaps />
			<Section title={home.interesrProduct.title}>
				<ProductSlider arr={randomProducts} />
			</Section>
			<Section title={home.newProduct.title}>
				<ProductSlider arr={randomProducts2} />
			</Section>
		</>
	)
}
