'use client'
import { Advantages, Categories, Ethaps, Hero } from '@/components/shared'
import { ProductSlider } from '@/components/shared/product/ProductSlider'
import { Section } from '@/components/shared/section'
import { home, products } from '@/constants'
import { useRandomProducts } from '@/hooks/useRandomProducts'

export default function Home() {
	const { randomProducts, error, isLoading } = useRandomProducts(1, 100)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error loading products</p>
	}

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
				<ProductSlider arr={randomProducts} />
			</Section>
		</>
	)
}
